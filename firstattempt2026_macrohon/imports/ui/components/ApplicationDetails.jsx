// imports/ui/components/ApplicationDetails.jsx
import React from 'react';

// Status badges with color coding 
const statusColors = {
  'Under Review': '#FFA500', // orange 
  'Shortlisted': '#008000', // green 
  'Interviewing': '#800080', // purple 
  'Not Selected': '#808080', // gray 
  'Applied': '#0000FF',
  'Hired': '#006400'
};

export const ApplicationDetails = ({ timelineEvents }) => {
  return (
    <div className="application-details">
      <h3>Application Timeline</h3>
      {/* Application timeline with timestamps and progress indicators  */}
      <ul className="timeline">
        {timelineEvents.map((event, index) => (
          <li key={index} className="timeline-item">
            <span className="timestamp">{event.timestamp}</span>
            <div className="progress-indicator"></div>
            <span className="status-badge" style={{ backgroundColor: statusColors[event.status] }}>
              {event.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};