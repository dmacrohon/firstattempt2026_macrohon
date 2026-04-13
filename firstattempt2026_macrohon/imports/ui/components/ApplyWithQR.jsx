// imports/ui/components/ApplyWithQR.jsx
import React from 'react';
import { Meteor } from 'meteor/meteor';

export const ApplyWithQR = ({ jobData }) => {
  const handleQRScan = (qrData) => {
    if (qrData) {
      // Automatically pull verified academic credentials (transcripts, diplomas, certificates) directly from the university registrar system 
      Meteor.call('applications.submitViaQR', {
        jobId: jobData._id,
        userQRToken: qrData
      }, (error, result) => {
        if (!error) {
          alert('Application successfully submitted with verified documents! ');
        }
      });
    }
  };

  return (
    <div className="qr-apply-container">
      <h3>Quick Apply</h3>
      {/* Enable alumni to apply to jobs instantly by scanning a QR code at career events or job postings  */}
      <button onClick={() => handleQRScan('mock-qr-token-123')}>Scan QR to Apply</button>
    </div>
  );
};