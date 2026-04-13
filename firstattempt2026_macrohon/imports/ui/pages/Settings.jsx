import React, { useState } from 'react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Toggle States
  const [toggles, setToggles] = useState({
    email: true,
    push: false,
    jobAlerts: true,
    stealthMode: true // Set to true by default for testing the UI
  });

  // Blocked Companies State
  const [blockedCompanies, setBlockedCompanies] = useState([
    'TechDavao Solutions',
    'Blue Horizon Media'
  ]);
  const [newCompany, setNewCompany] = useState('');

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBlockCompany = () => {
    if (newCompany.trim() && !blockedCompanies.includes(newCompany.trim())) {
      setBlockedCompanies([...blockedCompanies, newCompany.trim()]);
      setNewCompany('');
    }
  };

  const handleRemoveCompany = (companyToRemove) => {
    setBlockedCompanies(blockedCompanies.filter(c => c !== companyToRemove));
  };

  return (
    <div className="st-viewport">
      <style>{`
        .st-viewport {
          position: absolute; top: 0; left: 260px; width: calc(100% - 260px);
          min-height: 100vh; background-color: #F3F4F6; font-family: 'Inter', sans-serif;
        }

        .st-header {
          background-color: #00205B; padding: 60px 6% 80px 6%; color: white;
        }
        .st-header h1 { font-family: "Times New Roman", serif; font-size: 2.2rem; margin: 0; }

        .st-container {
          max-width: 1000px; margin: -40px auto 40px auto; padding: 0 24px;
          display: grid; grid-template-columns: 240px 1fr; gap: 30px;
        }

        /* Left Settings Menu */
        .st-menu {
          background: white; border-radius: 16px; padding: 12px;
          border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          height: fit-content;
        }
        .st-menu-item {
          padding: 12px 16px; border-radius: 8px; cursor: pointer;
          font-weight: 500; color: #4B5563; transition: 0.2s; margin-bottom: 4px;
        }
        .st-menu-item:hover { background: #F9FAFB; }
        .st-menu-item.active { background: #EFF6FF; color: #1D4ED8; font-weight: 600; }

        /* Right Content Area */
        .st-card {
          background: white; border-radius: 16px; padding: 30px;
          border: 1px solid #E5E7EB; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        .st-card h2 { margin: 0 0 20px 0; font-size: 1.2rem; color: #111827; }
        .st-card p { color: #6B7280; font-size: 0.95rem; line-height: 1.6; }

        /* Forms */
        .input-group { margin-bottom: 16px; }
        .input-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .input-group input { width: 100%; padding: 12px; border: 1px solid #D1D5DB; border-radius: 8px; font-family: inherit; }
        
        .btn-update { background: #00205B; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .btn-danger { background: #FEF2F2; color: #EF4444; border: 1px solid #FECACA; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }

        /* Toggle Switch CSS */
        .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #F3F4F6; }
        .toggle-row:last-child { border-bottom: none; padding-bottom: 0; }
        .toggle-label { font-weight: 500; color: #111827; display: block; }
        .toggle-sub { font-size: 0.85rem; color: #6B7280; margin-top: 4px; display: block; max-width: 85%; line-height: 1.5; }
        
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #D1D5DB; transition: .3s; border-radius: 24px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        input:checked + .slider { background-color: #10B981; }
        input:checked + .slider:before { transform: translateX(20px); }

        /* Blocked Companies Section Animation */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blocked-section { animation: slideDown 0.3s ease-out; margin-top: 24px; padding-top: 24px; border-top: 1px solid #F3F4F6; }
      `}</style>

      <div className="st-header">
        <h1>Settings</h1>
      </div>

      <div className="st-container">
        {/* Left Sidebar Menu */}
        <div className="st-menu">
          <div 
            className={`st-menu-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General Settings
          </div>
          <div 
            className={`st-menu-item ${activeTab === 'stealth' ? 'active' : ''}`}
            onClick={() => setActiveTab('stealth')}
          >
            Stealth Mode
          </div>
        </div>

        {/* Right Content Area */}
        <div className="st-content">
          {activeTab === 'general' && (
            <>
              {/* Change Password Card */}
              <div className="st-card">
                <h2>Change Password</h2>
                <div className="input-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="input-group">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="input-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <button className="btn-update">Update Password</button>
              </div>

              {/* Notifications Card */}
              <div className="st-card">
                <h2>Notifications</h2>
                <div className="toggle-row">
                  <span className="toggle-label">Email Notifications</span>
                  <label className="switch">
                    <input type="checkbox" checked={toggles.email} onChange={() => handleToggle('email')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-row">
                  <span className="toggle-label">Push Notifications</span>
                  <label className="switch">
                    <input type="checkbox" checked={toggles.push} onChange={() => handleToggle('push')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-row">
                  <span className="toggle-label">Job Alerts</span>
                  <label className="switch">
                    <input type="checkbox" checked={toggles.jobAlerts} onChange={() => handleToggle('jobAlerts')} />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="st-card" style={{ borderColor: '#FECACA' }}>
                <h2 style={{ color: '#EF4444' }}>Danger Zone</h2>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn-danger" style={{ marginTop: '10px' }}>Delete Account</button>
              </div>
            </>
          )}

          {activeTab === 'stealth' && (
            <div className="st-card">
              <h2>Stealth Mode</h2>
              <div className="toggle-row" style={{ paddingBottom: '0', borderBottom: 'none' }}>
                <div>
                  <span className="toggle-label" style={{ fontSize: '1.1rem' }}>Enable Stealth Mode</span>
                  <span className="toggle-sub">
                    Hide your profile from employers. You can still apply for jobs, but your profile won't appear in public searches or candidate recommendations.
                  </span>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={toggles.stealthMode} onChange={() => handleToggle('stealthMode')} />
                  <span className="slider"></span>
                </label>
              </div>

              {/* Conditionally Rendered Blocked Companies Section */}
              {toggles.stealthMode && (
                <div className="blocked-section">
                  <h3 style={{ fontSize: '1.05rem', color: '#111827', margin: '0 0 8px 0' }}>Blocked Companies</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: '0 0 16px 0' }}>
                    Prevent specific employers from seeing your profile even when applying.
                  </p>
                  
                  {/* Add Company Input */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Acme Corp..." 
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleBlockCompany()}
                      style={{ flex: 1, padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontFamily: 'inherit' }}
                    />
                    <button 
                      onClick={handleBlockCompany}
                      style={{ background: '#00205B', color: 'white', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Block
                    </button>
                  </div>

                  {/* Blocked Companies List */}
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', background: '#F9FAFB' }}>
                    {blockedCompanies.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
                        No companies blocked.
                      </div>
                    ) : (
                      blockedCompanies.map((company, index) => (
                        <div 
                          key={index} 
                          style={{ 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                            padding: '14px 16px', borderBottom: index < blockedCompanies.length - 1 ? '1px solid #E5E7EB' : 'none' 
                          }}
                        >
                          <span style={{ fontWeight: 500, color: '#374151' }}>{company}</span>
                          <button 
                            onClick={() => handleRemoveCompany(company)}
                            style={{ background: 'transparent', color: '#EF4444', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};