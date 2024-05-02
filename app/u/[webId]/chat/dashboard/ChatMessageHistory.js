
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AddMessage, GetMessagesByVisitorId } from "@/services/MessageService";
import useSocket from 'socket.io-client'
import Keys from '@/Keys'
import AutoRespondsList from "@/app/u/[webId]/chat/new/page";


const ChatMessageHistory = ({content, visitorId }) => {
    const socket = useSocket(Keys.MESSAGE_SERVICE_API_URL)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([content])
    const [isAutoRespondsOpen, setIsAutoRespondsOpen] = useState(false)
    const { webId } = useParams()




    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
        const fetchMessages = async () => {
            const lastMessages = await GetMessagesByVisitorId({ webId, visitorId: visitorId });
            setMessages(lastMessages);
        };

        fetchMessages();
    }, 10000); // Adjust delay time as needed

    // Clear the timer on component unmount
    return () => clearTimeout(timer);

        // Listen for 'dataUpdate' event from Socket.IO server

    }, [webId, socket, visitorId]);

    const sendMessage = async () => {
        const visitorName = content.find(msg => msg.visitorId === visitorId)?.visitorName;
        const data = {
            visitorId: visitorId,
            visitorName: visitorName,
            sender: 'websiteOwner',
            message: message,
            time: new Date().toISOString(),
        }

        const response = await AddMessage({ webId }, data);
        const messages = await GetMessagesByVisitorId({ webId, visitorId });

        // Update the messages state with the new message
        setMessages(messages)
        console.log(messages);
        // Emit a 'newMessage' event to the server
        socket.emit('newMessage', response)

        setMessage('')
    }
    const toggleAutoRespondsList = () => {
        setIsAutoRespondsOpen(!isAutoRespondsOpen);
    };

    const handleAutoRespondClick = (message) => {
        setMessage(message);
        setIsAutoRespondsOpen(false);
    };



    return (
        <>

            <div style={{height: '550px', overflowY: 'scroll'}}>
                <div>
                    {messages.sort((a, b) => new Date(a.time) - new Date(b.time)).map((msg, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: msg.sender === 'websiteOwner' ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            justifyContent: 'pace-between',
                            marginTop: '10px'
                        }}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div style={{
                                    backgroundColor: msg.sender === 'websiteOwner' ? '#4CAF50' : '#008CBA',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '10px',
                                    // Add marginRight for the sender's messages and marginLeft for the admin's messages
                                    marginRight: msg.sender === 'websiteOwner' ? '10px' : 0,
                                    marginLeft: msg.sender === 'visitor' ? '10px' : 0,
                                    alignSelf: 'flex-start'
                                }}>
                                    {msg.message}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    alignSelf: 'flex-start',
                                    marginTop: '5px'
                                }}>
                                    {new Date(msg.time).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{

                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderTop: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <input
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    style={{
                        flexGrow: 1,
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        marginRight: '10px',
                    }}
                />
                <button style={{color: '#004a77'}} onClick={sendMessage}>
                    Send
                </button>
                <button onClick={toggleAutoRespondsList} style={{color: '#004a77', marginLeft: '10px'}}>
                    Auto-responses
                </button>
            </div>
            {isAutoRespondsOpen && (
                <div style={{position: 'absolute', top: '100%', left: '0', right: '0', zIndex: 1}}>
                    <AutoRespondsList onMessageClick={handleAutoRespondClick} webId={webId}/>
                </div>
            )}

        </>

    )
        ;
};

export default ChatMessageHistory;
