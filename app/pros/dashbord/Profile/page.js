"use client";
import Input from "@/app/components/Input";
import Textarea from "@/app/components/TextArea";
import { Tag } from 'antd';
import React, { useEffect, useState } from "react";
import { GetUserData, UpdateUser } from "@/services/UserProfileService";
import {Tooltip } from 'antd'

export default function Profile() {
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [favouriteCategories, setFavouriteCategories] = useState([]);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");



    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetUserData(1)
                setFirstName(response.data.username);
                setEmail(response.data.email);
                setAboutMe(response.data.userDescription);
                setLastName(response.data.lname);
                setPhone(response.data.phoneNumber);
                const categories = JSON.parse(response.data.favourCategory);
                setFavouriteCategories(categories);
            } catch (error) {
                console.error("Failed to fetch data: ", error);
            }
        };

        fetchData();
    }, []);

    const UpdateUserData = async () => {
        try {
            let data = {
                username: firstName,
                lname: lastName,
                email: email,
                phoneNumber: phone,
                userDescription: aboutMe,
                favourCategory: JSON.stringify(favouriteCategories)
            };

            setIsDisabled(!isDisabled);
            setIsButtonVisible(!isButtonVisible);

            const response = await UpdateUser(1, data).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error("Failed to update user data: ", error);
            });

            if (response.status === 200) {
                alert("User data updated successfully");
            } else {
                setErrorMessage("Failed to update user data"); // Set error message
            }
        } catch (error) {
            console.error("Failed to update user data: ", error);
        }
    };


    return (
        <div>
            <h1 className="text-center text-4xl font-bold">Profile</h1>
            <div className="flex justify-end">

            <Tooltip placement="top" title="Edit Profile">
          
       
                <button id="editbtn" className={`text-xs text-light dark:text-dark ${isButtonVisible ? '' : 'hidden'}`}

                    onClick={() => {
                        setIsDisabled(!isDisabled)
                        setIsButtonVisible(!isButtonVisible);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
            </Tooltip>
            </div>

            <div className="grid grid-cols-2 gap-10">
                <div>
                    <Input disabled={isDisabled} label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Input disabled={isDisabled} label="Email" type="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Textarea disabled={isDisabled} label="About Me" placeholder="Describe your self" value={aboutMe} onChange={e => setAboutMe(e.target.value)} />
                </div>
                <div>
                    <Input disabled={isDisabled} label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <Input disabled={isDisabled} label="Phone" type="number" value={phone} onChange={e => setPhone(e.target.value)} />

                    <label className="text-xs text-light dark:text-dark">Category</label>
                    <div className="mt-2 bg-black p-3 rounded-xl h-28">
                        {favouriteCategories.map((item, index) => (
                            <Tag key={index} color="" closable={!isDisabled}>
                                {item.category}
                            </Tag>
                        ))}
                    </div>
                </div>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="flex justify-center gap-5 mt-5">
                <button
                    onClick={UpdateUserData}
                    className={`bg-success-50 text-light dark:text-dark px-5 py-2 rounded-lg ${isDisabled ? 'hidden' : ''}`}
                >
                    Save
                </button>
                <button onClick={() => {
                    setIsDisabled(!isDisabled)
                    setIsButtonVisible(!isButtonVisible);
                }

                } className={`bg-success-50 text-light dark:text-dark px-5 py-2 rounded-lg ${isDisabled ? 'hidden' : ''}`}>Cancel</button>
            </div>

        </div>
    );
}