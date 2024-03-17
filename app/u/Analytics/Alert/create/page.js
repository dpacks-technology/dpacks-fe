"use client"
import {Flex, Input} from 'antd';
import React, { useState } from 'react';
import { Radio } from 'antd';
import { Button } from 'antd';
import {  Dropdown, Space } from 'antd';

function handleMenuClick(e) {
    console.log('click', e);
}

const items = [
    {
        key: '1',
        label: (

            "Hourly"

        ),
    },
    {
        key: '2',
        label: (

            "Daily"

        ),
    },
    {
        key: '3',
        label: (

            "Weekly"

        ),
    },
    {
        key: '4',
        label: (

            "CustomDate"

        ),
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};



export default function Create(){
    const [value, setValue] = useState(1);
    return (
        <div>
            <h1 className="text-center text-3xl font-bold m-10">Create Alert</h1>
            <form className="p-7 ">

                <div className=" ">
                    <label className="text-lg font-bold">Name</label>
                    <Input className={"w-96 h-12"} placeholder="Name"/>

                </div>
                <div className="mt-6">
                    <label className="text-lg font-bold">Trigger Count</label>
                    <Input className={"w-96 h-12"} placeholder="Trigger Count"/>
                </div>

                <div className="flex justify-start  mt-10 ">

                    <Flex vertical gap="middle">
                        <Radio.Group className="h-16" defaultValue="a" buttonStyle="solid">
                            <label className="text-lg font-bold text-white">Duration</label>
                            <Radio.Button value="a">Immediate</Radio.Button>
                            <Radio.Button value="b">Before Reach</Radio.Button>
                            <Radio.Button value="c">Both</Radio.Button>
                            {/*<Radio.Button value="d">Chengdu</Radio.Button>*/}
                        </Radio.Group>
                    </Flex>







                </div>

                <div>
                    <label className="text-lg font-bold text-white">Reminder Option</label>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottom"
                    >
                        <Button className="text-lg font-black " size="large">Options</Button>
                    </Dropdown>
                </div>
                <div className="mt-20 flex justify-center">
                    <Button>Create Alert</Button>
                </div>


            </form>


        </div>
    )
}