import React from 'react';
import { DatePicker, Space, ConfigProvider } from 'antd';
const { RangePicker } = DatePicker;
import { AntdRegistry } from '@ant-design/nextjs-registry';
const DatePickerRange = () => (

  <AntdRegistry>
    < ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#1890ff',
          borderRadius: 8,
          
        },
      }}
    >
      <Space direction="vertical" className='m-2' size={12}>
        <RangePicker
          className='h-12 '
        />
      </Space>
    </ConfigProvider>
  </AntdRegistry>
);
export default DatePickerRange;