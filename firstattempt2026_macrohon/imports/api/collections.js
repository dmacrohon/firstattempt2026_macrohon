// imports/api/collections.js
import { Mongo } from 'meteor/mongo';

export const Jobs = new Mongo.Collection('jobs');
export const Applications = new Mongo.Collection('applications');
export const Companies = new Mongo.Collection('companies');

// User settings can be stored directly within Meteor.users