"use client"
import { Flex, Input, Button, Radio, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';

function Create() {
    const [name, setName] = useState("");
    const [triggerCount, setTriggerCount] = useState("");
    const [duration, setDuration] = useState("a"); // Default value for Radio.Group
    const [reminderOption, setReminderOption] = useState("Hourly"); // Default value for Dropdown

    function handleDurationChange(e) {
        setDuration(e.target.value);
    }

    function handleReminderOptionClick(e) {
        setReminderOption(e.key);
    }

    return (
        <div>
            <h1 className="text-center text-3xl font-bold m-10">Create Alert</h1>
            <form className="p-7 ">

                <div className=" ">
                    <label className="text-lg font-bold">Name</label>
                    <Input className={"w-96 h-12"} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div className="mt-6">
                    <label className="text-lg font-bold">Trigger Count</label>
                    <Input className={"w-96 h-12"} placeholder="Trigger Count" value={triggerCount} onChange={(e) => setTriggerCount(e.target.value)} />
                </div>

                <div className="flex justify-start mt-10 ">
                    <Flex vertical gap="middle">
                        <Radio.Group className="h-16" value={duration} onChange={handleDurationChange} buttonStyle="solid">
                            <label className="text-lg font-bold text-white">Duration</label>
                            <Radio.Button value="a">Immediate</Radio.Button>
                            <Radio.Button value="b">Before Reach</Radio.Button>
                            <Radio.Button value="c">Both</Radio.Button>
                        </Radio.Group>
                    </Flex>
                </div>

                <div>
                    <label className="text-lg font-bold text-white">Reminder Option</label>
                    <Dropdown
                        overlay={
                            <Menu onClick={handleReminderOptionClick}>
                                <Menu.Item key="1">Hourly</Menu.Item>
                                <Menu.Item key="2">Daily</Menu.Item>
                                <Menu.Item key="3">Weekly</Menu.Item>
                                <Menu.Item key="4">CustomDate</Menu.Item>
                            </Menu>
                        }
                        placement="bottom"
                    >
                        <Button className="text-lg font-black" size="large">{reminderOption}</Button>
                    </Dropdown>
                </div>

                <div className="mt-20 flex justify-center">
                    <Button>Create Alert</Button>
                </div>
            </form>
        </div>
    )
}

export default Create;
