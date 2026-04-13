// imports/ui/mockData.js
export const mockApplications = [
  { _id: 'app1', jobId: '1', jobTitle: 'Senior Software Engineer', company: 'TechSolutions Inc.', status: 'Interviewing', appliedDate: '2026-04-01' },
  { _id: 'app2', jobId: '2', jobTitle: 'IT Systems Administrator', company: 'Blue Knight Enterprises', status: 'Offer Extended', appliedDate: '2026-03-15' }
];

export const mockJobs = [
  { 
    id: "1", 
    title: 'Senior Full Stack Developer', 
    company: 'TechDavao Solutions', 
    location: 'Davao City', 
    type: 'Full-time', 
    salary: '₱80,000 - ₱120,000', 
    logo: 'TD',
    description: 'Lead our engineering team in building scalable web applications using the MERN stack.',
    requirements: ['7+ years experience', 'Mastery of React & Node.js', 'Experience with AWS'],
    benefits: ['Full Health Coverage', 'Flexible Working Hours', 'Stock Options']
  },
  { 
    id: "2", 
    title: 'Marketing Manager', 
    company: 'Blue Horizon Media', 
    location: 'Remote', 
    type: 'Full-time', 
    salary: '₱50,000 - ₱70,000', 
    logo: 'BH',
    description: 'Drive growth and brand awareness through innovative digital marketing strategies.',
    requirements: ['Bachelor’s in Marketing', 'SEO/SEM expertise', 'Content strategy experience'],
    benefits: ['Remote allowance', 'Gym membership', 'Monthly team dinners']
  },
  { 
    id: "3", 
    title: 'UX/UI Designer', 
    company: 'Creative Knights', 
    location: 'Davao City', 
    type: 'Contract', 
    salary: '₱45,000 - ₱60,000', 
    logo: 'CK',
    description: 'Design beautiful, user-centric interfaces for our diverse client base.',
    requirements: ['Strong Figma portfolio', 'Visual design skills', 'Understanding of user psychology'],
    benefits: ['Project-based bonuses', 'Creative freedom', 'Mentorship']
  },
  { 
    id: "4", 
    title: 'Data Analyst', 
    company: 'Ateneo Research', 
    location: 'Jacinto Campus', 
    type: 'Part-time', 
    salary: '₱30,000 - ₱40,000', 
    logo: 'AR',
    description: 'Help the university process and visualize research data for academic publications.',
    requirements: ['Python or R proficiency', 'SQL knowledge', 'Strong statistical background'],
    benefits: ['Access to campus facilities', 'Academic credits', 'Flexible schedule']
  },
];