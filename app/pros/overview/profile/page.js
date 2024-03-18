"use client"
import { Button, Chip, Image, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

export default function Profile() {
    const initialFruits = ["Agricultural Innovations", "Art Exhibitions", "Art Exhibitions", "Astronomy Discoveries", "Automotive News", "Beauty Trends", "Food Technology"]
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]); // Assuming this is the correct initial state
    const [selectedGender, setSelectedGender] = useState(null);
    const [colorTheme, setColorTheme] = useState(null);
    const [fruits, setFruits] = React.useState(initialFruits);
    const [aboutMe, setAboutMe] = useState('')


    const handleClose = (fruitToRemove) => {
        setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
        if (fruits.length === 1) {
            setFruits(initialFruits);
        }
    };
    return (
        <div className='grid grid-cols-2 m-5'>

            <div className='profile'>
                <div className='flex justify-center'>
                    <Image src='/images/profile-picture/profile.svg' alt='profile picture' width={200} height={200} />
                </div>
                <div className='flex justify-around '>
                    <h1 className='font-bold text-2xl'>My Profile</h1>
                    <div className='flex flex-col text-slate-300'>
                        <p> 2024/12/03</p>
                        <p>10.34 pm</p>
                    </div>
                </div>
                <div className='grid items-center grid-cols-2'>
                    <Input className="mt-2 w-fit" size="md" type='text' value={"Kaweesha"} disabled label='First Name' placeholder='Enter Name' />
                    <Input className="mt-2 w-fit" size="md" type='text' value={"Marasinghe"} disabled label='Last Name' placeholder='Enter Name' />
                    <Input className="mt-2 w-fit" size="md" type='email' value={"Kaweesha Marasinghe"} disabled label='Name' placeholder='Enter Name' />
                    <Input className="mt-2 w-fit" size="md" type='phone' value={"770723273"} disabled label='Name' placeholder='Enter Name' />
                    <Select

                        size="md"
                        items={[{ "value": "Dark", "label": "Dark" }, { "value": "Light", "label": "Light" }]}
                        label="Color Theme"
                        placeholder="Select Color Theme"
                        className="max-w-xs mt-2 w-44"
                        value={colorTheme}
                        onChange={(e) => setColorTheme(e.target.value)}
                    >{(theme) => <SelectItem key={theme.value}>{theme.label}</SelectItem>}
                    </Select>
                    <Select
                        color='default'
                        size="md"
                        items={[{ "value": "Male", "label": "Male" }, { "value": "Female", "label": "Female" }, { "value": "Other", "label": "Other" }]}
                        label="Gender"
                        placeholder="Select Gender"
                        className="max-w-xs mt-2 w-44"
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                    >
                        {(gender) => <SelectItem key={gender.value}>{gender.label}</SelectItem>}
                    </Select>
                </div>
                <div className='flex justify-center'>
                    <Button className='mt-3 m-3' color="danger" variant="shadow">
                        Edit
                    </Button>
                    <Button className='mt-3 m-3' color="success" variant="shadow">
                        Save
                    </Button>
                </div>
            </div>

            <div className='Preferences grid grid-rows-2'>
                <div>

                    <div>
                        <h1 className='m-3 font-bold text-xl mb-6' >Preferences</h1>
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        {fruits.map((fruit, index) => (
                            <Chip key={index} onClose={() => handleClose(fruit)} variant="flat">
                                {fruit}
                            </Chip>
                        ))}
                    </div>

                </div>
                <div className='row-2'>
                    <h1 className='m-3 font-bold text-xl mb-6'>About Me</h1>
                    <Textarea
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        classNames="h-40"
                        minRows={10}
                        isRequired
                        variant='bordered'
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="max-w-xs"
                    />
                </div>


            </div>



        </div>
    )
}
