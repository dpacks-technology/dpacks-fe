"use client"
import {Flex, Input} from 'antd';
import React, { useState } from 'react';
import { Radio } from 'antd';




export default function Create(){
    const [value, setValue] = useState(1);
    return (
        <div>
            <h1 className="text-center text-3xl font-bold m-10">Create Alert</h1>
            <form className="p-7 ">

                <div className="flex justify-around ">
                    <label className="text-lg font-bold">Name</label>
                    <Input className={"w-96 h-12"} placeholder="Basic usage"/>
                    <label className="text-lg font-bold">Name</label>
                    <Input className={"w-96"} placeholder="Basic usage"/>
                </div>
                <div className="flex mt-3 justify-around ">

                    <Flex vertical gap="middle">
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">Hangzhou</Radio.Button>
                            <Radio.Button value="b">Shanghai</Radio.Button>
                            <Radio.Button value="c">Beijing</Radio.Button>
                            <Radio.Button value="d">Chengdu</Radio.Button>
                        </Radio.Group>
                    </Flex>

                </div>


            </form>


        </div>
    )
}