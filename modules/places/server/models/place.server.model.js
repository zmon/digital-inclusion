'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Place Schema
 */
var PlaceSchema = new Schema({
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
  shortName: {
    type: String,
    default: '',
    trim: true
  },
  desc: {
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
  hours: {
    type: Array
  },
  geolocation: {
    type: Object
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  state: {
    type: String,
    default: 'MO',
    trim: true
  },
  zipCode: {
    type: Number
  },
  phone: {
    type: Number
  },
  contactPerson: {
    type: String,
    default: '',
    trim: true
  },
  contactEmail: {
    type: String,
    default: '',
    trim: true
  },
  contactType: {
    type: String,
    default: '',
    trim: true
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  offersWifi: {
    type: Boolean
  },
  offersTraining: {
    type: Boolean
  },
  wifi: {
    type: Object
  },
  trainingCourses: {
    type: Object
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Place', PlaceSchema);
