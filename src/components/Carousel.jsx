import React, { useEffect } from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
    }, []);
    return (
        <div className='shadow-white p-4 rounded-2xl backgroundLinear mt-10 overflow-hidden md:w-[500px] mx-auto'>
            <motion.div
                key={slides[currentSlide].id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center p-6"
            >
                <img src={slides[currentSlide].imgUrl} />
                <p className='text-white mt-6'>{slides[currentSlide].text}</p>
            </motion.div>
        </div>
    )
}

export default Carousel