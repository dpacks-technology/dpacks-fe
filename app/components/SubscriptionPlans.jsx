// Billing.js
"use client"
import React, {useState} from "react";

const plans = [
    {
        name: 'Free',
        monthlyPrice: '$0',
        annualPrice: '$0',
        features: ['Basic features', 'Limited storage', 'No support'],
    },
    {
        name: 'Standard',
        monthlyPrice: '$9.99',
        annualPrice: '$99.99',
        features: ['Advanced features', 'Moderate storage', 'Email support'],
    },
    {
        name: 'Premium',
        monthlyPrice: '$19.99',
        annualPrice: '$199.99',
        features: ['All features', 'Unlimited storage', 'Priority support'],
    },
];

export default function SubscriptionPlans() {
    const [billingInterval, setBillingInterval] = useState('monthly');
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
            </div>
            <div className="flex space-x-4 justify-center">
                {plans.length > 0 && plans.map((plan, index) => (
                    <div key={index} className="bg-gray-950 bg-opacity-60 rounded-lg w-1/4 p-6 ml-4 mt-8"
                         style={{height: '300px'}}>
                        <h2 className={"uppercase"}>{plan.name}</h2>
                        <p className="text-lg mt-10 mb-8" style={{fontSize: '3rem'}}>{billingInterval === "monthly" ? plan.monthlyPrice : plan.annualPrice}</p>

                        <ul className="text-white">
                            {plan.features.length > 0 && plan.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <button className="bg-white text-black py-2 px-4 mt-4 rounded-lg">Subscribe</button>
                    </div>
                ))}
            </div>
        </>
    );
}



