"use client"

import {useEffect, useState} from 'react';
import axios from 'axios';
import React from "react";
import Input from "@/app/components/Input";
import {Button, Card} from "@nextui-org/react";
import { jwtDecode } from "jwt-decode"



export default function apiSubscribe() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [clientId, setClientId] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [apiKey, setApiKey] = useState("");

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const uid = decoded.id;
    console.log(decoded);
    console.log(uid);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/api/keypairs/${uid}`);
            setClientId(response.data.client_id);
            setApiKey(response.data.key);
        } catch (error) {
            console.error('Failed to fetch subscription:', error);
        }
    };

    const subscribe = async () => {
        try {
            const response = await axios.post(`http://localhost:4001/api/keypairs/${uid}`);
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
            const response = await axios.put(`http://localhost:4001/api/keypairs/${uid}`);
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
        //check if user is sure
        if(!confirm("Are you sure you want to delete this subscription?")) return;

        try {
            const response = await axios.delete(`http://localhost:4001/api/keypairs/${uid}`);
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
        <div className="w-full h-screen flex items-center justify-center">

            <Card className="dark:bg-secondaryDark w-3/4 p-10 ml-auto mr-auto flex-col items-center flex">
                {!clientId && !apiKey ? (
                    <Button
                        variant="flat"
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
                                variant="flat"
                                color="success"
                                size="lg"
                                onClick={regenerate}
                                className="w-full">
                                Regenerate
                            </Button>

                            <Button
                                name="Delete"
                                variant="flat"
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