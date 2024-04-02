'use client';

import React from "react";
import CardBox from "@/app/components/Card";

const data = [
    {title: "Template 1", image: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {title: "Template 2",image: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},

]

export default function ChatTemplateView() {

    function testFunction() {
        console.log("Test");
    }

    return (
        <>
        <div className={"p-6 pt-4 flex flex-col items-center justify-center"}>
        <h1 className={"text-3xl mb-6"}>Templates</h1>
    <div className={"grid grid-cols-3 gap-6"}>

        {data.map((item, index) => (
            <CardBox
                key={index}
                title={item.title}

                image={item.image}
                description={item.description}
                buttons={[{name: "Select", color: "primary", onClick: testFunction}]}
                className="col-span-1 w-full"
            />
        ))}
    </div>
        </div>
        </>
    );
}

