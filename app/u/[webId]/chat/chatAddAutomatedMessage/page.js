"use client";

import React, { useState } from "react";
import ItemList from "@/app/components/item-list";

export default function ChatAddAutomatedMessage() {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {

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
    const ItemListdata = {
        secondDis: "Hello",
        buttons: [
            {name: "Select", onClick: "enter onclick function here", color: "default" },
            { name: "Modify", onClick: "enter onclick function here", color: "success" },
            { name: "Delete", onClick: "enter onclick function here", color: "danger" },
        ],
    };
    return (

        <div>
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500"> Add Automated Message
                    </p>
                </div>
            </div>
            <div className="mt-4">
                <ItemList {...ItemListdata} />
            </div>
            <div className="mt-4">
            <ItemList {...datas} />
            </div>
        </div>
    );
}
