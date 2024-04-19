import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SearchBar from "@/app/components/SearchBar";
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

        // Listen for 'newMessage' event from Socket.IO server
        socket.on('newMessage', (data) => {
            if (data.webId === webId) {
                // Update lastMessages state with the new message
                setLastMessages((prevLastMessages) => ({
                    ...prevLastMessages,
                    [data.visitorId]: data.message,
                }));
            }
        });

    }, [chats, webId, socket]);

    // Cleanup on unmount
    return (
        <div>
            <SearchBar onSearch={onSearch} />
            {chats.map((chat) => (
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
