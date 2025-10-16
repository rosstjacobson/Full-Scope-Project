import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post(API_URL, { title: newTitle });
      setTasks([...tasks, res.data]);
      setNewTitle('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleCompletion = async (task) => {
    try {
      const res = await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map(t => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error('Error toggling completion:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const startEditing = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditTitle('');
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { title: editTitle });
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      cancelEditing();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>To-Do List</h1>

      <form onSubmit={addTask} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="New task title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          style={{ padding: '0.5rem', width: '70%' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task)}
              style={{ marginRight: '0.5rem' }}
            />

            {editId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  style={{ flexGrow: 1, padding: '0.3rem' }}
                />
                <button onClick={() => saveEdit(task._id)} style={{ marginLeft: '0.5rem' }}>
                  Save
                </button>
                <button onClick={cancelEditing} style={{ marginLeft: '0.3rem' }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    flexGrow: 1,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                  onDoubleClick={() => startEditing(task)}
                  title="Double-click to edit"
                >
                  {task.title}
                </span>
                <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '0.5rem' }}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
