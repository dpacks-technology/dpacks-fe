"use client"
import React from "react";
import CardTbl from "@/app/components/icons/CardTbl";
import { Divider, Table } from 'antd';
import ReactECharts from 'echarts-for-react';

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
    {
        title: 'Percentage',
        dataIndex: 'Percentage',
        key: 'Percentage',
      },
  ];

export default function Analytics() {

    return (
        <div >
            <div>
                <h1 className="text text-3xl font-bold">Dashboard</h1>
            </div>
            <div className="grid grid-cols-4 m-3">
                <CardTbl name="Sessions(Live)" count="100" />
                <CardTbl name="Sessions(Live)" count="100" />
                <CardTbl name="Sessions(Live)" count="100" />
                <CardTbl name="Sessions(Live)" count="100" />
                <Divider />
            </div>
            <div className="grid grid-cols-2 grid-rows-2">

                <div className="w-full overflow-auto h-96 ">
                    {/* desgign h1 for header as website traffic */}
                    <h1 className="text-3xl mt-5 font-bold text-center">Website Traffic</h1>
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
                <div className="w-full h-96 border-l-1">
                    {/* chart about visitors source facebook,whatsapp,instagrame,direct visit in pie chart */}
                    <h1 className="text-3xl mt-5 font-bold text-center">User Source</h1>
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
                <div className="w-full h-96 border-1">

                <Table dataSource={dataSource} columns={columns} />;
                    

                </div>
                <div className="w-full h-96 border-1">
                        {/* visitor devices data horizonal grph */}
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