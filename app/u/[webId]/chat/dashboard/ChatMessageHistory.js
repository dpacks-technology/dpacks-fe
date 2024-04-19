import React, { useState, useEffect } from "react";
import {useParams} from "next/navigation";
import {AddMessage, GetMessagesByVisitorId} from "@/services/MessageService";
import io from 'socket.io-client'
import Keys from '@/Keys'
const socket = io(Keys.MESSAGE_SERVICE_API_URL)

const ChatMessageHistory = ({ content, visitorId }) => {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const { webId } = useParams()

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const sendMessage = async () => {
        const data = {
            visitorId: visitorId,
            visitorName: '',
            sender: 'visitor',
            message: message,
            time: new Date().toISOString(),
        }

        const response = await AddMessage({ webId }, data)

        const messages = await GetMessagesByVisitorId({ webId, visitorId })

        setMessages(messages)
        console.log(messages);

        socket.emit('newMessage', response)
        setMessage('')
    }


    return (
        <>
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
                <button style={{ color: '#004a77' }} onClick={sendMessage}>
                    Send
                </button>
            </div>
            <div style={{ height: '650px', overflowY: 'scroll' }}>
                <div >
                    {content.sort((a, b) => new Date(a.time) - new Date(b.time)).map((msg, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: msg.sender === 'visitor'? 'row-reverse' : 'row',
                            alignItems: 'center',
                            justifyContent: 'pace-between',
                            marginTop: '10px'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    backgroundColor: msg.sender === 'visitor'? '#4CAF50' : '#008CBA',
                                    color: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '10px',
                                    // Add marginRight for the sender's messages and marginLeft for the admin's messages
                                    marginRight: msg.sender === 'visitor'? '10px' : 0,
                                    marginLeft: msg.sender === 'admin'? '10px' : 0,
                                    alignSelf: 'flex-start'
                                }}>
                                    {msg.message}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666', alignSelf: 'flex-start', marginTop: '5px' }}>
                                    {new Date(msg.time).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default ChatMessageHistory;