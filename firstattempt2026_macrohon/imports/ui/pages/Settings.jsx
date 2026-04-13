// imports/ui/pages/Settings.jsx
import React, { useState } from 'react';

export const Settings = () => {
  const [stealthActive, setStealthActive] = useState(false);
  const [blockedCompany, setBlockedCompany] = useState('');
  const [blockedList, setBlockedList] = useState(['Acme Corp']);

  const handleAddBlock = () => {
    if(blockedCompany) {
      setBlockedList([...blockedList, blockedCompany]);
      setBlockedCompany('');
    }
  };

  const handleSave = () => {
    alert('Privacy settings saved successfully.');
  };

  return (
    <div className="job-board-container">
      <h2>Privacy & Stealth Settings</h2>
      <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Manage how employers view your profile on The Alumni Hub.</p>

      <div className="stealth-toggle" style={{background: '#f4f5f7', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem'}}>
        <label style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer'}}>
          <input 
            type="checkbox" 
            checked={stealthActive} 
            onChange={(e) => setStealthActive(e.target.checked)} 
            style={{width: '20px', height: '20px'}}
          />
          Activate Stealth Mode 🥷
        </label>
        <p style={{marginLeft: '2.5rem', marginTop: '0.5rem'}}>When active, your profile will be completely hidden from companies you specify below.</p>
      </div>

      {stealthActive && (
        <div className="block-list-container" style={{marginBottom: '2rem'}}>
          <h4>Blocked Companies</h4>
          <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Enter company name..." 
              value={blockedCompany}
              onChange={e => setBlockedCompany(e.target.value)}
            />
            <button className="btn-filter" onClick={handleAddBlock}>Block</button>
          </div>
          
          <ul style={{listStyle: 'none', padding: 0}}>
            {blockedList.map((comp, idx) => (
              <li key={idx} style={{padding: '0.8rem', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between'}}>
                {comp}
                <button onClick={() => setBlockedList(blockedList.filter(c => c !== comp))} style={{background: 'none', border: 'none', color: 'red', cursor: 'pointer'}}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn-apply" onClick={handleSave}>Save Settings</button>
    </div>
  );
};