'use client';
import {  useState } from 'react';

import {AddMessage, GetMessagesByVisitorId} from "@/services/MessageService";

const ChatWithAdmin = ({ webId }) => {
    const [visitorEmail, setVisitorEmail] = useState('');
    const [enteredEmail, setEnteredEmail] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);



    const handleVisitorEmailChange = (event) => {
        setVisitorEmail(event.target.value);
    };
    const visitorId = Math.floor(Math.random() * 1000000);
    const handleVisitorEmailSubmit = async () => {
        // Here you can send the visitor email to your server to generate a visitor ID
        // For simplicity, I'm just generating a random ID here


        // Get messages for this visitor
        const messages = await GetMessagesByVisitorId({ webId, visitorId });
        setMessages(messages);

        // You can also store the visitor ID in local storage or a cookie for future use

        setEnteredEmail(true);
    };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const sendMessage = async () => {
        const data = {
            visitorId: visitorId,
            visitorName:visitorEmail,
            sender: 'visitor',
            message: message,
            time: new Date().toISOString(),
        };


        const response = await AddMessage({webId}, data);
        setMessages((prevMessages) => [...prevMessages, response]);
        setMessage('');
    };



    return (
        <div>
            {!enteredEmail ? (
                <div>
                    <input
                        value={visitorEmail}
                        onChange={handleVisitorEmailChange}
                        placeholder="Enter your email..."
                    />
                    <button style={{color:'#004a77'}} onClick={handleVisitorEmailSubmit}>Submit</button>
                </div>
            ) : (
                <>
                    <div>
                        <input
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Type a message..."
                        />
                        <button style={{color:'#004a77'}}  onClick={sendMessage}>Send</button>
                    </div>
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                {msg.sender}: {msg.message}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


export default ChatWithAdmin;