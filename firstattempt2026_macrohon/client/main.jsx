// client/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../imports/ui/App';

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
});

// Import global styles
import './main.css';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  
  // Render the main App component
  root.render(<App />);
});