"use client"

import {useEffect, useState} from 'react';
import axios from 'axios';
import React from "react";
import ButtonComponent from "@/app/components/Button";
import Input from "@/app/components/Input";
import {Button, Card} from "@nextui-org/react";
import { Spin } from 'antd';


export default function apiSubscribe() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [subscription, setSubscription] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [clientId, setClientId] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [apiKey, setApiKey] = useState("");

    const subscribe = async () => {
        setSubscription(true);
        // try {
        //
        //     const response = await axios.post('http://localhost:4000/api/subscriber/');
        //     setSubscription(response.data.keyPairs);
        // } catch (error) {
        //     console.error('Failed to subscribe:', error);
        // }

    };

    const regenerate = async () => {
        alert('regenarate button clicked')

    };

    const deleteSubscription = async () => {
        alert('Delete button clicked')

    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:4000/api/subscriber/');
    //             setClientId(response.data.keyPairs.clientId);
    //             setApiKey(response.data.keyPairs.apiKey);
    //         } catch (error) {
    //             console.error('Failed to fetch subscription:', error);
    //         }
    //     };
    //
    //     if (subscription) {
    //         fetchData();
    //     }
    // }, [subscription]);

    return(
        <div className="w-full h-full flex items-center justify-center">
            <Card className="bg-gray-700 w-3/4 p-10 ml-auto mr-auto flex-col items-center">
                {!subscription ? (
                    <ButtonComponent
                        name="Subscribe to API"
                        variant="solid"
                        color="primary"
                        size="lg"
                        onClick={subscribe}
                    />
                ) : (
                    <div className="w-full p-10 flex-col items-center">
                        <h4 className="text-white text-lg pb-1 pl-1">Client ID</h4>
                        <Input
                            hiddenLabel
                            id="clientID"
                            className="mb-5 w-full bg-white rounded-lg"
                            variant="filled"
                            InputProps={{
                                readOnly: true,
                            }}
                            defaultValue={clientId}
                        />
                        <h4 className="text-white text-lg pb-1 pl-1">API Key</h4>
                        <Input
                            hiddenLabel
                            id="apiKey"
                            className="mb-5 w-full bg-white rounded-lg"
                            variant="filled"
                            InputProps={{
                                readOnly: true,
                            }}
                            defaultValue={apiKey}
                        />

                        <div className="flex flex-row justify-between gap-5 mt-5">
                            <Button
                                variant="solid"
                                color="success"
                                size="lg"
                                onClick={regenerate}
                                className="w-full">
                                Regenerate
                            </Button>

                            <Button
                                name="Delete"
                                variant="solid"
                                color="danger"
                                size="lg"
                                onClick={deleteSubscription}
                                className="w-full">
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}