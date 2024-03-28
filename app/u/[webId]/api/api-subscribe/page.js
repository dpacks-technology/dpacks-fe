"use client"

import {useEffect, useState} from 'react';
import axios from 'axios';
import React from "react";
import Input from "@/app/components/Input";
import {Button, Card} from "@nextui-org/react";


export default function apiSubscribe({params}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [clientId, setClientId] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [apiKey, setApiKey] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/api/keypairs/${params.webId}`);
            setClientId(response.data.client_id);
            setApiKey(response.data.key);
        } catch (error) {
            console.error('Failed to fetch subscription:', error);
        }
    };

    const subscribe = async () => {
        try {
            const response = await axios.post(`http://localhost:4001/api/keypairs/${params.webId}`);
            if(response.status === 200){
                setClientId(response.data.client_id);
                setApiKey(response.data.key);
            }else{
                console.error('Failed to subscribe:', response);
            }
        } catch (error) {
            console.error('Failed to subscribe:', error);
        }

    };

    const regenerate = async () => {
        try {
            const response = await axios.put(`http://localhost:4001/api/keypairs/${params.webId}`);
            if(response.status === 200){
                setClientId(response.data.client_id);
                setApiKey(response.data.key);
            }else{
                console.error('Failed to Regenerate:', response);
            }
        } catch (error) {
            console.error('Failed to Regenerate:', error);
        }

    };

    const deleteSubscription = async () => {
        try {
            const response = await axios.delete(`http://localhost:4001/api/keypairs/${params.webId}`);
            if(response.status === 200){
                setClientId("");
                setApiKey("");
            }else{
                console.error('Failed to Regenerate:', response);
            }
        } catch (error) {
            console.error('Failed to Regenerate:', error);
        }

    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData(); // Fetch data on initial page load
    }, []);


    return(
        <div className="w-full h-full flex items-center justify-center">

            <Card className="bg-gray-700 w-3/4 p-10 ml-auto mr-auto flex-col items-center">
                {!clientId && !apiKey ? (
                    <Button
                        variant="solid"
                        color="primary"
                        size="lg"
                        onClick={subscribe}>
                        Subscribe to API
                    </Button>
                ) : (
                    <div className="w-full p-10 flex-col items-center">
                        <h4 className="text-white text-lg pb-1 pl-1">Client ID</h4>
                        <Input
                            hiddenLabel
                            id="clientID"
                            className="mb-5 w-full rounded-lg"
                            variant="filled"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={clientId}
                        />
                        <h4 className="text-white text-lg pb-1 pl-1">API Key</h4>
                        <Input
                            hiddenLabel
                            id="apiKey"
                            className="mb-5 w-full rounded-lg"
                            variant="filled"
                            InputProps={{
                                readOnly: true,
                            }}
                            value={apiKey}
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