'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4004');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Get initial data when the page loads
    useEffect(() => {
        socket.on('initialData', (data) => {
            setMessages(data);
        });

        // Clear initialData event listener
        return () => {
            socket.off('initialData');
        };
    }, []);

    // Listen for data updates and add them to the local messages state
    useEffect(() => {
        socket.on('dataUpdate', (data) => {
            setMessages((prevMessages) => [...prevMessages, ...data]);
        });

        // Clear dataUpdate event listener
        return () => {
            socket.off('dataUpdate');
        };
    }, []);

    // Send a message
    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage !== '') {
            // Emit insertData event with the new message
            socket.emit('insertData', { message: newMessage });
            setNewMessage('');
        }
    };
    return (
        <div>
            <h1>Send a message!</h1>

            <form onSubmit={sendMessage}>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit">Send</button>
            </form>
            setNewMessage

        </div>
    );
};

export default Chat;