import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Carousel.css";

const Carousel = () => {
    const slides = [
        {
            id: 1,
            imgUrl: "/carousel1.png",
            text: "Track your income, expenses, and budgets in one place"
        },
        {
            id: 2,
            imgUrl: "/carousel2.png",
            text: "Visualize your spending with smart charts and insights"
        },
        {
            id: 3,
            imgUrl: "/carousel3.png",
            text: "Set savings goals and stay on top of your financial journey"
        }
    ];

    return (
        <div className='mt-10 w-full text-gray-600 Carousel h-[300px]'>
            {slides.map(slide => (
                <div className={`slide${slide.id} absolute w-[85%] md:w-[500px] lg:w-[800px] h-[300px] flex flex-wrap gap-4 p-4 bg-blue-100 rounded-2xl justify-center items-center left-[50%] -translate-x-[50%]`}>
                    <img src={slide.imgUrl} className='max-w-[300px] w-full aspect-3/2 object-cover' />
                    <p className='mt-1 max-w-[400px] w-full text-xl font-medium text-center'>{slide.text}</p>
                </div>
            ))
            }
        </div>
    )
}

export default Carousel