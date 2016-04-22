'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Place = mongoose.model('Place'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a place
 */
exports.create = function (req, res) {
  var place = new Place(req.body);
  place.user = req.user;

  place.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(place);
    }
  });
};

/**
 * Show the current place
 */

exports.read = function (req, res) {
  res.json(req.place);
};

/**
 * Update a place
 */

exports.update = function (req, res) {

  var place = req.place;

  place.title = req.body.title;
  place.desc = req.body.desc;
  place.address1 = req.body.address1;
  place.address2 = req.body.address2;
  place.city = req.body.city;
  place.zipCode = req.body.zipCode;
  place.state = req.body.state;
  place.phone = req.body.phone;
  place.contactPerson = req.body.contactPerson;
  place.contactType = req.body.contactType;
  place.contactEmail = req.body.contactEmail;
  place.hours = req.body.hours;
  place.offersWifi = req.body.offersWifi;
  place.wifi = req.body.wifi;
  place.offersTraining = req.body.offersTraining;


  place.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(place);
    }
  });

};

/**
 * Delete an place
 */

exports.delete = function (req, res) {
  var place = req.place;

  place.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(place);
    }
  });
};

/**
 * List of Places
 */
exports.list = function (req, res) {
  Place.find().sort('-created').populate('user', 'displayName').exec(function (err, places) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(places);
    }
  });
};

/**
 * Place middleware
 */
exports.placeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Place is invalid'
    });
  }

  Place.findById(id).populate('user', 'displayName').exec(function (err, place) {
    if (err) {
      return next(err);
    } else if (!place) {
      return res.status(404).send({
        message: 'No place with that identifier has been found'
      });
    }
    req.place = place;
    next();
  });
};
