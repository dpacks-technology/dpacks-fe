import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { GetLastMessage } from "@/services/MessageService";

const MessageContainer = styled.div`
    display: flex;
    justify-content: ${(props) => (props.sender === 'website' ? 'flex-start' : 'flex-end')};
    margin: 10px 0;
`;

const Message = styled.div`
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => (props.sender === 'website' ? '#eee' : '#007bff')};
    color: ${(props) => (props.sender === 'website' ? '#000' : '#fff')};
`;

const LastMessage = styled.div`
    flex: 1;
    margin-left: 10px;
    cursor: pointer;
`;

const TimeStamp = styled.div`
    font-size: 12px;
    margin-top: 5px;
    color: #777;
`;

const ChatMessageHistory = ({ messages, onLastMessageClick }) => {
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        const fetchLastMessage = async () => {
            if (messages && messages.length > 0) { // Check if messages exist and has length
                try {
                    const lastMessageData = await GetLastMessage(messages[0].webId, messages[0].visitorId);
                    setLastMessage(lastMessageData);
                } catch (error) {
                    console.error("Error fetching last message:", error);
                }
            }
        };

        fetchLastMessage();
    }, [messages]);

    return (
        <div>
            {messages && messages.length > 0 && ( // Only render messages if they exist and have length
                messages.map((message) => (
                    <MessageContainer key={message.timestamp} sender={message.sender}>
                        <Message>{message.content}</Message>
                    </MessageContainer>
                ))
            )}
            {lastMessage && (
                <LastMessage onClick={onLastMessageClick}>
                    <MessageContainer sender={lastMessage.sender}>
                        <Message>{lastMessage.content}</Message>
                    </MessageContainer>
                    <TimeStamp>{moment(lastMessage.time).fromNow()}</TimeStamp>
                </LastMessage>
            )}
        </div>
    );
};

export default ChatMessageHistory;

