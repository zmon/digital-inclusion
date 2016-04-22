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
    required: 'Must provide title or place name for location'
  },
  caption: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  url: {
    type: String,
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
  hoursOpen: {
    type: Array
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
  zip: {
    type: Number
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  contactName: {
    type: String,
    default: '',
    trim: true
  },
  contactEmail: {
    type: String,
    default: '',
    trim: true
  },
  offersWifi: {
    type: Boolean
  },
  offersTraining: {
    type: Boolean
  },
  wifiTerms: {
    type: String,
    default: '',
    trim: true
  },
  computerReseller: {
    type: Boolean
  },
  iconMatcher: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Place', PlaceSchema);
