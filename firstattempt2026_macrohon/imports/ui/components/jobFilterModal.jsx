// imports/ui/components/JobFilterModal.jsx
import React, { useState } from 'react';

export const JobFilterModal = ({ onClose }) => {
  // Allow filtering by key criteria: location, industry, experience level, and salary range 
  return (
    <div className="modal-overlay">
      <div className="filter-modal">
        <h3>Job Filters</h3>
        
        <div className="filter-group">
          <label>Experience Level</label>
          <select>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="director">Director</option>
            <option value="executive">Executive</option>
            {/* A 'Senior Knight' filter for executive-level roles (10+ years of experience)  */}
            <option value="senior-knight">Senior Knight (10+ years experience) 🛡️</option>
          </select>
        </div>

        {/* Form controls for Location, Industry, and Salary Range */}
        
        <div className="modal-actions">
          <button onClick={onClose}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};
export default JobFilterModal;