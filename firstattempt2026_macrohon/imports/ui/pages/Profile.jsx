import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const Profile = () => {
  const { user, isLoading } = useTracker(() => {
    return {
      user: Meteor.user(),
      isLoading: Meteor.loggingIn(),
    };
  });

  const [formData, setFormData] = useState({
    name: '',
    course: '',
    batch: '',
    phone: '',
    bio: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  // NEW: Add a flag to track if we've loaded the data yet
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only update formData if we have a user AND we haven't initialized yet
    if (user && user.profile && !isInitialized) {
      setFormData({
        name: user.profile.name || '',
        course: user.profile.course || '',
        batch: user.profile.batch || '',
        phone: user.profile.phone || '',
        bio: user.profile.bio || ''
      });
      // Lock it down! This prevents Meteor from overwriting your typing.
      setIsInitialized(true); 
    }
  }, [user, isInitialized]); // Add isInitialized to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    Meteor.call('users.updateProfile', formData, (error) => {
      setIsSaving(false);
      if (error) {
        alert('Error updating profile: ' + error.reason);
      } else {
        alert('Profile updated successfully!');
      }
    });
  };

  if (isLoading) {
    return (
      <div className="pr-viewport" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading Profile...</p>
      </div>
    );
  }

  const displayEmail = user?.emails?.[0]?.address || "No email registered";

  return (
    <div className="pr-viewport">
      <style>{`
        .pr-viewport {
          position: absolute; top: 0; left: 260px; width: calc(100% - 260px);
          min-height: 100vh; background-color: #F3F4F6; font-family: 'Inter', sans-serif;
        }
        .pr-header {
          background-color: #00205B; padding: 60px 6% 80px 6%; color: white;
        }
        .pr-header h1 { font-family: "Times New Roman", serif; font-size: 2.2rem; margin: 0; }
        .pr-container {
          max-width: 900px; margin: -40px auto 40px auto; padding: 0 24px;
        }
        .pr-card {
          background: white; border-radius: 16px; padding: 40px;
          border: 1px solid #E5E7EB; box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          margin-bottom: 24px;
        }
        .profile-top { display: flex; align-items: center; gap: 24px; border-bottom: 1px solid #F3F4F6; padding-bottom: 30px; margin-bottom: 30px; }
        .avatar { width: 100px; height: 100px; background: #E5E7EB; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #94A3B8; }
        .profile-name { font-size: 1.8rem; font-weight: 700; color: #111827; margin: 0 0 5px 0; }
        .profile-sub { color: #6B7280; font-size: 1rem; margin: 0; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .input-group { display: flex; flexDirection: column; gap: 8px; }
        .input-group label { font-size: 0.85rem; font-weight: 600; color: #374151; }
        .input-group input, .input-group textarea { padding: 12px; border: 1px solid #D1D5DB; border-radius: 8px; font-family: inherit; font-size: 0.95rem; background: #F9FAFB; transition: border-color 0.2s; }
        .input-group input:focus, .input-group textarea:focus { outline: none; border-color: #00205B; background: white; }
        .btn-save { background: #00205B; color: white; border: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 30px; transition: 0.2s; }
        .btn-save:hover:not(:disabled) { background: #00153D; }
        .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      <div className="pr-header">
        <h1>My Profile</h1>
      </div>

      <div className="pr-container">
        <div className="pr-card">
          <div className="profile-top">
            <div className="avatar">👤</div>
            <div>
              <h2 className="profile-name">{user?.profile?.name || 'Set your name'}</h2>
              <p className="profile-sub">
                {formData.course || 'Course not set'} • Batch {formData.batch || 'N/A'}
              </p>
            </div>
          </div>

          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#111827' }}>Personal Information</h3>
          
          <div className="info-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Juan Dela Cruz" />
            </div>
            <div className="input-group">
              <label>Graduation Year</label>
              <input type="text" name="batch" value={formData.batch} onChange={handleChange} placeholder="e.g. 2023" />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" value={displayEmail} disabled style={{ cursor: 'not-allowed', opacity: 0.7 }} />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+63 912 345 6789" />
            </div>
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label>Course / Program</label>
              <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="e.g. BS Computer Science" />
            </div>
          </div>

          <div className="input-group" style={{ marginTop: '24px' }}>
            <label>Bio / Resume Summary</label>
            <textarea 
              name="bio"
              rows="4" 
              style={{ resize: 'vertical' }}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell employers a little bit about yourself, your skills, and your career goals..."
            />
          </div>

          <button className="btn-save" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};