// imports/ui/components/JobBoard.jsx
import React, { useState } from 'react';
// import JobFilterModal from './JobFilterModal'; // Assuming this is created

export const JobBoard = () => {
  const [activeTab, setActiveTab] = useState('Job Board');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(['Information Technology', 'Davao City']);

  // Mock data to visualize the design
  const mockJobs = [
    { _id: '1', title: 'Senior Software Engineer', company: 'TechSolutions Inc.', location: 'Davao City', type: 'Full-time' },
    { _id: '2', title: 'IT Systems Administrator', company: 'Blue Knight Enterprises', location: 'Davao City', type: 'Contract' }
  ];

  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter(f => f !== filterToRemove));
  };

  return (
    <div className="job-board-container">
      <div className="navigation-tabs">
        <button className={activeTab === 'Job Board' ? 'active' : ''} onClick={() => setActiveTab('Job Board')}>Job Board</button>
        <button className={activeTab === 'Applications' ? 'active' : ''} onClick={() => setActiveTab('Applications')}>Applications</button>
      </div>

      {activeTab === 'Job Board' && (
        <div className="job-board-content">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search roles, companies, or keywords" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="btn-filter" onClick={() => setShowFilter(true)}>
              Filter Options
            </button>
          </div>

          <div className="active-filters">
            {filters.map((filter, index) => (
              <span key={index} className="filter-tag">
                {filter} <button onClick={() => removeFilter(filter)} className="remove-tag">×</button>
              </span>
            ))}
          </div>

          <div className="job-listings">
            {mockJobs.map(job => (
              <div key={job._id} className="job-card">
                <div className="job-info">
                  <h4>{job.title}</h4>
                  <p className="company">{job.company}</p>
                  <p className="meta">{job.location} • {job.type}</p>
                </div>
                <button className="btn-apply">View & Apply</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* showFilter && <JobFilterModal onClose={() => setShowFilter(false)} /> */}
    </div>
  );
};