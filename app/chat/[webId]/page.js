'use client';
import React, { useState } from 'react';
import FAQ from './FAQ';
import ChatWithAdmin from './ChatWithAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from "next/navigation";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const { webId } = useParams();

    const headerText = selectedOption? (
        selectedOption === 'faq'? 'FAQ' : 'Chat with admin'
    ) : 'Chat';


    const handleGoBack = () => {
        setSelectedOption(null);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (

                    <div
                        className="chat-header"
                        style={{
                            display: 'flex',

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