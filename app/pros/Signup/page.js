"use client"
import { useState } from 'react';
import { Button, Divider, Input, Textarea, Select, Chip, SelectItem } from '@nextui-org/react';
import { users, animals } from '@/app/components/PersonlizedContent/SIgnUp/data';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]); // Assuming this is the correct initial state
  const [selectedGender, setSelectedGender] = useState(null);
  const [colorTheme, setColorTheme] = useState(null);



  const handleSignup = (e) => {
    e.preventDefault();
    // Implement your signup logic here
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-secondaryLight dark:bg-secondaryDark shadow-xl h-fit w-[60rem] rounded-3xl'>
        <div>
          <h1 className='text-4xl m-5 text-center font-bold text-primaryLight dark:text-primaryDark'>Sign Up</h1>
          <form className='grid grid-cols-2 items-center' onSubmit={handleSignup}>
            <div className='flex flex-col mt-5 items-center gap-3'>
              <Input
                type="text"
                variant="faded"
                label="First Name"
                placeholder="Enter Your First Name"
                size="sm"
                className="w-80 text-black m-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="email"
                variant="faded"
                label="Email"
                placeholder="Enter Email"
                size="sm"
                className="w-80 text-black m-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Assuming another input or a date picker should be here */}
              <Select
                items={users}
                variant="bordered"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Select Categories"
                labelPlacement="outside"
                classNames={{
                  base: "max-w-xs",
                  trigger: "min-h-unit-12 py-2",
                }}
                selectedItems={selectedUsers}
                onSelectionChange={(newSelection) => setSelectedUsers(newSelection)}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap max-h-16 overflow-scroll gap-2">
                      {items.map((item) => (
                        <Chip key={item.key}>{item.data.name}</Chip>
                      ))}
                    </div>
                  );
                }}
              >
                {(user) => (
                  <SelectItem key={user.id} textValue={user.name}>
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col ">
                        <span className="text-small">{user.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <Select
                size="sm"
                items={[{ "value": "Dark", "label": "Dark" }, { "value": "Light", "label": "Light" }]}
                label="Color Theme"
                placeholder="Select Color Theme"
                className="max-w-xs"
                value={colorTheme}
                onChange={(e) => setColorTheme(e.target.value)}
              >
                {(theme) => <SelectItem key={theme.value}>{theme.label}</SelectItem>}
              </Select>
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className="max-w-xs"
              />
            </div>
            <div className='flex flex-col items-center gap-3'>
              <Input
                type="text"
                variant="faded"
                label="Last Name"
                placeholder="Enter Your Last Name"
                size="sm"
                className="w-80 text-black m-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                type="phone"
                variant="faded"
                label="Phone"
                placeholder="Enter Phone Number"
                size="sm"
                className="w-80 text-black m-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Select
                size="sm"
                items={[{ "value": "Male", "label": "Male" }, { "value": "Female", "label": "female" }]}
                label="Gender"
                placeholder="Select Gender"
                className="max-w-xs"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                {(gender) => <SelectItem key={gender.value}>{gender.label}</SelectItem>}
              </Select>
              <Input
                type="password"
                variant="faded"
                label="Password"
                placeholder="Enter Your Password"
                size="sm"
                className="w-80 text-black m-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                variant="faded"
                label="Confirm Password"
                placeholder="Confirm Your Password"
                size="sm"
                className="w-80 text-black m-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button color="primary" className='w-52 mt-5' variant="shadow" type="submit">
                Sign Up
              </Button>
            </div>
            <Divider className='w-fit mt-5' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
