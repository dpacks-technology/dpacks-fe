import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SearchBar from "@/app/components/SearchBar";
import { GetLastMessage } from "@/services/MessageService";
import useSocket  from 'socket.io-client'; // Import useSocket hook

const VisitorName = styled.div`
  fontWeight: bold;
  margin-right: 10px;
`;

const LastMessage = styled.div`
    flex: 1;
    margin-left: 10px;
`;

const ChatListItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const ChatList = ({ chats, onChatClick, webId, onSearch }) => {
    const [lastMessages, setLastMessages] = useState({});
    const socket = useSocket("http://localhost:4006"); // Replace with your server URL

    // Fetch last messages on component mount and listen for updates
    useEffect(() => {
        const fetchLastMessages = async () => {
            const lastMessagesData = {};
            for (const chat of chats) {
                try {
                    lastMessagesData[chat.visitorId] = await GetLastMessage(webId, chat.visitorId);
                } catch (error) {
                    console.error(`Error fetching last message for visitor ${chat.visitorId}:`, error);
                }
            }
            setLastMessages(lastMessagesData);
        };

        fetchLastMessages();

        // Listen for 'dataUpdate' event from Socket.IO server
        socket.on('dataUpdate', (data) => {
            if (data.webId === webId) {
                setLastMessages((prevLastMessages) => ({
                    ...prevLastMessages,
                    [data.messages[0].visitorId]: data.messages[0], // Update last message for specific visitor
                }));
            }
        });

        return () => socket.disconnect(); // Cleanup on unmount
    }, [chats, webId, socket]);

    return (
        <div>
            <SearchBar onSearch={onSearch} />
            {chats.map((chat) => (
                <ChatListItem
                    key={chat.visitorId}
                    onClick={() => onChatClick(webId, chat.visitorId, chat.visitorName)}
                >
                    <VisitorName visitorName={chat.visitorName} />
                    <LastMessage>{lastMessages[chat.visitorId]?.message}</LastMessage>
                </ChatListItem>
            ))}
        </div>
    );
};

export default ChatList;
