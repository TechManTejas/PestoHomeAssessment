// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axiosInstance from './api/axiosInstance';
import { Layout, Typography, Select } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Title style={{ color: 'white', marginTop: '8px' }}>Task Manager</Title>
            </Header>
            <Content style={{ padding: '20px' }}>
                <TaskForm fetchTasks={fetchTasks} />
                <div style={{ margin: '20px 0' }}>
                    <Select defaultValue="All" style={{ width: 200 }} onChange={setFilter}>
                        <Option value="All">All</Option>
                        <Option value="To Do">To Do</Option>
                        <Option value="In Progress">In Progress</Option>
                        <Option value="Done">Done</Option>
                    </Select>
                </div>
                <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
            </Content>
        </Layout>
    );
};

export default App;
