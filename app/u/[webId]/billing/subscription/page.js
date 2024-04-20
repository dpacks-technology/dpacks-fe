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


    // function to get subscription details
    useEffect(() => {
        console.log("useEffect")
        GetSubscriptionByID(2).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);
            setError(error);
            setLoading(false);
        });
    }, []);

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


    useEffect(() => {
        CheckSubscriptionCount(params.webId).then(r => {
            console.log(r);
            if (r > 0) {
                setSubscriptionExists(true);
            }
        });
    }, [params.webId]);

    return (

        !subscriptionExists ? <SubscriptionPlans web_id={params.webId}/> :
            //displaying the subscription details from GetSubscription function
            <div style={{width: '100%', padding: '20px', border: '1px solid #ccc', borderRadius: '10px'}}>


                <h2>Plan Name: {PlanName}</h2>
                <h2>Amount: {Amount}</h2>


                {pageStatus === 'update' ?
                    <>
                        <button onClick={() => {
                            changeStatus('view')
                        }} style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                            background: 'blue',
                            border: 'none',
                            fontSize: '14px'
                        }}>Back
                        </button>
                        <SubscriptionPlans/>
                    </>
                    :
                    <>
                        <div style={{width: '100%', marginBottom: '20px'}}>


                            <button onClick={() => {

                                changeStatus('update')

                            }} style={{
                                padding: '5px 10px',
                                borderRadius: '5px',
                                background: 'blue',
                                border: 'none',
                                fontSize: '14px'
                            }}>Update Plan
                            </button>

                        </div>


                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>

                            <button style={{
                                name: "Delete",
                                padding: '10px 20px',
                                borderRadius: '5px',
                                background: 'red',
                                border: 'none', function: deleteButton,

                            }}>Unsubscribe Current Plan

                            </button>
                        </div>
                    </>


                }

            </div>
    );

}