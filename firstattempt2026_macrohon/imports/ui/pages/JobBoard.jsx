import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JobBoard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('board'); // 'board' or 'apps'
  
  // Search & Basic Filter States
  const [jobSearch, setJobSearch] = useState('');
  const [appSearch, setAppSearch] = useState('');
  const [quickFilter, setQuickFilter] = useState('All');

  // Advanced Filter Modal State
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    type: [],
    location: [],
    experience: ''
  });

  const jobs = [
    { id: 1, title: 'Senior Full Stack Developer', company: 'TechDavao Solutions', location: 'Davao City', type: 'Full-time', salary: '₱80k - ₱120k', logo: 'TD' },
    { id: 2, title: 'Marketing Manager', company: 'Blue Horizon Media', location: 'Remote', type: 'Full-time', salary: '₱50k - ₱70k', logo: 'BH' },
    { id: 3, title: 'UX/UI Designer', company: 'Creative Knights', location: 'Davao City', type: 'Contract', salary: '₱45k - ₱60k', logo: 'CK' },
    { id: 4, title: 'Data Analyst', company: 'Ateneo Research', location: 'Jacinto Campus', type: 'Part-time', salary: '₱30k - ₱40k', logo: 'AR' },
  ];

  const quickFilterOptions = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract'];

  // Basic filtering for demo purposes
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) || job.company.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesQuick = quickFilter === 'All' || job.type === quickFilter || (quickFilter === 'Remote' && job.location === 'Remote');
    return matchesSearch && matchesQuick;
  });

  const toggleFilter = (category, value) => {
    setAdvancedFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  return (
    <div className="jb-viewport">
      <style>{`
        .jb-viewport {
          position: absolute; top: 0; left: 0; width: 100%; min-height: 100vh;
          background-color: #F3F4F6; font-family: 'Inter', sans-serif; padding-bottom: 50px;
        }

        /* --- Header --- */
        .jb-header {
          background-color: #00205B;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          padding: 60px 10% 110px 10%;
          color: white;
        }

        .back-nav {
          display: flex; align-items: center; gap: 8px; cursor: pointer;
          opacity: 0.8; margin-bottom: 20px; font-size: 0.9rem; transition: opacity 0.2s;
        }
        .back-nav:hover { opacity: 1; }

        .header-flex { display: flex; justify-content: space-between; align-items: flex-end; }
        .jb-header h1 { font-family: "Times New Roman", serif; font-size: 2.4rem; margin: 0; font-weight: 400; }

        .tab-container {
          display: flex; background: rgba(255,255,255,0.1); padding: 5px;
          border-radius: 12px; gap: 5px;
        }
        .tab-btn {
          padding: 10px 24px; border-radius: 8px; border: none; background: none;
          color: white; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.2s;
        }
        .tab-btn.active { background: white; color: #00205B; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }

        .jb-content { max-width: 1100px; margin: -45px auto 0 auto; padding: 0 24px; }

        /* --- Search Bar with Filter Icon --- */
        .search-card {
          background: white; border-radius: 14px; padding: 12px;
          display: flex; gap: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.06);
        }

        .search-input-wrap {
          flex: 1; background: #F3F4F6; border-radius: 10px; display: flex; align-items: center; padding: 0 16px; gap: 10px;
        }
        .search-input-wrap input {
          width: 100%; border: none; background: none; padding: 14px 0; outline: none; font-size: 0.95rem;
        }

        .btn-filter-icon {
          background: #F3F4F6; border: 1px solid #E5E7EB; color: #4B5563; padding: 0 20px;
          border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .btn-filter-icon:hover { background: #E5E7EB; color: #00205B; border-color: #00205B; }

        .btn-search {
          background: #00205B; color: white; border: none; padding: 0 30px;
          border-radius: 10px; font-weight: 600; cursor: pointer; transition: background 0.2s;
        }
        .btn-search:hover { background: #00153D; }

        /* --- Quick Filters --- */
        .filter-row {
          display: flex; gap: 10px; margin: 24px 0 30px 0; overflow-x: auto; padding-bottom: 5px; scrollbar-width: none;
        }
        .filter-pill {
          padding: 8px 20px; background: white; border: 1px solid #E5E7EB;
          border-radius: 20px; font-size: 0.85rem; font-weight: 500; color: #4B5563;
          cursor: pointer; white-space: nowrap; transition: all 0.2s;
        }
        .filter-pill:hover { border-color: #00205B; color: #00205B; }
        .filter-pill.active { background: #00205B; color: white; border-color: #00205B; }

        /* --- Job Cards --- */
        .card-grid { display: flex; flex-direction: column; gap: 16px; }
        .job-card {
          background: white; border-radius: 14px; padding: 24px;
          display: flex; justify-content: space-between; align-items: center;
          border: 1px solid #E5E7EB; transition: all 0.2s;
        }
        .job-card:hover { border-color: #E9C46A; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.03); }

        .card-left { display: flex; gap: 20px; align-items: center; }
        .job-logo {
          width: 56px; height: 56px; background: #00205B; color: white;
          border-radius: 12px; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1.2rem; flex-shrink: 0;
        }
        .card-title { margin: 0 0 6px 0; font-size: 1.15rem; color: #111827; }
        .card-subtitle { color: #00205B; font-weight: 600; font-size: 0.9rem; margin-bottom: 8px; }
        .card-meta { display: flex; gap: 15px; font-size: 0.85rem; color: #6B7280; }
        .btn-outline {
          background: white; border: 1px solid #00205B; color: #00205B;
          padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .btn-outline:hover { background: #00205B; color: white; }

        /* --- Advanced Filter Modal Overlay --- */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 32, 91, 0.4); backdrop-filter: blur(4px);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000; padding: 20px; animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .filter-modal {
          background: white; border-radius: 20px; width: 100%; max-width: 500px;
          max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          display: flex; flex-direction: column; animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .modal-header {
          padding: 24px; border-bottom: 1px solid #E5E7EB;
          display: flex; justify-content: space-between; align-items: center;
        }
        .modal-header h2 { margin: 0; font-size: 1.25rem; color: #111827; }
        .btn-close {
          background: none; border: none; font-size: 1.5rem; color: #6B7280;
          cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center;
        }
        .btn-close:hover { color: #111827; }

        .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 30px; }
        
        .filter-group h3 { margin: 0 0 16px 0; font-size: 1rem; color: #374151; font-weight: 600; }
        .checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        
        .checkbox-label {
          display: flex; align-items: center; gap: 10px; font-size: 0.95rem; color: #4B5563; cursor: pointer;
        }
        .checkbox-label input[type="checkbox"] {
          width: 18px; height: 18px; border-radius: 4px; border: 2px solid #D1D5DB;
          appearance: none; background: white; cursor: pointer; transition: all 0.2s;
        }
        .checkbox-label input[type="checkbox"]:checked {
          background: #00205B; border-color: #00205B;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 7.6L1.4 5L0 6.4L4 10.4L12 2.4L10.6 1L4 7.6Z' fill='white'/%3E%3C/svg%3E");
          background-position: center; background-repeat: no-repeat;
        }

        .modal-footer {
          padding: 24px; border-top: 1px solid #E5E7EB;
          display: flex; gap: 16px; background: #F9FAFB; border-radius: 0 0 20px 20px;
        }
        .btn-reset {
          flex: 1; padding: 14px; border-radius: 10px; border: 1px solid #D1D5DB;
          background: white; color: #374151; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .btn-reset:hover { background: #F3F4F6; color: #111827; }
        .btn-apply {
          flex: 2; padding: 14px; border-radius: 10px; border: none;
          background: #00205B; color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .btn-apply:hover { background: #00153D; }

      `}</style>

      {/* --- Filter Modal Overlay --- */}
      {showFilters && (
        <div className="modal-overlay" onClick={() => setShowFilters(false)}>
          <div className="filter-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Filter Jobs</h2>
              <button className="btn-close" onClick={() => setShowFilters(false)}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="filter-group">
                <h3>Job Type</h3>
                <div className="checkbox-grid">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                    <label key={type} className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={advancedFilters.type.includes(type)}
                        onChange={() => toggleFilter('type', type)}
                      /> 
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Work Setup</h3>
                <div className="checkbox-grid">
                  {['On-site', 'Hybrid', 'Remote'].map(loc => (
                    <label key={loc} className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={advancedFilters.location.includes(loc)}
                        onChange={() => toggleFilter('location', loc)}
                      /> 
                      {loc}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Experience Level</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['Entry Level', 'Mid-Senior Level', 'Director', 'Executive'].map(level => (
                    <div 
                      key={level}
                      onClick={() => setAdvancedFilters({...advancedFilters, experience: level})}
                      style={{
                        padding: '8px 16px', borderRadius: '20px', border: '1px solid', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500',
                        borderColor: advancedFilters.experience === level ? '#00205B' : '#E5E7EB',
                        backgroundColor: advancedFilters.experience === level ? '#EFF6FF' : 'white',
                        color: advancedFilters.experience === level ? '#00205B' : '#4B5563'
                      }}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-reset" onClick={() => setAdvancedFilters({type: [], location: [], experience: ''})}>Reset All</button>
              <button className="btn-apply" onClick={() => setShowFilters(false)}>Show Results</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Main UI --- */}
      <div className="jb-header">
        <div className="back-nav" onClick={() => navigate('/dashboard')}><span>←</span> Back to Dashboard</div>
        <div className="header-flex">
          <h1>{activeTab === 'board' ? 'Alumni Job Board' : 'My Applications'}</h1>
          <div className="tab-container">
            <button className={`tab-btn ${activeTab === 'board' ? 'active' : ''}`} onClick={() => setActiveTab('board')}>Job Board</button>
            <button className={`tab-btn ${activeTab === 'apps' ? 'active' : ''}`} onClick={() => setActiveTab('apps')}>Applications</button>
          </div>
        </div>
      </div>

      <div className="jb-content">
        {activeTab === 'board' && (
          <>
            <div className="search-card">
              <div className="search-input-wrap">
                <span>🔍</span>
                <input 
                  type="text" 
                  placeholder="Search job titles, companies, or keywords..." 
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                />
              </div>
              {/* --- NEW FILTER BUTTON HERE --- */}
              <button className="btn-filter-icon" onClick={() => setShowFilters(true)}>
                <span>⚙️</span> Filter
              </button>
              <button className="btn-search">Search</button>
            </div>

            <div className="filter-row">
              {quickFilterOptions.map(f => (
                <div key={f} className={`filter-pill ${quickFilter === f ? 'active' : ''}`} onClick={() => setQuickFilter(f)}>
                  {f}
                </div>
              ))}
            </div>

            <div className="card-grid">
              {filteredJobs.map(job => (
                <div key={job.id} className="job-card">
                  <div className="card-left">
                    <div className="job-logo">{job.logo}</div>
                    <div>
                      <h3 className="card-title">{job.title}</h3>
                      <div className="card-subtitle">{job.company}</div>
                      <div className="card-meta">
                        <span>📍 {job.location}</span>
                        <span>🕒 {job.type}</span>
                        <span style={{color: '#059669', fontWeight: 600}}>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-outline" onClick={() => navigate(`/job/${job.id}`)}>View Details</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};