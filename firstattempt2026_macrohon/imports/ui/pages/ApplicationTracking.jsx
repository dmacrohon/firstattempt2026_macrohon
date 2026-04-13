import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const ApplicationTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  // Mock data representing the application
  const application = {
    jobTitle: "Senior UX/UI Designer",
    company: "TechSolutions Inc.",
    status: "Reviewed",
    appliedDate: "Oct 24, 2023",
    applicantName: "Juan Dela Cruz",
    email: "juan.delacruz@alumni.addu.edu.ph",
    resumeUrl: "#",
    coverLetter: "I am writing to express my strong interest in the Senior UX/UI Designer position. With over 5 years of experience in creating user-centric designs for EdTech platforms, I am confident that my skills align perfectly with your team's needs...",
    timeline: [
      { status: 'Applied', date: 'Oct 24, 2023', note: 'Application submitted successfully.' },
      { status: 'Reviewed', date: 'Oct 26, 2023', note: 'Hiring manager has viewed your profile.' }
    ]
  };

  const handleDecline = () => {
    // Here you would normally call a Meteor Method to update the DB
    alert(`Application declined for reason: ${declineReason}`);
    setShowDeclineModal(false);
  };

  return (
    <div className="at-viewport">
      <style>{`
        .at-viewport {
          position: absolute; top: 0; left: 260px; width: calc(100% - 260px);
          min-height: 100vh; background-color: #F3F4F6; font-family: 'Inter', sans-serif;
        }

        .at-header {
          background-color: #00205B; padding: 60px 6% 100px 6%; color: white;
        }

        .at-header h1 { font-family: "Times New Roman", serif; font-size: 2.2rem; margin: 0; }
        .breadcrumb { font-size: 0.9rem; color: #94A3B8; margin-bottom: 10px; cursor: pointer; }

        .at-content { max-width: 1100px; margin: -60px auto 40px auto; padding: 0 24px; display: grid; grid-template-columns: 350px 1fr; gap: 24px; }

        .at-card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #E5E7EB; }
        
        /* Left Sidebar Card */
        .job-summary { text-align: center; }
        .comp-logo { width: 80px; height: 80px; background: #F8FAFC; border-radius: 12px; margin: 0 auto 16px auto; display: flex; align-items: center; justify-content: center; font-size: 2rem; border: 1px solid #E5E7EB; }
        .status-badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin: 12px 0; }
        .status-reviewed { background: #EFF6FF; color: #1D4ED8; }
        
        /* Details Area */
        .section-title { font-size: 1.1rem; font-weight: 700; color: #111827; margin-bottom: 20px; border-bottom: 1px solid #F3F4F6; padding-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
        .info-row { margin-bottom: 15px; }
        .info-label { font-size: 0.85rem; color: #6B7280; margin-bottom: 4px; }
        .info-value { font-size: 1rem; color: #111827; font-weight: 500; }
        
        .resume-btn { display: flex; align-items: center; gap: 10px; padding: 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px; text-decoration: none; color: #00205B; font-weight: 600; transition: 0.2s; }
        .resume-btn:hover { background: #EFF6FF; border-color: #00205B; }

        .btn-group { display: flex; gap: 12px; margin-top: 24px; }
        .btn-decline { flex: 1; padding: 12px; border: 1px solid #FECACA; color: #EF4444; background: white; border-radius: 10px; font-weight: 600; cursor: pointer; }
        .btn-decline:hover { background: #FEF2F2; }

        /* Modal Styles */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; display: flex; align-items: center; justify-content: center; }
        .modal-card { background: white; width: 500px; border-radius: 20px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); position: relative; }
        .modal-icon { width: 60px; height: 60px; background: #FEF2F2; color: #EF4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 20px; }
        .modal-card h2 { margin: 0 0 10px 0; color: #111827; }
        .modal-card p { color: #6B7280; font-size: 0.95rem; margin-bottom: 24px; }
        
        select, textarea { width: 100%; padding: 12px; border: 1px solid #D1D5DB; border-radius: 10px; margin-bottom: 16px; font-family: inherit; }
      `}</style>

      <div className="at-header">
        <div className="breadcrumb" onClick={() => navigate('/JobBoard')}>← Back to Job Board</div>
        <h1>Application Details</h1>
      </div>

      <div className="at-content">
        {/* Left Column: Job Summary */}
        <div className="at-card job-summary">
          <div className="comp-logo">🏢</div>
          <h2 style={{ margin: '0', fontSize: '1.25rem' }}>{application.jobTitle}</h2>
          <p style={{ color: '#6B7280', margin: '5px 0' }}>{application.company}</p>
          <div className={`status-badge status-reviewed`}>{application.status}</div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Applied on {application.appliedDate}</p>
          
          <div className="btn-group">
            <button className="btn-decline" onClick={() => setShowDeclineModal(true)}>Decline Application</button>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="at-card">
            <h3 className="section-title">Applicant Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="info-row">
                <div className="info-label">Full Name</div>
                <div className="info-value">{application.applicantName}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Email Address</div>
                <div className="info-value">{application.email}</div>
              </div>
            </div>
            
            <div className="info-row" style={{ marginTop: '10px' }}>
              <div className="info-label">Attached Resume</div>
              <a href={application.resumeUrl} className="resume-btn">
                <span>📄</span> CV_DelaCruz_UX.pdf
              </a>
            </div>
          </div>

          <div className="at-card">
            <h3 className="section-title">Cover Letter</h3>
            <p style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {application.coverLetter}
            </p>
          </div>
        </div>
      </div>

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon">⚠️</div>
            <h2>Decline Application?</h2>
            <p>Are you sure you want to decline this application? This action cannot be undone and the applicant will be notified.</p>
            
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Reason for Declining</label>
            <select value={declineReason} onChange={(e) => setDeclineReason(e.target.value)}>
              <option value="">Select a reason...</option>
              <option value="not_qualified">Lacks required experience</option>
              <option value="position_filled">Position has been filled</option>
              <option value="other">Other</option>
            </select>

            <textarea placeholder="Additional comments (optional)..." rows="3"></textarea>

            <div className="btn-group">
              <button 
                className="btn-decline" 
                style={{ background: 'white', color: '#374151', border: '1px solid #D1D5DB' }}
                onClick={() => setShowDeclineModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-decline" 
                style={{ background: '#EF4444', color: 'white', border: 'none' }}
                onClick={handleDecline}
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};