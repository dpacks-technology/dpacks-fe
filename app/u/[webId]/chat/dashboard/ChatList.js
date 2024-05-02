import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { GetLastMessage } from "@/services/MessageService";
import useSocket from 'socket.io-client'
import Keys from '@/Keys'

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

const ChatList = ({ chats, onChatClick, webId }) => {
    const [lastMessages, setLastMessages] = useState({});
    const socket = useSocket(Keys.MESSAGE_SERVICE_API_URL)// Replace with your server URL

    // Fetch last messages on component mount and listen for updates
    useEffect(() => {
        const timer = setTimeout(() => {
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
        }, 10000); // Adjust delay time as needed

        // Clear the timer on component unmount
        return () => clearTimeout(timer);

        // Listen for 'dataUpdate' event from Socket.IO server

    }, [chats, webId,socket]);




    // Cleanup on unmount
    return (
        <div>

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