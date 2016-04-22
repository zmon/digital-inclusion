'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  fullDescription: {
    type: String,
    default: '',
    trim: true
  },
  caption: {
    type: String,
    default: '',
    trim: true
  },
  signupNotes: {
    type: String,
    default: '',
    trim: true
  },
  iconMatcher: {
    type: String
  },
  scheduleNotes: {
    type: String,
    default: '',
    trim: true
  },
  cost: {
    type: String,
    default: '',
    trim: true
  },
  keyDetails: {
    type: String,
    default: '',
    trim: true
  },
  locationName: {
    type: String,
    default: '',
    trim: true
  },
  address1: {
    type: String,
    default: '',
    trim: true
  },
  address2: {
    type: String,
    default: '',
    trim: true
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  state: {
    type: String,
    default: '',
    trim: true
  },
  zip: {
    type: String,
    default: '',
    trim: true
  },
  contactName: {
    type: String,
    default: '',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    type: String,
    default: '',
    trim: true
  },
  dateTimeInterval: {
    type: String,
    default: '',
    trim: true
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  datesScheduled: {
    type: String
  },
  sundayHours: {
    type: String,
    default: '',
    trim: true
  },
  mondayHours: {
    type: String,
    default: '',
    trim: true
  },
  tuesdayHours: {
    type: String,
    default: '',
    trim: true
  },
  wednesdayHours: {
    type: String,
    default: '',
    trim: true
  },
  thursdayHours: {
    type: String,
    default: '',
    trim: true
  },
  fridayHours: {
    type: String,
    default: '',
    trim: true
  },
  saturdayHours: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Course', CourseSchema);
