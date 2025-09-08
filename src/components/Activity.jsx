import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const Acitvity = ({ options, title, type, addActivity, setAddActivity, setAddOther, activity, handleChange, handleClose, handleForm, balance }) => {
    const inputRef = useRef();
    const handleAddButton = () => {
        setAddActivity(true);
        setAddOther(false);
    }
    useEffect(() => {
        if (addActivity && inputRef.current) {
            inputRef.current.focus();
        }
    }, [addActivity]);

    return (
        <>
            <button onClick={handleAddButton} className='cursor-pointer bg-teritary hover:opacity-75 px-6 py-3 rounded-lg font-semibold text-lg'>Add {title}</button>
            {addActivity && <section className='absolute top-[40%] left-1/2 transform -translate-1/2 px-2 py-6 shadow overflow-hidden w-[310px] z-10 bg-white border rounded-2xl'>
                <button className='block ms-auto cursor-pointer' onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></button>
                <h2 className='text-center font-bold text-2xl'>Add an {title}</h2>
                <form onSubmit={(e) => handleForm(e, type)}>
                    <label htmlFor="title" className='absolute left-[10000px]'>Title</label>
                    <input type="text" id='title' name='title' value={activity.title} onChange={handleChange} className='border w-full rounded-md px-4 py-2 mt-6' placeholder='Title' ref={inputRef} />
                    <label htmlFor="value" className='absolute left-[10000px]'>Value</label>
                    <input type="number" id='value' name='value' value={activity.value} onChange={handleChange} className='border w-full rounded-md px-4 py-2 mt-3' placeholder='Value' />
                    {(balance - activity.value) < 0 && <span className='text-red-700 mt-2 text-lg font-medium'>Insufficient Balance</span>}
                    <label htmlFor="category" className='absolute left-[10000px]'>Category</label>
                    <select name="category" id="category" value={activity.category} onChange={handleChange} className='border w-full rounded-md px-4 py-2 mt-3 outline-0'>
                        <option className='outline-0 border-0 bg-gray-100 px-2 py-4' value="none" disabled>Select Category</option>
                        {
                            options.map((option, index) => (<option key={index} className='outline-0 border-0 bg-gray-100 px-2 py-4' value={option}>{option}</option>))
                        }
                    </select>
                    <button type='submit' className={(!activity.title || !activity.value || activity.category === "none" || balance < activity.value) ? 'bg-teritary opacity-60 px-8 py-2 rounded-lg block mt-6 w-full' : 'bg-teritary hover:opacity-75 px-8 py-2 rounded-lg block mt-6 w-full'} disabled={!activity.title || !activity.value || activity.category === "none" || balance < activity.value}>Add</button>
                </form>

            </section>}
        </>
    )
}

export default Acitvity