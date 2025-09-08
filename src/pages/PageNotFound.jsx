import React from 'react'
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <main className='grow grid place-content-center'>
            <p className='text-4xl font-bold'>PageNotFound</p>
            <Link className='bg-teritary hover:opacity-75 px-4 py-2 text-center mt-4 rounded-lg w-[100px] mx-auto' to={"/"} >Home</Link>
        </main>
    )
}

export default PageNotFound