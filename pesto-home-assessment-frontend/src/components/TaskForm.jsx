// src/components/TaskForm.js
import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axiosInstance from '../api/axiosInstance';

const { Option } = Select;

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');

    const handleSubmit = async () => {
        try {
            await axiosInstance.post('/tasks/', { title, description, status });
            fetchTasks();
            setTitle('');
            setDescription('');
            setStatus('To Do');
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    return (
        <Form layout="inline" onFinish={handleSubmit}>
            <Form.Item
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
            >
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Description">
                <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item label="Status">
                <Select value={status} onChange={(value) => setStatus(value)}>
                    <Option value="To Do">To Do</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Done">Done</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Task
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TaskForm;
