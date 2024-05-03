"use client"
import React, {useEffect, useState} from "react";
import CardTbl from "@/app/components/Analytics/CardTbl";
import {Divider, Table} from 'antd';
import ReactECharts from 'echarts-for-react';
import {useParams} from "next/navigation";
import {
    getTraffic,
    visitorSource,
    visitorCountry,
    visitorDevice
} from "@/services/AnalyticsDashbordService";


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
    const {webId} = useParams();

    useEffect(() => {
        fetchUserCountByCountry();
        fetchTraffic();
        fetchVisitorSourceData();
        fetchVisitorDeviceData();
    }, []);


    const fetchUserCountByCountry = () => {
        visitorCountry(webId)
            .then((data) => {
                // Map the API response to match the dataSource structure
                const mappedData = data.map((entry, index) => ({
                    key: String(index + 1), // Assuming key should be unique
                    country: entry.country_code, // Change this to match your API response key
                    UserCount: entry.user_count // Change this to match your API response key
                }));
                setUserCountByCountry(mappedData);
            })
            .catch((error) => {
                console.error("Error fetching country data:", error);
            });
    };

    const fetchTraffic = () => {
        getTraffic(webId).then((data) => {
            setWebsiteTrafficData(data.map(entry => entry.session_count));
        }).catch((error) => {
            console.error("Error fetching website traffic data:", error);
        });
    };

    const fetchVisitorSourceData = () => {
        visitorSource(webId).then((data) => {
            setVisitorSourceData(data.map(entry => ({
                value: entry.user_count,
                name: entry.user_source
            })));
        }).catch((error) => {
            console.error("Error fetching visitor source data:", error);
        });
    };

    const fetchVisitorDeviceData = () => {
        visitorDevice(webId).then((data) => {
            setVisitorDeviceData(data.map(entry => ({
                data: entry.device_count,
                type: entry.device_name
            })));
        }).catch((error) => {
            console.error("Error fetching visitor device data:", error);
        });
    };


    return (
        <div>
            <div>
                <h1 className="text text-3xl font-bold">Dashboard</h1>
            </div>

            {/* desgign h1 for header as website traffic */}
            <div className="grid grid-cols-2 grid-rows-2">
                <div className="w-full overflow-auto h-96 ">

                    <h1 className="text-2xl mt-5 font-bold text-center">Website Traffic</h1>

                    <ReactECharts
                        option={{
                            // Existing option configuration

                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: { // Add yAxis configuration here
                                type: 'value' // This sets the type of yAxis to numeric value
                            },
                            series: [{
                                data: websiteTrafficData,
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
                                data: visitorSourceData
                            }]
                        }}
                    />




                </div>
                {/*visitor country table*/}
                <div className="w-full h-96 border-1 overflow-scroll">
                    <h1 className="text-2xl mt-5 font-bold text-center pb-6">User by Country</h1>
                    <Table dataSource={userCountByCountry} columns={columns}/>;


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
                            yAxis: [{
                                type: 'category',
                                data: visitorDeviceData.map(entry => entry.type)
                            }],

                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            series: [{
                                data: visitorDeviceData.map(entry => entry.data),
                                type: 'bar'
                            }]
                        }}
                    />

                </div>

            </div>
        </div>
    );
}