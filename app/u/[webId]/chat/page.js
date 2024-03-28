'use client';
import React, { useState } from 'react';
import AutomatedMessageTable from '@/app/components/AutomatedMessageTable';
import { Button } from 'antd';

const AutomatedMessagePage = () => {
    const [data, setData] = useState([
        {
            id: 1,
            message: 'Hello, world!',
            trigger: 'Time-based',
            status: 'active',
            lastUpdate: new Date(),
        },
        // Add more data here
    ]);

    const onUpdate = (id, updates) => {
        setData(
            data.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    const onDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const addRow = () => {
        setData([
            ...data,
            {
                id: data.length + 1,
                message: '',
                trigger: '',
                status: 'inactive',
                lastUpdate: new Date(),
            },
        ]);
    };

    return (
        <div>
            <div className="mb-4">
                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">Automated Message</p>
                </div>
            </div>
            <AutomatedMessageTable data={data} onUpdate={onUpdate} onDelete={onDelete} />
            <Button type="primary" onClick={addRow}>
                Add Message
            </Button>
        </div>
    );
};

export default AutomatedMessagePage;