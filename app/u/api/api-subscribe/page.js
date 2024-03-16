"use client"

import { useState } from 'react';
import axios from 'axios';
import React from "react";
import ButtonComponent from "@/app/components/Button";
import {Button, Card, Input} from "@nextui-org/react";


export default function apiSubscribe() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [subscription, setSubscription] = useState(true);

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
        <div className="w-full h-full flex items-center justify-center">

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
                        <h4 className="text-white text-lg pb-1 pl-1">Client ID</h4>
                        <Input
                            key="outside"
                            type="text"
                            name="clientID"
                            id="clientID"
                            color="default"
                            size="lg"
                            defaultValue={"subscription.clientID"}
                            className="mb-4"
                            isReadOnly
                        />
                        <h4 className="text-white text-lg pb-1 pl-1">API Key</h4>
                        <Input
                            key="outside"
                            type="text"
                            name="apiKey"
                            id="apiKey"
                            color="default"
                            size="lg"
                            defaultValue={"subscription.apiKey"}
                            className="mb-5"
                            isReadOnly
                        />

                        <div className="flex flex-row justify-between gap-5">
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