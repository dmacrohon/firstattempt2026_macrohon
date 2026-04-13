// imports/ui/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Import Pages
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { JobBoard } from './pages/JobBoard';
import { JobDetails } from './pages/JobDetails';
import { ApplicationTracking } from './pages/ApplicationTracking';
import { Settings } from './pages/Settings';

// --- FIXED NAVIGATION COMPONENT ---
const Navigation = () => {
  const location = useLocation();
  
  // Hide the global header on Welcome, Login, Register, Dashboard, and Job Board
  const hideOn = ['/', '/login', '/register', '/dashboard', '/JobBoard'];
  
  if (hideOn.includes(location.pathname)) {
    return null;
  }

  // Replace this with your actual navbar UI (e.g., a <div> or <nav>)
  // DO NOT call <Navigation /> inside here!
  return (
    <nav className="global-nav">
      <div className="nav-content">
        {/* Your navigation links go here for other pages */}
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