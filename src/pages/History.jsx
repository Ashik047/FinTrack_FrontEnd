import React from 'react'
import ActivityHistory from '../components/ActivityHistory'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const History = () => {

    const { activities } = useSelector(state => state.activityReducer);
    let transactions;
    let title;
    const [transactionType, setTransactionType] = useState("all");
    const handleChange = (e) => {
        setTransactionType(e.target.value);
    }

    if (transactionType === "all") {
        transactions = activities;
        title = "Transactions"
    } else if (transactionType === "expense") {
        transactions = activities.filter((event) => event.type === "debit");
        title = "Spendings"
    } else {
        transactions = activities.filter((event) => event.type === "credit");
        title = "Earnings"
    }

    return (
        <main className='grow relative'>
            <select name="category" id="category" value={transactionType} onChange={handleChange} className='border w-[100px] rounded-md px-4 py-2 mt-20 outline-0 ms-8'>
                <option className='outline-0 border-0 bg-gray-100 px-2 py-4' value="all" >All</option>
                <option className='outline-0 border-0 bg-gray-100 px-2 py-4' value="expense" >Expenses</option>
                <option className='outline-0 border-0 bg-gray-100 px-2 py-4' value="income" >Incomes</option>
            </select>

            <ActivityHistory activities={transactions} title={title} />

        </main>
    )
}

export default History