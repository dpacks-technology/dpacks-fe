import { useEffect, useState } from "react";
import axios from "axios";
import Keys from "@/Keys";
import io from "socket.io-client";

const socket = io(Keys.MESSAGE_SERVICE_API_URL);

const ChatMessageHistory = ({ messages, visitorId }) => {
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        const fetchLastMessage = async () => {
            try {
                const response = await axios.get(
                    `/getLastMessage?webId=${Keys.WEB_ID}&visitorId=${visitorId}`
                );
                setLastMessage(response.data);
            } catch (error) {
                console.error("Error fetching last message:", error);
            }
        };

        if (visitorId) {
            fetchLastMessage();
        }
    }, [visitorId]);

    return (
        <div className="chat-message-history">
            {/* Render the last message */}
            {lastMessage && (
                <div className="chat-message">
                    <div className="message-sender">{lastMessage.sender}</div>
                    <div className="message-content">{lastMessage.content}</div>
                </div>
            )}

            {/* Render the chat messages */}
            {messages &&
                messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-content">{message.content}</div>
                    </div>
                ))}
        </div>
    );
};

export default ChatMessageHistory;