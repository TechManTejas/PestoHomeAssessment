// src/components/TaskList.js
import React from 'react';
import { Table, Button, Select } from 'antd';
import axiosInstance from '../api/axiosInstance';

const { Option } = Select;

const TaskList = ({ tasks, fetchTasks }) => {
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/tasks/${id}/`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const handleStatusChange = async (id, value) => {
        try {
            await axiosInstance.patch(`/tasks/${id}/`, { status: value });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status', error);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
                <Select defaultValue={record.status} onChange={(value) => handleStatusChange(record.id, value)}>
                    <Option value="To Do">To Do</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Done">Done</Option>
                </Select>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return <Table dataSource={tasks} columns={columns} rowKey="id" />;
};

export default TaskList;
