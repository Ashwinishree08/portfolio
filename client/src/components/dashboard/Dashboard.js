import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tasksAPI } from '../../services/api';
import Loading from '../common/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    high: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks({ sort: '-createdAt' });
      const tasks = response.data;

      // Calculate stats
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;
      const pending = total - completed;
      const high = tasks.filter(task => task.priority === 'high').length;

      setStats({ total, completed, pending, high });
      setRecentTasks(tasks.slice(0, 5)); // Get 5 most recent tasks
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's an overview of your tasks</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.high}</div>
          <div className="stat-label">High Priority</div>
        </div>
      </div>

      <div className="tasks-container">
        <div className="tasks-header">
          <h2>Recent Tasks</h2>
          <Link to="/tasks" className="btn btn-secondary">
            View All Tasks
          </Link>
        </div>

        <div className="task-list">
          {recentTasks.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
              No tasks yet. <Link to="/tasks">Create your first task!</Link>
            </div>
          ) : (
            recentTasks.map((task) => (
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;