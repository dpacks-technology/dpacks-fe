import React from "react";

const Message = ({ message }) => {
    return (
        <div className="message">
            <div className="sender">{message.sender}</div>
            <div className="content">{message.message}</div>
            <div className="time">{message.time}</div>
        </div>
    );
};

export default Message;