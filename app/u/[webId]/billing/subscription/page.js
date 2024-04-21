"use client"

import {useEffect, useState} from "react";
import SubscriptionPlans from "@/app/components/SubscriptionPlans";
import {CheckSubscriptionCount} from "@/services/BillingService";
import {DeleteSubscriptionByID, GetSubscriptionByID} from "@/services/SubscriptionServices";

export default function Subscription({params}) {
    // Dummy data for demonstration


    //function to get subscription details
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subscription, setSubscription] = useState({});
    const [PlanName, setPlanName] = useState('');
    const [Amount, setAmount] = useState('');

    //backend  validation error message
    const [message, setMessage] = useState({type: '', message: ''});

    //function to change page status
    const [pageStatus, setPageStatus] = useState('view');
    const [subscriptionExists, setSubscriptionExists] = useState(false);

    //defining state for page status
    const changeStatus = (status) => {
        setPageStatus(status);
    }
    // refresh data function
    const refreshData = (type, message) => {

        const deleteButton = (id) => { // delete button function // TODO: Change the following function
            // delete function
            DeleteSubscriptionByID(id).then(() => {
                refreshData("success", "Deleted");
            }).catch((error) => {
                // headerMessage("error", error.response.data.error);
            });


        }
    }


    //function to unsubscribe current plan
    const UnsubscribeCurrentPlan = () => {
        DeleteSubscriptionByID(params.webId).then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }


    useEffect(() => {
        CheckSubscriptionCount(params.webId).then(r => {
            if (r > 0) {
                setSubscriptionExists(true);

                GetSubscriptionByID(params.webId).then((response) => {
                    setSubscription(response);
                }).catch((error) => {
                    console.log(error);
                    setError(error);
                    setLoading(false);
                });
            }
        });
    }, [params.webId]);

    return (

        <div className="relative h-screen">
            {!subscriptionExists ? (
                <SubscriptionPlans web_id={params.webId} />
            ) : (

                <div className="w-full p-4 border border-gray-300 rounded-lg">

                    <button
                        className="absolute top-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={() => changeStatus('update')}
                    >
                        Update Plan
                    </button>
                    <h1 className="text-2xl font-bold mb-4">Current Plan</h1>
                    <table className="w-full mb-6">
                        <tbody>
                        <tr>
                            <td className="font-medium">Plan Name:</td>
                            <td className="text-yellow-300">{subscription.plan_name}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Features:</td>
                            <td className="text-yellow-300">{subscription.features}</td>
                        </tr>
                        <tr>
                            <td className="font-medium">Amount:</td>
                            <td className="text-yellow-300">{subscription.monthly_price}/mo</td>
                        </tr>
                        </tbody>
                    </table>
                    {pageStatus === 'update' ? (
                        <>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
                                onClick={() => changeStatus('view')}
                            >
                                Back
                            </button>
                            <SubscriptionPlans update={true} web_id={params.webId} />
                        </>
                    ) : (
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={UnsubscribeCurrentPlan}
                        >
                            Unsubscribe Current Plan
                        </button>
                    )}
                </div>
            )}
        </div>
    );

}