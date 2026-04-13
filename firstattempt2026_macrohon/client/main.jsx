// client/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '../imports/ui/App';

// Import global styles
import './main.css';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  
  // Render the main App component
  root.render(<App />);
});