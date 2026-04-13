// imports/ui/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Inline SVG replicating the shield logo from the design
const ShieldLogo = () => (
  <svg className="welcome-logo" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 0L5 20V60C5 95 28 125 60 140C92 125 115 95 115 60V20L60 0Z" fill="#00205B"/>
    <path d="M60 15L15 32V65C15 92 34 115 60 126C86 115 105 92 105 65V32L60 15Z" fill="white"/>
    <path d="M60 25L25 38V68C25 88 40 106 60 114C80 106 95 88 95 68V38L60 25Z" fill="#00205B"/>
    {/* Simplified Knight Helmet details */}
    <path d="M45 45L75 45M40 60L80 60M45 75L70 75M55 90L65 90" stroke="white" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

// Inline SVG for the 'People' icon
const GroupIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"/>
  </svg>
);

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page-wrapper">
      <div className="welcome-container">
        
        <ShieldLogo />
        
        <h1 className="welcome-title">Blue Links</h1>
        <h2 className="welcome-subtitle">Rediscover. Reunite. Reconnect.</h2>
        
        <p className="welcome-description">
          Step into the alumni portal with a Magis welcome. Rekindle the connections that defined your journey and keep your network alive with fellow blue graduates.
        </p>

        <div className="feature-card">
          <div className="feature-icon"><GroupIcon /></div>
          <div className="feature-text">
            <h4>Your Global Circle</h4>
            <p>Connect with fellow alumni across the globe.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon"><GroupIcon /></div>
          <div className="feature-text">
            <h4>Blue Graduates United</h4>
            <p>Stay linked to the Ateneo community worldwide.</p>
          </div>
        </div>

        <button 
          className="btn-get-started"
          onClick={() => navigate('/login')} // In a full app, this might go to a Register route
        >
          Get Started <span>→</span>
        </button>

        <div className="welcome-footer">
          Already have an account? 
          <button className="welcome-login-link" onClick={() => navigate('/login')}>
            Log In
          </button>
        </div>

      </div>
    </div>
  );
};