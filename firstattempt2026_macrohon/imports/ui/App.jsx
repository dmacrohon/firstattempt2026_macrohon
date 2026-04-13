// imports/ui/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useLocation, useNavigate } from 'react-router-dom';

// Import Pages
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { JobBoard } from './pages/JobBoard';
import { JobDetails } from './pages/JobDetails';
import { ApplicationTracking } from './pages/ApplicationTracking';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

// --- FIXED NAVIGATION COMPONENT ---
const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hide the nav on public auth pages
  const hideOn = ['/', '/login', '/register'];
  
  if (hideOn.includes(location.pathname)) {
    return null;
  }

  const isJobActive = location.pathname.toLowerCase().includes('job');

  return (
    <nav className="left-sidebar">
      <style>{`
        .left-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: white;
          border-right: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          font-family: 'Inter', sans-serif;
        }

        .sidebar-logo {
          padding: 30px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Times New Roman', serif;
          font-size: 1.25rem;
          color: #00205B;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .nav-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 16px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          border-radius: 12px;
          color: #6B7280;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover {
          background: #F3F4F6;
          color: #111827;
        }

        .nav-item.active {
          background: #EFF6FF; /* The light blue from your design */
          color: #00205B;      /* The deep blue text */
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .sidebar-footer {
          padding: 24px 16px;
          border-top: 1px solid #F3F4F6;
        }

        .btn-logout {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          width: 100%;
          border: none;
          background: transparent;
          color: #EF4444;
          font-weight: 600;
          cursor: pointer;
          border-radius: 12px;
          transition: background 0.2s;
          text-align: left;
        }

        .btn-logout:hover {
          background: #FEF2F2;
        }
      `}</style>

      <div className="sidebar-logo">
        <span style={{ fontSize: '1.5rem' }}>🦅</span>
        <span>Blue Knight Portal</span>
      </div>

      <div className="nav-menu">
        <button 
          className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} 
          onClick={() => navigate('/dashboard')}
        >
          <span className="nav-icon">🏠</span> Home
        </button>
        
        <button 
          className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`} 
          onClick={() => navigate('/notifications')}
        >
          <span className="nav-icon">🔔</span> Alerts
        </button>

        <button 
          className={`nav-item ${isJobActive ? 'active' : ''}`} 
          onClick={() => navigate('/JobBoard')}
        >
          <span className="nav-icon">💼</span> Jobs
        </button>

        <button 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} 
          onClick={() => navigate('/profile')}
        >
          <span className="nav-icon">👤</span> Profile
        </button>
      </div>

      <div className="sidebar-footer">
        <button 
          className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`} 
          onClick={() => navigate('/settings')}
          style={{ marginBottom: '10px' }} // Adds a little spacing before logout
        >
          <span className="nav-icon">⚙️</span> Settings
        </button>

        <button className="btn-logout" onClick={() => navigate('/login')}>
          <span className="nav-icon">🚪</span> Log Out
        </button>
      </div>
    </nav>
  );
};

// --- PROTECTED ROUTE WRAPPER ---
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useTracker(() => {
    return {
      user: Meteor.user(),
      isLoading: Meteor.loggingIn()
    };
  });

  if (isLoading) {
    return (
      <div className="loading-state" style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
        Loading Blue Knight Portal...
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="content-wrapper">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes (Require Login) */}
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            
            <Route path="/JobBoard" element={
              <ProtectedRoute><JobBoard /></ProtectedRoute>
            } />

            <Route path="/job/:id" element={
              <ProtectedRoute><JobDetails /></ProtectedRoute>
            } />
            
            <Route path="/application/:id" element={
              <ProtectedRoute><ApplicationTracking /></ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute><Settings /></ProtectedRoute>
            } />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};