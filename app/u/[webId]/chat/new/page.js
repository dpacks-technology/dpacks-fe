'use client';
import React, { useState, useEffect } from 'react';
import { GetAutoRespondsByWebID } from "@/services/AutoRespondService";

const AutoRespondsList = ({ onMessageClick, webId }) => {
    const [autoResponds, setAutoResponds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const fetchedAutoResponds = await GetAutoRespondsByWebID(webId);
                setAutoResponds(fetchedAutoResponds);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (webId) {
            fetchData();
        }
    }, [webId]);

    if (isLoading) {
        return <p>Loading auto-responds...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (!autoResponds.length) {
        return <p>No auto-responds found.</p>;
    }

    return (
        <ul>
            {autoResponds.map((autoRespond) => (
                <li key={autoRespond.id} onClick={() => onMessageClick(autoRespond.message)}>
                    <p>Message: {autoRespond.message}</p>
                </li>
            ))}
        </ul>
    );
};

export default AutoRespondsList;