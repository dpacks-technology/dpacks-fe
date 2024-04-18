'use client';
import React, { useState } from 'react';
import FAQ from './FAQ';
import ChatWithAdmin from './ChatWithAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const headerText = selectedOption? (
        selectedOption === 'faq'? 'FAQ' : 'Chat with admin'
    ) : 'Chat';
    const webId = '5';

    const handleGoBack = () => {
        setSelectedOption(null);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div
                className="chat-icon"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#0f100f',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onClick={() => setIsOpen(true)}
            >
                <FontAwesomeIcon icon={faCommentAlt} size="2x" color="white" />
            </div>
            {isOpen && (
                <div
                    className="chat-window"
                    style={{
                        position: 'fixed',
                        bottom: '60px',
                        right: '20px',
                        width: '320px',
                        height: '440px',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        zIndex: 100,
                    }}
                >
                    <div
                        className="chat-header"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            backgroundColor: '#004a77',
                            borderBottom: '1px solid #ddd',
                            borderRadius: '4px 4px 0 0',
                        }}
                    >
                        <h2 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
                            {headerText}
                        </h2>
                        {selectedOption ? (
                            <button
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'black',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    transition: 'color 0.3s ease',
                                }}
                                onClick={handleGoBack}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} /> Back
                            </button>
                        ) : (
                            <button
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'black',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    transition: 'color 0.3s ease',
                                }}
                                onClick={handleClose}
                            >
                                X
                            </button>
                        )}
                    </div>
                    {!selectedOption && (
                        <div
                            className="chat-options"
                            style={{
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <button
                                style={{
                                    backgroundColor: '#004a77',
                                    border: '1px solid #ddd',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onClick={() => setSelectedOption('faq')}
                            >
                                FAQ
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#004a77',
                                    border: '1px solid #ddd',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onClick={() => setSelectedOption('chat')}
                            >
                                Chat with admin
                            </button>
                        </div>
                    )}
                    {selectedOption === 'faq' && <FAQ />}
                    {selectedOption === 'chat' && <ChatWithAdmin webId={webId} />}
                </div>
            )}
        </>
    );

};

export default Chat;