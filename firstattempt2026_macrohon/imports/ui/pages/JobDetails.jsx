// imports/ui/pages/JobDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockJobs } from '../mockData';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  
  const job = mockJobs.find(j => j._id === id);

  if (!job) return <div>Job not found</div>;

  const handleStandardApply = () => {
    alert('Standard Application Submitted! Redirecting to tracking...');
    navigate('/');
  };

  return (
    <div className="job-details-container job-board-container">
      <button onClick={() => navigate(-1)} className="btn-back">← Back to Board</button>
      
      <div className="job-header" style={{marginTop: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
        <h2>{job.title}</h2>
        <h3 style={{color: 'var(--text-muted)'}}>{job.company}</h3>
        <p><strong>Location:</strong> {job.location} | <strong>Type:</strong> {job.type} | <strong>Salary:</strong> {job.salary}</p>
      </div>

      <div className="job-description" style={{margin: '2rem 0'}}>
        <h4>Role Description</h4>
        <p>{job.description}</p>
      </div>

      <div className="application-actions" style={{display: 'flex', gap: '1rem'}}>
        <button className="btn-apply" onClick={handleStandardApply}>Apply Now</button>
        <button className="btn-filter" onClick={() => setShowQR(!showQR)}>
          {showQR ? 'Hide QR Code' : 'Apply via QR Code'}
        </button>
      </div>

      {showQR && (
        <div className="qr-box" style={{marginTop: '2rem', padding: '2rem', background: '#f9f9f9', textAlign: 'center', borderRadius: '8px'}}>
          <div style={{width: '150px', height: '150px', background: '#ccc', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            [ QR Graphic ]
          </div>
          <p style={{marginTop: '1rem'}}>Scan with your Alumni Hub App to instantly forward your verified credentials.</p>
        </div>
      )}
    </div>
  );
};  