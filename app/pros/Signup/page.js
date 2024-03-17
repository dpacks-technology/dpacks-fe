"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Divider, Input } from '@nextui-org/react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement your signup logic here
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='grid grid-cols-2 bg-secondaryLight dark:bg-secondaryDark shadow-xl h-fit w-[60rem] rounded-3xl'>
        {/* add image */}
        <div className='relative h-full w-full'> {/* Make sure this div is the container for the image */}
          <Image
            className='rounded-l-3xl'
            src='/images/PersonolizedContent/Background.jpg'
            layout='fill'
            objectFit='cover' // This makes the image cover the available space
            quality={100} // Optional: Adjust quality
          />
        </div>
        
        <div>
          <h1 className='text-4xl m-5 text-center font-bold text-primaryLight dark:text-primaryDark'>Sign Up</h1>
          <form className='flex flex-col items-center' onSubmit={handleSignup}>
            <Input 
              type="text" 
              variant="faded" 
              label="Name" 
              placeholder="Enter Your Name" 
              size="sm" 
              radius="full" 
              className="w-80 text-black m-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              type="email" 
              variant="faded" 
              label="Email" 
              placeholder="Enter Your Email" 
              size="sm" 
              radius="full" 
              className="w-80 text-black m-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password" 
              variant="faded" 
              label="Password" 
              placeholder="Enter Your Password" 
              size="sm" 
              radius="full" 
              className="w-80 text-black m-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input 
              type="password" 
              variant="faded" 
              label="Re-Password" 
              placeholder="Re-Enter your Password" 
              size="sm" 
              radius="full" 
              className="w-80 text-black m-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button color="primary" className='w-52 mt-5' variant="shadow" type="submit">
              Sign Up
            </Button>
            <Divider className='w-fit mt-5' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
