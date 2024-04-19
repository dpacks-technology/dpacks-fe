'use client';
import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatMessageHistory from "./ChatMessageHistory";
import ChatInput from "./ChatInput";
import { GetMessagesByWebId, GetMessagesByVisitorId, AddMessage } from "/services/MessageService";
import { useParams } from "next/navigation";
import io from "socket.io-client"; // Import Socket.IO client

const socket = io("http://localhost:4006"); // Replace with your server URL

const Dashboard = () => {
    const { webId } = useParams();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatId, setSelectedChatId] = useState(null);

    const handleChatClick = async (visitorId) => {
        setSelectedChatId(visitorId);

        try {
            const messages = await GetMessagesByVisitorId({ webId, visitorId });
            setSelectedChat(messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async (message) => {
        if (!selectedChatId) return;

        try {
            await AddMessage({ webId, visitorId: selectedChatId, visitorName, sender: "websiteOwner", message });
            // Emit event to server to notify other clients about new message
            socket.emit("newMessage", { webId, visitorId, message }); // New event
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

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
        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("dataUpdate", (data) => {
            if (data.webId === webId) {
                setSelectedChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, ...data.messages], // Update messages
                }));
            }
        });

        return () => socket.disconnect(); // Cleanup on unmount
    }, [webId]);

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
                        <ChatMessageHistory messages={selectedChat.messages} />
                        <ChatInput onSendMessage={handleSendMessage} disabled={!selectedChatId} />
                    </>
                )}
            </div>
        </div>
    );
};
export default Dashboard;