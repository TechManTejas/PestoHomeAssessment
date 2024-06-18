import React from 'react';
import axiosInstance from '../api/axiosInstance';

const TaskItem = ({ task, fetchTasks }) => {
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/tasks/${task.id}/`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const handleStatusChange = async (e) => {
        try {
            await axiosInstance.patch(`/tasks/${task.id}/`, { status: e.target.value });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status', error);
        }
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <select value={task.status} onChange={handleStatusChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TaskItem;
