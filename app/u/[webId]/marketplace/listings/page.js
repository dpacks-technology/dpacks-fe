'use client';

import React from "react";
import CardBox from "@/app/components/Card";

const data = [
    {title: "Template 1"},
    {title: "Template 2"},
    {title: "Template 3"},
    {title: "Template 4"},
]

export default function MarketplaceListing() {

    function testFunction() {
        console.log("Test");
    }

    return (
        <>
            <div className={"p-6 pt-4"}>
                <h1 className={"mb-6"}>Templates</h1>
                <div className={"grid grid-cols-3 gap-6"}>
                    {data.map((item, index) => (
                        <CardBox
                            key={index}
                            title={item.title}
                            secondary="Second Description"
                            image="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            buttons={[{name: "Button 1", color: "primary", onClick: testFunction}, {
                                name: "Button 2",
                                color: "warning"
                            }, {name: "Button 3", color: "danger"}]}
                            className="col-span-1 w-full"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
