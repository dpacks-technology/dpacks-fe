"use client"

import { useState } from 'react';
import axios from 'axios';
import React from "react";
import ButtonComponent from "@/app/components/Button";
import {Button, Card, Input} from "@nextui-org/react";


export default function apiSubscribe() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [subscription, setSubscription] = useState(null);

    const subscribe = async () => {
        setSubscription(true)

    };

    const regenerate = async () => {
        alert('regenarate button clicked')

    };

    const deleteSubscription = async () => {
        alert('Delete button clicked')

    };

    return(
        <div className="w-full h-full flex items-center justify-center bg-red-400">

            <Card className="bg-gray-700 w-3/4 p-10 ml-auto mr-auto m flex-col items-center">
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
                        <Input
                            key="outside"
                            type="text"
                            name="clientID"
                            id="clientID"
                            color="primary"
                            label="Client ID"
                            size="lg"
                            defaultValue={"subscription.clientID"}
                            labelPlacement="outside"
                            className="mb-10"
                        />
                        <Input
                            key="outside"
                            type="text"
                            name="apiKey"
                            id="apiKey"
                            color="primary"
                            label="API Key"
                            size="lg"
                            defaultValue={"subscription.apiKey"}
                            labelPlacement="outside"
                            className="mb-5"
                        />

                        <Button
                            variant="solid"
                            color="success"
                            size="lg"
                            onClick={regenerate}
                            className="mr-5">
                            Regenerate
                        </Button>

                        <Button
                            name="Delete"
                            variant="solid"
                            color="danger"
                            size="lg"
                            onClick={deleteSubscription}
                            className="mr-5">
                            Delete
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}