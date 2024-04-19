'use client';
import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatMessageHistory from "./ChatMessageHistory";
import {GetMessagesByWebId, GetMessagesByVisitorId, GetLastMessage} from "/services/MessageService";
import { useParams } from "next/navigation";
import io from "socket.io-client"; // Import Socket.IO client

const socket = io("http://localhost:4006"); // Replace with your server URL

const Dashboard = () => {
    const { webId } = useParams();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);


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