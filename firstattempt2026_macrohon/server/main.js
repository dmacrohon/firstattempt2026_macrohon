import { Meteor } from 'meteor/meteor';

// This is the missing piece! 
// It tells the server to publish the current user's profile fields.
Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: { profile: 1, emails: 1 }
      }
    );
  } else {
    this.ready();
  }
});

Meteor.methods({
  'user.updateProfile'(data) {
    // Basic security check
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to update your profile.');
    }

    // Update the Meteor.users collection
    return Meteor.users.update(this.userId, {
      $set: {
        'profile.firstName': data.firstName,
        'profile.lastName': data.lastName,
        'profile.headline': data.headline,
        'profile.course': data.course,
        'profile.batch': data.batch,
        'profile.bio': data.bio,
        'profile.skills': data.skills,
        'profile.stealthMode': data.stealthMode,
      }
    });
  }
});