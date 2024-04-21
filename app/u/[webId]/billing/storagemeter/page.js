"use client"
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const getRandomData = () => {
    // Generate random values for remaining and current storage (between 0 and 100)
    const remainingStorage = Math.floor(Math.random() * 101);
    const currentStorage = 100 - remainingStorage;
    return [
        { name: 'Remaining Storage', value: remainingStorage },
        { name: 'Current Storage', value: currentStorage },
    ];
};

const getRandomColor = () => {
    // Generate random color in hexadecimal format
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const StorageOverview = () => {
    const data = getRandomData();
    const COLORS = [getRandomColor(), getRandomColor()];

    return (
        <div style={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div>
                <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Storage Overview</h1>
                <PieChart width={600} height={400}>
                    <Pie
                        data={data}
                        cx={300}
                        cy={200}
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
                <div style={{ fontSize: '1.2em', marginTop: '20px' }}>
                    <div>
                        <span style={{ color: COLORS[0], fontWeight: 'bold' }}>Remaining Storage:</span> {data[0].value}%
                    </div>
                    <div>
                        <span style={{ color: COLORS[1], fontWeight: 'bold' }}>Current Storage:</span> {data[1].value}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorageOverview;
