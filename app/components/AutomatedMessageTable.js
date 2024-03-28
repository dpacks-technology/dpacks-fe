import React from 'react';
import { Table, Switch, Button } from 'antd';
import moment from 'moment';

const AutomatedMessageTable = ({ data, onUpdate, onDelete }) => {
    const columns = [
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Trigger',
            dataIndex: 'trigger',
            key: 'trigger',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Switch
                    checked={status === 'active'}
                    onChange={() => onUpdate(record.id, { status: status === 'active' ? 'inactive' : 'active' })}
                />
            ),
        },
        {
            title: 'Last Update',
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
            render: (lastUpdate) => moment(lastUpdate).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => onUpdate(record.id, { lastUpdate: new Date() })}>
                        Update
                    </Button>
                    <Button danger onClick={() => onDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default AutomatedMessageTable;