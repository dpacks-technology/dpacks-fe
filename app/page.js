'use client';

import React from "react";
import CardBox from "@/app/components/Card";

export default function Home() {

    function testFunction() {
        console.log("Test");
    }

    return (
        <main className="flex flex-col items-center justify-between p-24 bg-secondaryLight dark:bg-secondaryDark">
            <form>

                {/* Card table */}
                {/* @nextui-org/react */}
                <CardBox
                    title="Card Title"
                    secondary="Second Description"
                    image="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    buttons={[{name: "Button 1", color: "primary", onClick: testFunction}, {
                        name: "Button 2",
                        color: "warning"
                    }, {name: "Button 3", color: "danger"}]}
                    className="w-96"
                />

            </form>
        </main>
    );
}
