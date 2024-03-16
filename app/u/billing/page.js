// Billing.js
"use client"
import {useState} from "react";
import React from 'react';



export default function Billing() {
    const [billingInterval, setBillingInterval] = useState('month');
    const intervals = ['monthly', 'yearly'];  

    return (
        <>
            <div className="sm:flex sm:flex-col sm:align-center">

                <div
                    className="relative self-center mt-6 bg-gray-950 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
                    {intervals.map(interval => (
                        <button
                            key={interval}
                            onClick={() => setBillingInterval(interval)}
                            type="button"
                            className={`${
                                billingInterval === interval
                                    ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                            } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                        >
                            {`${interval.charAt(0).toUpperCase()}${interval.slice(1)} billing`}
                        </button>
                    ))}
                </div>


            < /div>


            <div className="flex space-x-4 justify-center">
                <div className="bg-gray-950 bg-opacity-60 rounded-lg w-1/4 p-6 ml-4 mt-8" style={{height: '300px'}}>
                    <h2>FREE</h2>
                    <p className="text-lg mt-10 mb-8" style={{fontSize: '3rem'}}>0$</p>
                    <ul className="text-white">
                        <li>Limited Storage</li>
                        <li>Limited Customization</li>

                    </ul>
                    <button className="bg-white text-black py-2 px-4 mt-4 rounded-lg">Subscribe</button>
                </div>
                <div className="bg-gray-950 bg-opacity-60 rounded-lg w-1/4 p-6 ml-4 mt-8" style={{height: '300px'}}>
                    <h2>STANDARD</h2>
                    <p className="text-lg mt-10 mb-8" style={{fontSize: '3rem'}}>$10</p>
                    <ul className="text-white">
                        <li>Increased Storage</li>
                        <li>Priority Support</li>

                    </ul>
                    <button className="bg-white text-black py-2 px-4 mt-4 rounded-lg">Subscribe</button>
                </div>
                <div className="bg-gray-950 bg-opacity-60 rounded-lg w-1/4 p-6 ml-4 mt-8" style={{height: '300px'}}>
                    <h2>PREMIUM</h2>
                    <p className="text-lg mt-10 mb-8" style={{fontSize: '3rem'}}>$20</p>
                    <ul className="text-white">
                        <li>Maximum Storage</li>
                        <li>AI Content Generation</li>

                    </ul>
                    <button className="bg-white text-black py-2 px-4 mt-4 rounded-lg">Subscribe</button>
                </div>
            </div>


        </>
    );


}



