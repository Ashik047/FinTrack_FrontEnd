import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <header className='bg-gray-100 shadow px-4 items-center py-4 relative'>
            <div className='flex justify-between items-center w-full'>
                <Link className='text-2xl font-extrabold text-secondary' to={"/"}>FinTrack</Link>
                <button className='block md:hidden cursor-pointer' onClick={() => setIsCollapsed(prev => !prev)}>{isCollapsed ? <FontAwesomeIcon className='text-2xl' icon={faBars} /> : <FontAwesomeIcon className='text-2xl' icon={faXmark} />}</button>
                <nav className='text-black hidden md:block' aria-label='Header-navigation'>
                    <ul className='flex gap-4'>
                        <li className='py-2 font-semibold '><Link to={"/account"}>Account</Link></li>
                        <li className='py-2 font-semibold '><Link to={"/history"}>Transaction History</Link></li>
                    </ul>
                </nav>
            </div>
            {!isCollapsed && <nav className='text-black' aria-label='Header-navigation'>
                <ul className='flex absolute w-full flex-col left-0 text-center z-10 top-[100%] bg-gray-100 pb-2'>
                    <li className='py-2 font-semibold '><Link to={"/account"}>Account</Link></li>
                    <li className='py-2 font-semibold '><Link to={"/history"}>Transaction History</Link></li>
                </ul>
            </nav>}
        </header>
    )
}

export default Header