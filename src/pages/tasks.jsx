import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ name: '', description: '', dueDate: '' }); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = 'admin'; 
        const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        name,
        description,
        dueDate,
        userId: 'admin', 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setTasks([...tasks, response.data]);
      setName('');
      setDescription('');
      setDueDate('');
    } catch (err) {
      setError(`Failed to create task: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id); 
    setEditingTask({ name: task.name, description: task.description, dueDate: task.dueDate }); 
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await handleDeleteTask(editingTaskId); 
      const response = await axios.post('http://localhost:5000/api/tasks', {
        ...editingTask,
        userId: 'admin',
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setTasks([...tasks, response.data]); // Add the new task to the list
      setEditingTaskId(null); // Reset editing state
      setEditingTask({ name: '', description: '', dueDate: '' }); // Reset editing task details
    } catch (err) {
      setError(`Failed to update task: ${err.response ? err.response.data : err.message}`);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={editingTaskId ? handleUpdateTask : handleCreateTask} className="mb-4">
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={editingTaskId ? editingTask.dueDate : dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between items-center p-2 border-b">
            <span>{task.name} - {task.description} - {task.dueDate}</span>
            <div>
              <button onClick={() => handleEditTask(task)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 hover:underline ml-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

