
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { GetLastMessage } from "@/services/MessageService";
import useSocket from 'socket.io-client'; // Import useSocket hook

const VisitorName = ({ visitorName }) => (
    <div fontWeight="bold" mr={10}>
        {visitorName}
    </div>
);

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
    const [sortedChats, setSortedChats] = useState([]);
    const socket = useSocket("http://localhost:4006"); // Replace with your server URL

    useEffect(() => {
        const fetchLastMessages = async () => {
            const lastMessagesData = {};
            for (const chat of chats) {
                try {
                    const lastMessage = await GetLastMessage(webId, chat.visitorId);
                    lastMessagesData[chat.visitorId] = lastMessage;
                } catch (error) {
                    console.error(`Error fetching last message for visitor ${chat.visitorId}:`, error);
                }
            }
            setLastMessages(lastMessagesData);
            // Sort chats based on last message timestamps
            const sortedChats = chats.sort((a, b) => {
                const aLastMessage = lastMessagesData[a.visitorId];
                const bLastMessage = lastMessagesData[b.visitorId];
                return bLastMessage.time - aLastMessage.time;
            });
            setSortedChats(sortedChats);
        };

        fetchLastMessages();

        // Listen for 'dataUpdate' event from Socket.IO server
        socket.on('dataUpdate', (data) => {
            if (data.webId === webId) {
                setLastMessages((prevLastMessages) => ({
                    ...prevLastMessages,
                    [data.messages[0].visitorId]: data.messages[0], // Update last message for specific visitor
                }));
                // Re-sort chats when new message arrives
                const sortedChats = chats.sort((a, b) => {
                    const aLastMessage = lastMessagesData[a.visitorId];
                    const bLastMessage = lastMessagesData[b.visitorId];
                    return bLastMessage.time - aLastMessage.time;
                });
                setSortedChats(sortedChats);
            }
        });

        // Cleanup on unmount
        return () => {
            socket.off('dataUpdate');
        };
    }, [chats, webId, socket]);

    return (
        <div>

            {sortedChats.map((chat) => (
                <ChatListItem
                    key={chat.visitorId} // Added unique key for each list item
                    id={chat.visitorId}
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
