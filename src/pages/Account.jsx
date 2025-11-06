import { useState, useMemo } from 'react';
import { v4 as uuid } from "uuid";
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { useAddActivityMutation, } from '../services/apiSlice';
import Activity from '../components/Activity';
import { useSelector } from 'react-redux';
import { isSameMonth } from "date-fns";


const useMonthlyFinanceData = (activities) => {
    return useMemo(() => {
        if (!activities?.length) return [];

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Get the previous 4 months (excluding current)
        const months = [];
        for (let i = 4; i >= 1; i--) {
            const date = new Date(currentYear, currentMonth - i, 1);
            months.push({
                name: date.toLocaleString("default", { month: "short" }), // e.g. "Jul"
                month: date.getMonth(),
                year: date.getFullYear(),
            });
        }

        // Initialize data structure
        const data = months.map((m) => ({
            name: m.name,
            debit: 0, // total expenses
            credit: 0, // total income
        }));

        // Calculate totals
        activities.forEach((activity) => {
            const date = new Date(activity.date);
            const month = date.getMonth();
            const year = date.getFullYear();

            const match = months.find((m) => m.month === month && m.year === year);
            if (match) {
                const target = data.find((d) => d.name === match.name);
                const value = Number(activity.value);

                if (activity.type === "debit") target.debit += value;
                else if (activity.type === "credit") target.credit += value;
            }
        });

        return data;
    }, [activities]);
};

const Account = () => {

    const [addIncome, setAddIncome] = useState(false);
    const [addExpense, setAddExpense] = useState(false);
    const [activity, setActivity] = useState({
        title: "",
        value: 0,
        category: "none"
    });
    const now = new Date();




    const [createActivity] = useAddActivityMutation();
    const { activities } = useSelector(state => state.activityReducer);

    const handleClose = () => {
        setActivity({
            title: "",
            value: 0,
            category: "none"
        });
        setAddExpense(false)
        setAddIncome(false)
    }

    const handleForm = async (e, type) => {
        e.preventDefault();
        const id = uuid();
        const date = new Date().toISOString();
        await createActivity({ ...activity, id, date, type });
        handleClose();
    }


    const handleChange = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setActivity(prev => ({ ...prev, [name]: value }));
    }

    const credit = activities?.filter(event => event.type === "credit");
    const debit = activities?.filter(event => event.type === "debit");
    const totalIncome = credit?.map((event) => parseFloat(event.value)).reduce((sum, event) => sum + event, 0);
    const totalExpense = debit?.map((event) => parseFloat(event.value)).reduce((sum, event) => sum + event, 0);
    const totalIncomeMonth = credit?.filter((event) => (isSameMonth(new Date(event.date), now)))?.map((event) => parseFloat(event.value)).reduce((sum, event) => sum + event, 0);
    const totalExpenseMonth = debit?.filter((event) => (isSameMonth(new Date(event.date), now)))?.map((event) => parseFloat(event.value)).reduce((sum, event) => sum + event, 0);
    const balance = totalIncome - totalExpense;

    const data = useMonthlyFinanceData(activities);

    return (
        <main className='grow relative p-8'>
            <div className='flex flex-wrap justify-center items-center gap-12 mt-6 w-full'>
                <section className='w-[175px] sm:w-[200px] md:w-[250px] aspect-square rounded-4xl shadow bg-blue-100 grid place-content-center text-center'>
                    <h2 className='text-xl font-medium text-gray-700 opacity-75'>Monthly Income</h2>
                    <p className='text-3xl mt-4 font-bold'>&#8377; {totalIncomeMonth}</p>
                </section>
                <section className='w-[175px] sm:w-[200px] md:w-[250px] aspect-square rounded-4xl shadow bg-blue-100 grid place-content-center text-center'>
                    <h2 className='text-xl font-medium text-gray-700 opacity-75'>Monthly Expense</h2>
                    <p className='text-3xl mt-4 font-bold'>&#8377; {totalExpenseMonth}</p>
                </section>

            </div>
            <section className='w-[175px] sm:w-[200px] md:w-[250px] aspect-square rounded-4xl shadow bg-blue-100 grid place-content-center text-center mx-auto mt-12'>
                <h2 className='text-xl font-medium text-gray-700 opacity-75'>Total Balance</h2>
                <p className='text-3xl mt-4 font-bold'>&#8377; {balance}</p>
            </section>

            {(addIncome || addExpense) && <div className='w-full h-screen fixed left-0 top-0 opacity-50 bg-gray-600'></div>}

            <div className='flex gap-4 mt-12 w-full justify-center'>
                <Activity options={["Salary", "Others"]} title={"Income"} type={"credit"} activity={activity} addActivity={addIncome} setAddActivity={setAddIncome} handleChange={handleChange} handleClose={handleClose} handleForm={handleForm} setAddOther={setAddExpense} />
                <Activity options={["Entertainment", "Shopping", "Food", "Travel"]} title={"Expense"} type={"debit"} activity={activity} addActivity={addExpense} setAddActivity={setAddExpense} handleChange={handleChange} handleClose={handleClose} handleForm={handleForm} setAddOther={setAddIncome} balance={balance} />

            </div>
            <div className='w-full sm:w-[80%] md:w-[50%] aspect-3/2 mx-auto mt-20'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart responsive data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis width="auto" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="credit" fill="#8884d8" isAnimationActive={true} />
                        <Bar dataKey="debit" fill="#82ca9d" isAnimationActive={true} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default Account