import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from "react-router-dom"
import Carousel from '../components/Carousel'

const Home = () => {
    return (
        <main className='grow p-8'>
            <section>
                <h1 className='mt-10 font-extrabold text-5xl '>Take Control of Your Money with FinTrack</h1>
                <Carousel />

            </section>
            <Link className='bg-teritary hover:opacity-75 px-8 py-3 rounded-lg ' to={"/account"}><FontAwesomeIcon className='mt-12 cursor-pointer' icon={faPlay} /></Link>
        </main>
    )
}

export default Home