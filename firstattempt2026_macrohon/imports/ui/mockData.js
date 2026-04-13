// imports/ui/mockData.js
export const mockJobs = [
  { _id: '1', title: 'Senior Software Engineer', company: 'TechSolutions Inc.', location: 'Davao City', type: 'Full-time', description: 'Looking for a Senior Dev with 5+ years of React/Meteor experience. Blue Knight alumni preferred.', salary: '₱80,000 - ₱120,000' },
  { _id: '2', title: 'IT Systems Administrator', company: 'Blue Knight Enterprises', location: 'Davao City', type: 'Contract', description: 'Maintain internal servers and network infrastructure.', salary: '₱40,000 - ₱60,000' },
  { _id: '3', title: 'CTO / VP of Engineering', company: 'Global Tech PH', location: 'Manila', type: 'Full-time', description: 'Executive leadership role. Requires 10+ years experience.', salary: '₱200,000+' }
];

export const mockApplications = [
  { _id: 'app1', jobId: '1', jobTitle: 'Senior Software Engineer', company: 'TechSolutions Inc.', status: 'Interviewing', appliedDate: '2026-04-01' },
  { _id: 'app2', jobId: '2', jobTitle: 'IT Systems Administrator', company: 'Blue Knight Enterprises', status: 'Offer Extended', appliedDate: '2026-03-15' }
];