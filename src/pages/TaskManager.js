import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/tasks');
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!title) return;
        await axios.post('http://localhost:5000/tasks', { title });
        setTitle('');
        fetchTasks();
    };

    const toggleComplete = async (id) => {
        await axios.put(`http://localhost:5000/tasks/${id}`);
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className='task-container'>
            {/* <h2>Tasks</h2> */}
            <div className='task-input-section'>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add new Task" />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span onClick={() => toggleComplete(task.id)}
                            style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}>
                            {task.title}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}