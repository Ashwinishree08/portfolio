import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        TaskManager
      </Link>
      
      <ul className="navbar-nav">
        <li>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/tasks" 
            className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link 
            to="/profile" 
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            Profile
          </Link>
        </li>
        <li>
          <span className="nav-link">Welcome, {user?.name}</span>
        </li>
        <li>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;