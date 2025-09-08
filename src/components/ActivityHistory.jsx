
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { isSameMonth } from "date-fns";
import { useState } from "react";
import Edit from "./Edit";
import { useDeleteActivityMutation } from "../services/apiSlice";

const ActivityHistory = ({ activities, title }) => {

    const [activity, setActivity] = useState({});
    const [addActivity, setAddActivity] = useState(false);
    const [addToBalance, setAddToBalance] = useState(0);
    const [deleteActivity] = useDeleteActivityMutation();

    const handleEdit = (event) => {
        setActivity({ ...event });
        setAddToBalance(event.value);
        setAddActivity(true);
    }
    const handleChange = (e) => {
        const [name, value] = [e.target.name, e.target.value];
        setActivity(prev => ({ ...prev, [name]: value }));
    }

    const handleDelete = async (event) => {
        await deleteActivity({ id: event.id });
    }

    const credit = activities?.filter(event => event.type === "credit");
    const debit = activities?.filter(event => event.type === "debit");
    const totalIncome = credit?.map((event) => parseFloat(event.value)).reduce((sum, event) => sum + event, 0);
    const totalExpense = debit?.map((event) => parseFloat(event.value)).reduce((sum, event) => sum + event, 0);
    const balance = totalIncome - totalExpense;

    const now = new Date();
    return (
        <section className="min-h-[300px]">
            <h2 className="font-bold text-4xl text-teritary text-center mt-8" style={{ opacity: (addActivity ? "30%" : "100%") }}>Monthly {title}</h2>
            <table className="mt-6 mx-auto shadow grid-cols-[30px_1fr_1fr_1fr] sm:grid-cols-[30px_1fr_1fr_1fr_2fr_1fr] w-[80%] table-auto border-collapse grid text-center items-center font-medium" style={{ opacity: (addActivity ? "30%" : "100%") }}>
                <thead className="contents">
                    <tr className="contents">
                        <th className="p-3">#</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Price</th>
                        <th className="p-3 hidden sm:inline">Category</th>
                        <th className="p-3 hidden sm:inline">Date</th>
                        <th className="p-3">...</th>
                    </tr>
                </thead>
                <tbody className="contents">
                    {activities?.filter((event) => (isSameMonth(new Date(event.date), now))).map((event, index) => (
                        <tr key={event.id} className="contents">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{event.title}</td>
                            <td className="p-3 font-semibold" style={{ color: (event.type === "credit" ? "green" : "red") }}>&#8377;&nbsp;{event.value}</td>
                            <td className="p-3 hidden sm:inline">{event.category}</td>
                            <td className="p-3 hidden sm:inline"><span className="whitespace-normal">{format(new Date(event.date), "dd/MM/yyyy")} </span><span className="whitespace-nowrap">{format(new Date(event.date), "hh:mm bbb")}</span></td>
                            <td className="p-3"><button onClick={() => handleEdit(event)} className="cursor-pointer text-yellow-500 me-2">< FontAwesomeIcon icon={faEdit} /></button><button onClick={() => handleDelete(event)} className="cursor-pointer text-red-600 me-2">< FontAwesomeIcon icon={faTrash} /></button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <Edit options={activity.type === "debit" ? (["Entertainment", "Shopping", "Food", "Travel"]) : (["Salary", "Others"])} title={"Edit"} type={activity.type} activity={activity} addActivity={addActivity} setAddActivity={setAddActivity} handleChange={handleChange} balance={balance} addToBalance={parseFloat(addToBalance)} />

        </section>
    )
}

export default ActivityHistory