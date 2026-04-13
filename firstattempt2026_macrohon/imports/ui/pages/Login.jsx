// imports/ui/pages/Login.jsx
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

// Inline SVGs for pixel-perfect design replication
const ShieldLogo = () => (
  <svg className="login-logo" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 0L5 20V60C5 95 28 125 60 140C92 125 115 95 115 60V20L60 0Z" fill="#00205B"/>
    <path d="M60 15L15 32V65C15 92 34 115 60 126C86 115 105 92 105 65V32L60 15Z" fill="white"/>
    <path d="M60 25L25 38V68C25 88 40 106 60 114C80 106 95 88 95 68V38L60 25Z" fill="#00205B"/>
    <path d="M45 45L75 45M40 60L80 60M45 75L70 75M55 90L65 90" stroke="white" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const LockIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const EyeOffIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>);
const LoginArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>);
const FaceIdIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4H6a2 2 0 0 0-2 2v2M16 4h2a2 2 0 0 1 2 2v2M8 20H6a2 2 0 0 1-2-2v-2M16 20h2a2 2 0 0 0 2-2v-2"/><path d="M9 10h.01M15 10h.01M12 14a2 2 0 0 0-2-2h-2"/><path d="M12 14v2a2 2 0 0 0 2 2h2"/></svg>);
const HelpCircle = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const ShieldCheck = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>);
const GlobeIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) setError('Invalid credentials.');
      else navigate('/dashboard');
    });
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        
        <div className="login-top-brand">Blue Links</div>
        <ShieldLogo />
        
        <h1 className="login-title">Welcome, Blue Knight!</h1>
        <p className="login-subtitle">Enter your credentials to access the portal</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error" style={{marginBottom: '1.5rem'}}>{error}</div>}
          
          <label className="form-label-new">Alumni ID / Email</label>
          <div className="input-group-new">
            <div className="icon-left"><UserIcon /></div>
            <input 
              type="email" 
              className="input-field-new" 
              placeholder="Enter your ID or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <label className="form-label-new">Password</label>
          <div className="input-group-new">
            <div className="icon-left"><LockIcon /></div>
            <input 
              type={showPassword ? "text" : "password"}
              className="input-field-new" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <div className="icon-right" onClick={() => setShowPassword(!showPassword)}>
              <EyeOffIcon />
            </div>
          </div>

          <div className="login-options">
            <label className="login-checkbox">
              <input type="checkbox" /> Remember Me
            </label>
            <button type="button" className="forgot-link">Forgot Password?</button>
          </div>

          <button type="submit" className="btn-primary-new">
            Login <LoginArrow />
          </button>
        </form>

        <div className="login-divider">OR</div>

        <button type="button" className="btn-faceid">
          <FaceIdIcon /> Continue with FaceID
        </button>

        <div className="register-box">
          <p>Are you a graduate of AdDU but don't have an account yet?</p>
          <button type="button" onClick={() => navigate('/register')}>
            Register as Alumni <span>→</span>
          </button>
        </div>

        <div className="footer-links">
          <HelpCircle />
          <ShieldCheck />
          <GlobeIcon />
        </div>
        
        <div className="footer-copyright">
          © 2024 Ateneo de Davao University. All Rights Reserved.
        </div>

      </div>
    </div>
  );
};