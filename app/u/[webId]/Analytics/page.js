import React from "react";
import CardTbl from "@/app/components/icons/CardTbl";
import { Divider } from 'antd';
export default function Analytics() {
    return (
        <div >
            <div>
                <h1 className="text text-3xl font-bold">Dashboard</h1>
            </div>
            <div className="grid grid-cols-4 m-3">
                <CardTbl name="Sessions(Live)" count="100"/>
                <CardTbl name="Sessions(Live)" count="100"/>
                <CardTbl name="Sessions(Live)" count="100"/>
                <CardTbl name="Sessions(Live)" count="100"/>
                <Divider />
            </div>
            <div className="grid grid-cols-2 grid-rows-2">

                <div className="w-full h-96 border-1">
                    <Bar
                        options={...}
                        data={...}
                        {...props}
                    />

                </div>
                <div className="w-full h-96 border-1">
                    test

                </div>
                <div className="w-full h-96 border-1">
                    test

                </div>
                <div className="w-full h-96 border-1">
                    test

                </div>

            </div>
        </div>
    );
}