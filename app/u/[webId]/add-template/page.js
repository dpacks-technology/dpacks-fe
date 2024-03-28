'use client'
import React from 'react';
import { Form, Input, Select, InputNumber, Upload, Button, Space} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

//Function to add a template to the marketplace
export default function MarketplaceAddTemplate(){
    // Define layout for form
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    // Option from Select
    const { Option } = Select;

    // Define suffix selector for InputNumber
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );

    // Normalize file for upload
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // Return JSX for the component
    return (
        <>
            <h1 className="mt-4 ml-6">Add Template to the Marketplace</h1><br/>
            <Form className="p-6 w-960">
                <div className="flex justify-between">
                    <div className="bg-gray-200 bg-opacity-50 rounded-lg w-1/2 pr-10 p-6">
                        <h2 className="text-lg text-black">Template Details:</h2>
                        <Form.Item
                            label="Template Name"
                            name="templatename"
                            rules={[
                                {
                                    required: true,
                                    message: 'Name of the Template is required!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'tempDescription']} label="Template Description" className="p-3">
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item label="Template Category" className="p-3">
                            <Select>
                                <Option value="Blog & Magazine">Blog & Magazine</Option>
                                <Option value="Business & Corporate">Business & Corporate</Option>
                                <Option value="E-commerce">E-commerce</Option>
                                <Option value="Education & Learning">Education & Learning</Option>
                                <Option value="Fashion & Beauty">Fashion & Beauty</Option>
                                <Option value="Food & Restaurant">Food & Restaurant</Option>
                                <Option value="Health & Fitness">Health & Fitness</Option>
                                <Option value="Real Estate">Real Estate</Option>
                                <Option value="Portfolio & Resume">Portfolio & Resume</Option>
                                <Option value="Technology & Apps">Technology & Apps</Option>
                                <Option value="Travel & Tourism">Travel & Tourism</Option>
                                <Option value="Other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="tempPrice"
                            label="Price Suggestion"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input donation amount!',
                                },
                                {
                                    type: 'number',
                                    min: 0, // Minimum value allowed
                                    max: 100, // Maximum value allowed
                                    message: 'Template price must be between $0 and $100!',
                                },
                            ]}
                        >
                            <InputNumber
                                addonAfter={suffixSelector}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>


                    </div>
                    <div className="bg-gray-200 bg-opacity-50 rounded-lg w-1/2 pl-10 p-6 ml-4">
                        <h2 className="text-lg text-black">Files:</h2>
                        <Form.Item label="Upload Template">
                            <Form.Item name="draggerTemp" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                <Upload.Dragger name="files" action="/upload.do">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined/>
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Upload as a .zip folder.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>

                        <h2 className="text-lg text-black">Developer Details:</h2>
                        <Form.Item
                            name={['user', 'Dname']}
                            label="Developer's Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['user', 'tempDescription']} label="Template Message" className="p-3">
                            <Input.TextArea/>
                        </Form.Item>

                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <Space direction="horizontal" style={{ maxWidth: 600, margin: '0 auto' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="reset">reset</Button>
                    </Space>
                </div>
            </Form>


        </>
)
}