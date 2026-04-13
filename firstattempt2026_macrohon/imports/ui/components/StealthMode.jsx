// imports/ui/components/StealthMode.jsx
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const StealthMode = () => {
  const [stealthActive, setStealthActive] = useState(false);
  const [blockedCompanies, setBlockedCompanies] = useState('');

  const saveStealthSettings = () => {
    // Give alumni complete control over which specific companies can or cannot see their profile and activity 
    Meteor.call('users.updateStealthMode', {
      active: stealthActive,
      blocked: blockedCompanies.split(',')
    });
  };

  return (
    <div className="settings-panel">
      <h3>Stealth Mode</h3>
      <p>Hide your profile from selected companies (e.g., your current employer).</p>
      
      <label>
        <input type="checkbox" checked={stealthActive} onChange={(e) => setStealthActive(e.target.checked)} />
        Activate Stealth Mode
      </label>

      {stealthActive && (
        <div>
          <label>Block these companies (comma separated):</label>
          <input 
            type="text" 
            value={blockedCompanies} 
            onChange={(e) => setBlockedCompanies(e.target.value)} 
            placeholder="e.g., Acme Corp, Tech Solutions"
          />
        </div>
      )}
      <button onClick={saveStealthSettings}>Save Privacy Settings</button>
    </div>
  );
};

// imports/ui/components/DeclineOffer.jsx
export const DeclineOffer = ({ offerId }) => {
  const handleDecline = () => {
    // Ensure the decline is final and confirmed to prevent accidental submissions 
    if (window.confirm("Are you sure you want to decline this job offer? This action is final.")) {
      // Keep the process private between the alumni and the employer 
      Meteor.call('applications.declineOffer', offerId);
    }
  };

  return (
    <div className="offer-actions">
      {/* Make it easy for alumni to formally decline offers they've received  */}
      <button className="btn-decline" onClick={handleDecline}>Decline Offer</button>
    </div>
  );
};  