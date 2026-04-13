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