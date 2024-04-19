import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AddMessage, GetMessagesByVisitorId } from '@/services/MessageService'
import io from 'socket.io-client'
import Keys from '@/Keys'
const socket = io(Keys.MESSAGE_SERVICE_API_URL)

const ChatWithAdmin = () => {
    const [visitorEmail, setVisitorEmail] = useState('')
    const [enteredEmail, setEnteredEmail] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const visitorId = localStorage.getItem('visitorId')
    const { webId } = useParams()

    useEffect(() => {
        socket.on('newMessage', (newMessage) => {
            // Always update messages regardless of webId
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log(newMessage);
        });

// Inside useEffect for 'dataUpdate'
        socket.on('dataUpdate', (data) => {
            // Always update messages regardless of webId
            setMessages(data.messages);
        });

// Inside useEffect for 'dataUpdateByVisitorId'
        socket.on('dataUpdateByVisitorId', (data) => {
            // Always update messages regardless of webId
            if (data.visitorId === visitorId) {
                setMessages(data.messages);
                console.log(data.messages);
            }
        });
    },[])

    useEffect(() => {
        const storedVisitorId = localStorage.getItem('visitorId')
        if (storedVisitorId) {
            handleVisitorEmailSubmit()
        }
    }, [webId])

    useEffect(() => {
        const handleTabClose = () => {
            localStorage.removeItem('visitorId')
        }
        window.addEventListener('beforeunload', handleTabClose)
        return () => {
            window.removeEventListener('beforeunload', handleTabClose)
        }
    }, [])

    const handleVisitorEmailChange = (event) => {
        setVisitorEmail(event.target.value)
    }

    const handleVisitorEmailSubmit = async () => {
        const visitorId = generateVisitorId()
        localStorage.setItem('visitorId', visitorId.toString())

        const messages = await GetMessagesByVisitorId({ webId, visitorId })
        socket.emit('dataUpdateByVisitorId', (data) => {
            setMessages(data.messages)
        })

        setMessages(messages)
        setEnteredEmail(true)
    }

    const generateVisitorId = () => {
        return Math.floor(Math.random() * 1000000)
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const sendMessage = async () => {
        const data = {
            visitorId: localStorage.getItem('visitorId'),
            visitorName: visitorEmail,
            sender: 'visitor',
            message: message,
            time: new Date().toISOString(),
        }

        const response = await AddMessage({ webId }, data)

        const messages = await GetMessagesByVisitorId({ webId, visitorId: localStorage.getItem('visitorId') })

        setMessages(messages)
        console.log(messages);

        socket.emit('newMessage', response)
        setMessage('')
    }

    // Sort messages based on their timestamps and map through them
    return (
        <div>
            {!enteredEmail ? (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <input
                        value={visitorEmail}
                        onChange={handleVisitorEmailChange}
                        placeholder="Enter your email..."
                        style={{
                            fontSize: '14px',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            marginBottom: '10px',
                            width: '200px',
                        }}
                    />
                    <button
                        style={{
                            backgroundColor: '#004a77',
                            border: '1px solid #ddd',
                            padding: '10px 20px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            width: '200px',
                        }}
                        onClick={handleVisitorEmailSubmit}
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            position: 'fixed',
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
                            {messages.sort((a, b) => new Date(a.time) - new Date(b.time)).map((msg, index) => (
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
            )}
        </div>
    )
}

export default ChatWithAdmin;