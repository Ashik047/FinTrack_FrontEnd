import { useState } from 'react';
import { v4 as uuid } from "uuid";

import { useAddActivityMutation, } from '../services/apiSlice';
import Activity from '../components/Activity';
import { useSelector } from 'react-redux';
import { isSameMonth } from "date-fns";

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

    return (
        <main className='grow relative p-8'>
            <div className='flex flex-wrap justify-center items-center gap-6 mt-6 w-full'>
                <section className='w-[250px] aspect-square rounded-4xl shadow shadow-white backgroundLinear grid place-content-center text-center text-white' style={{ opacity: ((addExpense || addIncome) ? "10%" : "100%") }}>
                    <h2 className='text-2xl font-semibold opacity-75'>Monthly Income</h2>
                    <p className='text-5xl mt-4 font-extrabold'>&#8377; {totalIncomeMonth}</p>
                </section>
                <section className='w-[250px] aspect-square rounded-4xl shadow shadow-white backgroundLinear grid place-content-center text-center text-white' style={{ opacity: ((addExpense || addIncome) ? "10%" : "100%") }}>
                    <h2 className='text-2xl font-semibold opacity-75'>Monthly Expense</h2>
                    <p className='text-5xl mt-4 font-extrabold'>&#8377; {totalExpenseMonth}</p>
                </section>
                <section className='w-[250px] aspect-square rounded-4xl shadow shadow-white backgroundLinear grid place-content-center text-center text-white' style={{ opacity: ((addExpense || addIncome) ? "10%" : "100%") }}>
                    <h2 className='text-2xl font-semibold opacity-75'>Total Balance</h2>
                    <p className='text-5xl mt-4 font-extrabold'>&#8377; {balance}</p>
                </section>
            </div>

            <div className='flex gap-4 mt-12 w-full justify-center'>
                <Activity options={["Salary", "Others"]} title={"Income"} type={"credit"} activity={activity} addActivity={addIncome} setAddActivity={setAddIncome} handleChange={handleChange} handleClose={handleClose} handleForm={handleForm} setAddOther={setAddExpense} />
                <Activity options={["Entertainment", "Shopping", "Food", "Travel"]} title={"Expense"} type={"debit"} activity={activity} addActivity={addExpense} setAddActivity={setAddExpense} handleChange={handleChange} handleClose={handleClose} handleForm={handleForm} setAddOther={setAddIncome} balance={balance} />

            </div>
        </main>
    )
}

export default Account