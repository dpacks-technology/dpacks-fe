"use client"
import React from "react";
import CardTbl from "@/app/components/Analytics/CardTbl";
import { Divider, Table } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useParams } from "next/navigation";

const dataSource = [
    {
        key: '1',
        country: 'USA',
        UserCount: 500,
        Percentage: 25,
    },
    {
        key: '2',
        country: 'UK',
        UserCount: 700,
        Percentage: 35,
    },
    {
        key: '3',
        country: 'India',
        UserCount: 400,
        Percentage: 20,
    },
    {
        key: '4',
        country: 'Australia',
        UserCount: 500,
        Percentage: 25,
    },
];
const columns = [
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Count',
        dataIndex: 'UserCount',
        key: 'UserCount',
    },

];




export default function Analytics() {
    const [userCountByCountry, setUserCountByCountry] = useState([]);
    const [websiteTrafficData, setWebsiteTrafficData] = useState([]);
    const [visitorSourceData, setVisitorSourceData] = useState([]);
    const [visitorDeviceData, setVisitorDeviceData] = useState([]);
    const { webId } = useParams();

    const fetchUserCountByCountry = () => {
        
        const data = [
            { country: 'USA', userCount: 500 },
            { country: 'UK', userCount: 700 },
            { country: 'India', userCount: 400 },
            { country: 'Australia', userCount: 500 }
        ];
        setUserCountByCountry(data);
    };
    // Fetch website traffic data
    const fetchWebsiteTrafficData = () => {
        // Example fetch call to fetch website traffic data
        // Replace with your actual API endpoint or database call
        const data = [150, 230, 224, 218, 135, 147, 260];
        setWebsiteTrafficData(data);
    };

    const fetchVisitorSourceData = () => {
        // Example fetch call to fetch visitor source data
        // Replace with your actual API endpoint or database call
        const data = [
            { value: 100, name: 'WhatsApp' },
            { value: 200, name: 'Facebook' },
            { value: 150, name: 'Direct Users' },
            { value: 50, name: 'Referral Links' }
        ];
        setVisitorSourceData(data);
    };

    // Fetch visitor device data
    const fetchVisitorDeviceData = () => {
        // Example fetch call to fetch visitor device data
        // Replace with your actual API endpoint or database call
        const data = [150, 230, 224];
        setVisitorDeviceData(data);
    };



    return (
        <div >
            <div>
                <h1 className="text text-3xl font-bold">Dashboard</h1>
            </div>
            <div className="grid grid-cols-4 m-3">
                <CardTbl name="Real Time User Count" count="1M" />
                <CardTbl name="Visited Users" count="8.23K" />
                <CardTbl name="Active Users" count="2.3M" />
                <CardTbl name="Sessions(Live)" count="8K" />
                <Divider />
            </div>



            {/* desgign h1 for header as website traffic */}
            <div className="grid grid-cols-2 grid-rows-2">
                <div className="w-full overflow-auto h-96 ">

                    <h1 className="text-2xl mt-5 font-bold text-center">Website Traffic</h1>
                    <ReactECharts
                        className="w-full mt-6"
                        option={{
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            legend: {
                                data: ['Sales']

                            },

                            yAxis: {
                                type: 'value'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            series: [{
                                data: [150, 230, 224, 218, 135, 147, 260],
                                type: 'bar'
                            }]
                        }}
                    />


                </div>




                {/* chart about visitors source facebook,whatsapp,instagrame,direct visit in pie chart */}
                <div className="w-full h-96 border-l-1">

                    <h1 className="text-2xl mt-5 font-bold text-center">Visitor Source</h1>
                    <ReactECharts
                        option={{

                            tooltip: {},
                            series: [{
                                name: 'User Source',
                                type: 'pie',
                                data: [
                                    { value: 100, name: 'WhatsApp' },
                                    { value: 200, name: 'Facebook' },
                                    { value: 150, name: 'Direct Users' },
                                    { value: 50, name: 'Referral Links' }
                                ]
                            }]
                        }}
                    />

                </div>



                {/*visitor country table*/}
                <div className="w-full h-96 border-1 overflow-scroll">
                    <h1 className="text-2xl mt-5 font-bold text-center pb-6">User by Country</h1>

                    <Table dataSource={dataSource} columns={columns} />;


                </div>




                {/* visitor devices data horizonal grph */}
                <div className="w-full h-96 border-1">
                    <h1 className="text-2xl mt-5 font-bold text-center">Visitor Devices</h1>

                    <ReactECharts
                        className="p-5"
                        option={{
                            xAxis: {
                                type: 'value'
                            },
                            yAxis: {
                                type: 'category',
                                data: ['Mobile', 'Desktop', 'Tablet']
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            series: [{
                                data: [150, 230, 224],
                                type: 'bar'
                            }]
                        }}
                    />

                </div>

            </div>
        </div>
    );
}