import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from "react-router-dom"
import Carousel from '../components/Carousel'

const Home = () => {
    return (
        <main className='grow p-8'>
            <section className='w-full  flex flex-col items-center justify-center gap-6'>
                <h1 className='mt-10 font-extrabold text-5xl text-center'>Take Control of Your Money with FinTrack</h1>
                <Carousel />
                <Link className='bg-blue-800 hover:bg-white text-white hover:text-blue-800 border-2 border-blue-800 px-12 py-3 rounded-lg inline-block text-center mt-6 mx-auto' to={"/account"}><FontAwesomeIcon className='cursor-pointer' icon={faPlay} /></Link>
            </section>

        </main>
    )
}

export default Home