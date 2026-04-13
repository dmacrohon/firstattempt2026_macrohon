// imports/ui/pages/ApplicationTracking.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApplications } from '../mockData';

export const ApplicationTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = mockApplications.find(a => a._id === id);
  const [declined, setDeclined] = useState(false);

  if (!app) return <div>Application not found</div>;

  const handleDecline = () => {
    if(window.confirm('Are you sure you want to decline this offer? This action cannot be undone.')) {
      setDeclined(true);
      alert('Offer formally declined. The employer has been notified.');
    }
  };

  return (
    <div className="job-board-container">
      <button onClick={() => navigate(-1)} className="btn-back">← Back</button>
      
      <div style={{marginTop: '1.5rem'}}>
        <h2>Application: {app.jobTitle}</h2>
        <h4 style={{color: 'var(--text-muted)'}}>{app.company}</h4>
      </div>

      <div className="timeline-container" style={{margin: '3rem 0', paddingLeft: '1rem', borderLeft: '3px solid var(--primary-blue)'}}>
        <div style={{marginBottom: '1.5rem', position: 'relative'}}>
          <span style={{position: 'absolute', left: '-22px', top: '0', background: 'var(--primary-blue)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', textAlign: 'center'}}>✓</span>
          <strong>Application Submitted</strong> - {app.appliedDate}
        </div>
        <div style={{marginBottom: '1.5rem', position: 'relative'}}>
          <span style={{position: 'absolute', left: '-22px', top: '0', background: 'var(--primary-blue)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', textAlign: 'center'}}>✓</span>
          <strong>Under Review</strong> - Employer viewed profile
        </div>
        <div style={{marginBottom: '1.5rem', position: 'relative'}}>
          <span style={{position: 'absolute', left: '-22px', top: '0', background: app.status === 'Offer Extended' ? 'var(--primary-blue)' : '#ccc', color: 'white', borderRadius: '50%', width: '24px', height: '24px', textAlign: 'center'}}>!</span>
          <strong>Current Status: {declined ? 'Offer Declined' : app.status}</strong>
        </div>
      </div>

      {app.status === 'Offer Extended' && !declined && (
        <div className="offer-actions" style={{background: '#e8f5e9', padding: '1.5rem', borderRadius: '8px'}}>
          <h4 style={{marginTop: 0, color: '#2e7d32'}}>Congratulations! You have an offer.</h4>
          <p>Please review your offer details sent to your email. You can accept or decline below.</p>
          <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
            <button className="btn-apply" style={{background: '#2e7d32'}}>Accept Offer</button>
            <button className="btn-filter" style={{borderColor: '#d32f2f', color: '#d32f2f'}} onClick={handleDecline}>Decline Offer</button>
          </div>
        </div>
      )}
    </div>
  );
};