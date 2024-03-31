import React from 'react';
import Button from 'antd/lib/button';

export default function SubscriptionPlans() {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            features: ['Basic features', 'Limited storage', 'No support'],
        },
        {
            name: 'Standard',
            price: '$9.99/month',
            features: ['Advanced features', 'Moderate storage', 'Email support'],
        },
        {
            name: 'Premium',
            price: '$19.99/month',
            features: ['All features', 'Unlimited storage', 'Priority support'],
        },
    ];

    return (
        <div className="flex justify-center space-x-4">
            {plans.map((plan, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-md">
                    <h2 className="text-2xl font-semibold">{plan.name}</h2>
                    <p className="text-lg font-medium">{plan.price}</p>
                    <ul className="mt-4 space-y-2">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <svg
                                    className="w-6 h-6 text-green-500"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button className="mt-4">Subscribe</Button>
                </div>
            ))}
        </div>
    );
}
