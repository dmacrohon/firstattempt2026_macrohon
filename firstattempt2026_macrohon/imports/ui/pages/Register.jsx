import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';

// --- Icons ---
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ProfileAvatar = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="4" fill="rgba(255,255,255,0.2)"/>
    <circle cx="50" cy="35" r="15" fill="white"/>
    <path d="M20 85C20 65 35 55 50 55C65 55 80 65 80 85" stroke="white" strokeWidth="0" fill="white"/>
  </svg>
);

const FingerprintIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10"/>
    <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7"/>
    <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
    <path d="M11 12c0-.55.45-1 1-1s1 .45 1 1"/>
  </svg>
);

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gradYear: '',
    email: '',
    password: ''
  });
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    Accounts.createUser({
      email: formData.email,
      password: formData.password,
      profile: {
        name: formData.fullName,
        gradYear: formData.gradYear,
      }
    }, (err) => {
      if (err) setError(err.reason || 'Registration failed.');
      else navigate('/dashboard');
    });
  };

  return (
    <div className="reg-page-wrapper">
      <style>{`
        .reg-page-wrapper {
          position: fixed; /* Breaks out of parent containers */
          top: 0;
          left: 0;
          width: 100vw; /* Forces full width */
          height: 100vh; /* Forces full height */
          z-index: 9999; /* Ensures it covers the top navigation bar */
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to bottom, rgba(54, 79, 124, 0.85), rgba(4, 15, 36, 0.95)), url('/addu-bg.jpg') center/cover no-repeat;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 20px;
          box-sizing: border-box;
          overflow-y: auto; /* Allows scrolling on very small screens */
        }
        /* ----------------------- */

        .reg-container {
          width: 100%;
          max-width: 400px;
          color: white;
          margin: auto; /* Ensures centering if scrolling is triggered */
        }
        .reg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
          
        .reg-back-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
        }
        .reg-title {
          font-family: "Times New Roman", Times, serif; /* Matches the elegant serif in the mockup */
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: 1px;
          margin: 0;
          text-align: center;
        }
        .reg-avatar-section {
          text-align: center;
          margin-bottom: 32px;
        }
        .reg-subtitle {
          font-size: 0.85rem;
          margin-top: 12px;
          opacity: 0.9;
        }
        .reg-form-group {
          margin-bottom: 16px;
        }
        .reg-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          color: #E2E8F0;
        }
        .reg-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: none;
          background: #FFFFFF;
          font-size: 0.95rem;
          color: #333;
          box-sizing: border-box;
        }
        .reg-input::placeholder {
          color: #94A3B8;
        }
        .reg-bio-card {
          background: rgba(148, 163, 184, 0.85); /* The light grayish-blue translucent card */
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
          margin-bottom: 32px;
        }
        .reg-bio-icon-wrap {
          background: rgba(0, 51, 102, 0.1);
          padding: 10px;
          border-radius: 50%;
          display: flex;
        }
        .reg-bio-text flex-1 {
          flex: 1;
        }
        .reg-bio-title {
          color: #003366;
          font-weight: 700;
          font-size: 0.95rem;
          margin: 0 0 4px 0;
        }
        .reg-bio-desc {
          color: #334155;
          font-size: 0.7rem;
          line-height: 1.4;
          margin: 0;
        }
        /* Custom Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #cbd5e1;
          transition: .4s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: #0044CC;
        }
        input:checked + .slider:before {
          transform: translateX(20px);
        }
        .reg-submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: #00205B; /* AdDU Deep Blue */
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .reg-submit-btn:hover {
          background: #003388;
        }
        .reg-error {
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          color: #ffcccc;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 16px;
          text-align: center;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="reg-container">
        
        {/* Header */}
        <div className="reg-header">
          <button className="reg-back-btn" onClick={() => navigate('/login')} aria-label="Go back">
            <BackIcon />
          </button>
          <h1 className="reg-title">ALUMNI REGISTRATION</h1>
          <div style={{ width: 24 }}></div> {/* Spacer to keep title centered */}
        </div>

        {/* Avatar & Subtitle */}
        <div className="reg-avatar-section">
          <ProfileAvatar />
          <p className="reg-subtitle">Register to reconnect with the Ateneo community</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {error && <div className="reg-error">{error}</div>}

          <div className="reg-form-group">
            <label className="reg-label">FULL NAME</label>
            <input 
              type="text" 
              name="fullName"
              className="reg-input" 
              placeholder="Juan dela Cruz"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-form-group">
            <label className="reg-label">GRADUATION YEAR</label>
            <input 
              type="text" 
              name="gradYear"
              className="reg-input" 
              placeholder="YYYY"
              value={formData.gradYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-form-group">
            <label className="reg-label">EMAIL</label>
            <input 
              type="email" 
              name="email"
              className="reg-input" 
              placeholder="example@addu.edu.ph"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-form-group">
            <label className="reg-label">PASSWORD</label>
            <input 
              type="password" 
              name="password"
              className="reg-input" 
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Biometrics Card */}
          <div className="reg-bio-card">
            <div className="reg-bio-icon-wrap">
              <FingerprintIcon />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="reg-bio-title">Enable Biometrics</h3>
              <p className="reg-bio-desc">Secure your identity with FaceID or TouchID to ensure account recovery even without email access.</p>
            </div>
            <div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={biometricsEnabled} 
                  onChange={() => setBiometricsEnabled(!biometricsEnabled)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <button type="submit" className="reg-submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};