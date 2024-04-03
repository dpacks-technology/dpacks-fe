
'use client';
import React, { useState } from 'react';
import {AddMessage} from "@/services/MessageService";

function MyComponent() {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           await AddMessage({ message });
            // Handle success
        } catch (error) {
            console.error('Error inserting data: ', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default MyComponent;
