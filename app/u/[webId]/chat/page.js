"use client"
import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddChatPage = () => {
    const [chatUrls, setChatUrls] = useState([{ url: '', isOpen: false }]);
    const [openChats, setOpenChats] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleUrlChange = (e, index) => {
        const newUrls = [...chatUrls];
        newUrls[index].url = e.target.value;
        setChatUrls(newUrls);
        setIsValid(newUrls.every(({ url }) => isValidUrl(url)));
    };

    const handleAddChat = () => {
        setChatUrls([...chatUrls, { url: '', isOpen: false }]);
    };

    const handleRemoveChat = (index) => {
        const newUrls = [...chatUrls];
        newUrls.splice(index, 1);
        setChatUrls(newUrls);
    };

    const handleOpenChat = (index) => {
        const newUrls = [...chatUrls];
        newUrls[index].isOpen = true;
        setChatUrls(newUrls);
        setOpenChats([...openChats, chatUrls[index].url]);
    };

    const isValidUrl = (url) => {
        const urlRegex = /^(http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const invalidUrls = chatUrls.filter(({ url }) => !isValidUrl(url));
        if (invalidUrls.length > 0) {
            message.error('Please enter valid URLs for all chats.');
            return;
        }
        setIsFormSubmitted(true);
        setMessage('Chats added successfully!');
    };

    return (
        <div>
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">Add Web Chat</p>
                </div>
            </div>
            <Form onFinish={handleSubmit}>
                <div className="flex flex-wrap">
                    {chatUrls.map((url, index) => (
                        <div
                            key={index}
                            className={`${index === 0 ? 'mr-4' : ''} mb-4 sm:flex sm:flex-col sm:align-center`}
                        >
                            <div className="relative self-center mt-4 bg-gray-800 rounded-lg p-10 flex sm:mt-8 border border-zinc-800">
                                <Input.Group compact>
                                    <Input
                                        type="text"
                                        value={url.url}
                                        onChange={(e) => handleUrlChange(e, index)}
                                        placeholder={`Chat URL${index + 1}`}
                                        disabled={url.isOpen}
                                        style={{
                                            height: '24px',
                                            fontSize: '12px',
                                            lineHeight: '16px',
                                            mb: '10px' // Add margin to the bottom of the input field
                                        }}
                                    />
                                    {!url.isOpen && (
                                        <div className="mb -8">
                                            <Button
                                                type="primary"
                                                style={{marginTop: '10px'}} // Corrected syntax
                                                disabled={!isValid}
                                                onClick={() => handleOpenChat(index)}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    )}
                                    {url.isOpen && (
                                        <div className="button-container mb -8">
                                            <Button
                                                type="primary"
                                                onClick={() => handleRemoveChat(index)}
                                                style={{marginTop: '10px', marginRight: '10px'}}


                                            >
                                                Remove
                                            </Button>

                                            <Button
                                                type="primary"
                                                onClick={() => handleOpenChat(index)}
                                                style={{marginTop: '10px'}} //
                                            >
                                                Open
                                            </Button>
                                        </div>
                                    )}
                                </Input.Group>
                                {!isValidUrl(url.url) && url.url !== '' && (
                                    <p style={{ color: 'red' }}>Please enter a valid URL.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Form>

            <Form.Item>
                <Button type="primary" onClick={handleAddChat}>
                    <PlusOutlined /> Add Chat
                </Button>
            </Form.Item>

            {isFormSubmitted && (
                <Form.Item>
                    <p>The following chats have been opened:</p>
                    <ul>
                        {openChats.map((chat, index) => (
                            <li key={index}>{chat}</li>
                        ))}
                    </ul>
                </Form.Item>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddChatPage;