'use client';

import React from "react";
import CardBox from "@/app/components/Card";

const data = [
    {title: "Template 1"},
    {title: "Template 2"},
    {title: "Template 3"},
    {title: "Template 4"},
]

export default function Dashboard() {

    function testFunction() {
        console.log("Test");
    }

    return (
        <>
            <div className={"p-6 pt-4"}>
                <h1 className={"mb-6"}>Templates</h1>
                <div className={"grid grid-cols-3 gap-6"}>
                    {data.map((item, index) => (
                        <div key={index}>1</div>
                    ))}
                </div>
            </div>
        </>
    );
}
