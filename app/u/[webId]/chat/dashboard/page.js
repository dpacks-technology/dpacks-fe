'use client';
import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatMessageHistory from "./ChatMessageHistory";
import {GetMessagesByWebId, GetMessagesByVisitorId, GetLastMessage} from "/services/MessageService";
import { useParams } from "next/navigation";
import useSocket from "socket.io-client"; // Import Socket.IO client
import Keys from '@/Keys'

 // Replace with your server URL

const Dashboard = () => {
    const socket = useSocket(Keys.MESSAGE_SERVICE_API_URL)
    const { webId } = useParams();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);

    useEffect(() => {
        const handleNewMessage = (data) => {
            if (data.message.sender !== 'websiteOwner' && data.webId === webId) {
                setChats((prevChats) => {
                    const updatedChats = [...prevChats];
                    const chatIndex = updatedChats.findIndex((chat) => chat.visitorId === data.message.visitorId);

                    if (chatIndex !== -1) {
                        updatedChats[chatIndex].lastMessage = data.message;
                    } else {
                        updatedChats.push({ visitorId: data.message.visitorId, lastMessage: data.message });
                    }

                    return updatedChats;
                });
            }
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [webId, socket]);

    const handleChatClick = async (webId, visitorId) => {
        try {
            const content = await GetMessagesByVisitorId({ webId, visitorId });
            socket.emit('dataUpdateByVisitorId', (data) => {
                setSelectedChat(data.content)
            })
            setSelectedChat(content);
            setSelectedChatId(visitorId);

            // Listen for real-time updates for the selected chat
            socket.on(`dataUpdateByVisitorId_${visitorId}`, (data) => {
                setSelectedChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, ...data.messages], // Update messages
                }));
            });

            // Fetch the initial real-time data
            const lastMessage = await GetLastMessage(webId, visitorId);
            if (lastMessage) {
                socket.emit("dataUpdateByVisitorId", { visitorId, messages: [lastMessage] });
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Fetch the initial real-time data



    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chatData = await GetMessagesByWebId(webId);
                setChats(chatData);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        fetchChats();
    }, [webId]);
    useEffect(() => {
        socket.on("dataUpdate", (data) => {
            if (data.webId === webId) {
                setChats((prevChats) => [...prevChats, data.messages[0]]);
            }
        });

        return () => {
            socket.off("dataUpdate");
        };
    }, [webId, socket]);

    useEffect(() => {
        return () => {
            // Clean up the event listener when the component unmounts
            if (selectedChatId) {
                socket.off(`dataUpdateByVisitorId_${selectedChatId}`);
            }
        };
    }, [selectedChatId]);

    return (
        <div className="chat-dashboard" style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
            <div className="chat-list-container">
                <ChatList
                    chats={chats}
                    onChatClick={handleChatClick}
                    webId={webId}
                    onSearch={() => {}}
                />
            </div>
            <div className="chat-history-container">
                {selectedChat && (
                    <>
                        <ChatMessageHistory

                            content={selectedChat}
                            visitorId={selectedChatId}
                        />


                    </>
                )}
            </div>
        </div>
    );
};
export default Dashboard;
