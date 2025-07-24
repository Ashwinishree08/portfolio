import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../../services/api';
import Loading from '../common/Loading';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, completed, pending

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks({ sort: '-createdAt' });
      setTasks(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      if (editingTask) {
        await tasksAPI.updateTask(editingTask._id, formData);
        setEditingTask(null);
      } else {
        await tasksAPI.createTask(formData);
      }
      
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      });
      
      fetchTasks();
      setError('');
    } catch (error) {
      setError('Error saving task');
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    });
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        setError('Error deleting task');
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleToggle = async (taskId) => {
    try {
      await tasksAPI.toggleTask(taskId);
      fetchTasks();
    } catch (error) {
      setError('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>{editingTask ? 'Edit Task' : 'My Tasks'}</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-control"
            style={{ width: 'auto' }}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-error" style={{ margin: '1rem 2rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-row">
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              className="form-control"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>&nbsp;</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary">
                {editingTask ? 'Update' : 'Add'} Task
              </button>
              {editingTask && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
            rows="3"
          />
        </div>
      </form>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            {filter === 'all' ? 'No tasks yet. Create your first task above!' : 
             filter === 'completed' ? 'No completed tasks yet.' : 
             'No pending tasks. Great job!'}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id} className="task-item">
              <div className="task-content">
                <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </div>
                {task.description && (
                  <div className="task-description">{task.description}</div>
                )}
                <div className="task-meta">
                  <span className={`task-priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  <span>
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  {task.dueDate && (
                    <span>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="task-actions">
                <button
                  onClick={() => handleToggle(task._id)}
                  className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'}`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="btn btn-sm btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;