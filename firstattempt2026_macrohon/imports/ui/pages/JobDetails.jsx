import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockJobs } from '../mockData';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to switch between the Details view and the QR Scanner view
  const [viewMode, setViewMode] = useState('details'); // 'details' or 'qr'

  const job = mockJobs.find(j => j.id === id || j._id === id);

  if (!job) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div className="jd-viewport">
      <style>{`
        .jd-viewport {
          position: absolute; top: 0; left: 260px; width: calc(100% - 260px);
          min-height: 100vh; background-color: #F3F4F6; font-family: 'Inter', sans-serif;
        }

        /* Blue Header - Constant across both views */
        .jd-header {
          background-color: #00205B; padding: 50px 6% 80px 6%; color: white;
        }
        .jd-header h1 { font-family: "Times New Roman", serif; font-size: 2.2rem; margin: 0; }
        .breadcrumb { font-size: 0.9rem; color: #94A3B8; margin-bottom: 10px; cursor: pointer; }

        .jd-container { max-width: 1000px; margin: -50px auto 40px auto; padding: 0 20px; }

        /* Main Content Card */
        .jd-main-card {
          background: white; border-radius: 16px; padding: 40px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #E5E7EB;
        }

        /* Details View Specifics */
        .jd-section { margin-bottom: 30px; }
        .jd-label { font-size: 0.8rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px; }
        .jd-title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
        
        /* QR View Specifics (The Dark Mode UI) */
        .qr-view-container {
          background: #111827; color: white; border-radius: 16px; padding: 60px 40px; text-align: center;
        }
        .qr-frame {
          width: 280px; height: 280px; border: 4px solid #3B82F6; margin: 0 auto 30px auto;
          border-radius: 20px; position: relative; background: #1F2937;
          display: flex; align-items: center; justify-content: center;
        }
        .qr-scanner-line {
          position: absolute; width: 100%; height: 2px; background: #3B82F6;
          box-shadow: 0 0 15px #3B82F6; top: 0; animation: scanAnim 2s infinite linear;
        }
        @keyframes scanAnim { 0% { top: 0; } 100% { top: 100%; } }

        /* Buttons */
        .btn-primary { 
          padding: 12px 30px; background: #00205B; color: white; border: none; 
          border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.2s;
        }
        .btn-qr {
          padding: 12px 30px; background: white; color: #00205B; border: 1px solid #00205B;
          border-radius: 10px; font-weight: 600; cursor: pointer; margin-left: 10px;
        }
        .btn-outline-white {
          padding: 12px 30px; background: transparent; color: white; border: 1px solid #4B5563;
          border-radius: 10px; cursor: pointer; margin-top: 20px;
        }
      `}</style>

      <div className="jd-header">
        <div className="breadcrumb" onClick={() => navigate('/JobBoard')}>← Back to Job Board</div>
        <h1>{viewMode === 'details' ? 'Job Information' : 'Quick Application'}</h1>
      </div>

      <div className="jd-container">
        {viewMode === 'details' ? (
          /* LEFT SIDE: MAIN JOB DETAILS PAGE */
          <div className="jd-main-card">
            <div className="jd-title-row">
              <div>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{job.title}</h2>
                <p style={{ color: '#6B7280', margin: '5px 0' }}>{job.company} • {job.location}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#059669', fontWeight: 'bold', fontSize: '1.2rem' }}>{job.salary}</div>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>per month</div>
              </div>
            </div>

            <div className="jd-section">
              <div className="jd-label">About the Role</div>
              <p style={{ lineHeight: '1.7', color: '#4B5563' }}>{job.description}</p>
            </div>

            <div className="jd-section">
              <div className="jd-label">Requirements</div>
              <ul style={{ paddingLeft: '20px', lineHeight: '2', color: '#4B5563' }}>
                {job.requirements?.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>

            <div style={{ marginTop: '40px', borderTop: '1px solid #F3F4F6', paddingTop: '30px' }}>
              <button className="btn-primary" onClick={() => alert('Opening Form...')}>Apply Manually</button>
              <button className="btn-qr" onClick={() => setViewMode('qr')}>Scan QR Code</button>
            </div>
          </div>
        ) : (
          /* RIGHT SIDE: QR SCAN PAGE (Triggered by Button) */
          <div className="qr-view-container">
            <h2 style={{ marginTop: 0 }}>Scan to Apply</h2>
            <p style={{ color: '#9CA3AF', marginBottom: '40px' }}>
              Point your camera at the QR code below to continue your application on your mobile device.
            </p>
            
            <div className="qr-frame">
              <div className="qr-scanner-line"></div>
              {/* This represents the QR area from your image */}
              <div style={{ width: '180px', height: '180px', background: 'white', padding: '10px' }}>
                 <div style={{ width: '100%', height: '100%', background: '#000' }}></div>
              </div>
            </div>

            <button className="btn-outline-white" onClick={() => setViewMode('details')}>
              Cancel & Return to Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};