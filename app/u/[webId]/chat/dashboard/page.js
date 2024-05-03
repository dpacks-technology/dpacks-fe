'use client';
import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatMessageHistory from "./ChatMessageHistory";
import {GetMessagesByWebId, GetMessagesByVisitorId} from "/services/MessageService";
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





    const handleChatClick = async (webId, visitorId) => {
        try {
            const content = await GetMessagesByVisitorId({ webId, visitorId });

            setSelectedChat(content);
            setSelectedChatId(visitorId);


        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
        const fetchChats = async () => {
            try {
                const chatData = await GetMessagesByWebId(webId);
                setChats(chatData);

            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };
        fetchChats();
        }, 1000); // Adjust delay time as needed

        // Clear the timer on component unmount
        return () => clearTimeout(timer);
    }, [socket,webId]);

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