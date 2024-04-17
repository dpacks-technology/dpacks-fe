"use client"

import {useState} from "react";
import SubscriptionPlans from "@/app/components/SubscriptionPlans";
import Table from "@/app/components/Table";


import {useDisclosure} from "@nextui-org/react";
export default function Subscription() {
    // Dummy data for demonstration
    const currentPlan = "Standard ";
    const features = ["Advanced features", "Moderate Storage", "Email Support"];
    const cost = "$10/month";

    //function to change page status
    const [pageStatus, setPageStatus] = useState('view');

    // Dummy data for payment details
    const paymentDetails = [
        {title: "Card Number", value: "**** **** **** 1234"},
        {title: "Expiration Date", value: "12/25"},
        {title: "CVV", value: "***"}
    ];

    // Dummy data for invoices
    const invoices = [
        {id: 1, date: "2023-01-15", amount: "$10"},
        {id: 2, date: "2023-02-15", amount: "$10"},
        {id: 3, date: "2023-03-15", amount: "$10"}
    ];

    //defining state for page status
    const changeStatus = (status) => {
        setPageStatus(status);
    }

    const deleteButton = (id) => { // delete button function // TODO: Change the following function
        // not used here
        // console.log("delete: " + id);


        // delete function
        DeleteTransactionByID(id).then(() => {
            refreshData("success", "Deleted");
        }).catch((error) => {
            headerMessage("error", error.response.data.error);
        });

    }

    return (
        <div
            className={"bg-dark w-full"}
            style={{
            padding: '30px',
            borderRadius: '10px',
            margin: 'auto',
            marginTop: '50px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>


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
                        <h2 style={{
                            marginBottom: '20px',
                            fontSize: '24px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{marginRight: '10px'}}>Current Plan: {currentPlan}</span>

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
                        </h2>


                        <ul style={{listStyleType: 'disc'}}>
                            {features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                        <p style={{marginTop: '20px'}}>Total Per Month: {cost}</p>
                    </div>

                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{
                            width: 'calc(50% - 20px)',
                            border: '2px solid blue',
                            padding: '20px',
                            borderRadius: '10px',
                            marginBottom: '20px'
                        }}>
                            {/* Content for payment details */}
                            <h3 style={{marginBottom: '10px'}}>Payment Details</h3>
                            {paymentDetails.map((detail, index) => (
                                <p key={index}>{detail.title}: {detail.value}</p>
                            ))}
                        </div>
                        <div style={{
                            width: 'calc(50% - 20px)',
                            border: '2px solid blue',
                            padding: '20px',
                            borderRadius: '10px',
                            marginBottom: '20px'
                        }}>
                            {/* Content for invoices */}
                            <h3 style={{marginBottom: '10px'}}>Invoices</h3>
                            {invoices.map(invoice => (
                                <div key={invoice.id} style={{marginBottom: '10px'}}>
                                    <p>Invoice ID: {invoice.id}</p>
                                    <p>Date: {invoice.date}</p>
                                    <p>Amount: {invoice.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>

                        <button style={{
                            name:"Delete",
                            padding: '10px 20px',
                            borderRadius: '5px',
                            background: 'red',
                            border: 'none', function : deleteButton,
                        }}>Unsubscribe Current Plan

                        </button>
                    </div>
                </>
            }

        </div>
    );
}
