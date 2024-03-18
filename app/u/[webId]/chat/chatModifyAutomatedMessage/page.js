
"use client";

import React, { useState } from "react";
import ItemList from "@/app/components/item-list";

export default function ChatModifyAutomatedMessage() {
    const [message, setMessage] = useState("Hello");

    const handleSubmit = () => {
        console.log(message);
    };

    const handleEdit = (event) => {
        setMessage(event.target.value);
    };

    const datas = {

        secondDis: <textarea value={message} onChange={handleEdit} />,
        buttons: [
            { name: "Save", onClick: handleSubmit, color: "success" },

        ],
    };

    return (

        <div>
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500"> Edit Automated Message
                    </p>
                </div>
            </div>
            <ItemList {...datas} />
        </div> );
}
