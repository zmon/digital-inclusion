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
  console.log("creating place");
  
  console.log("req.body");
  console.log(req.body);
  console.log("place inspect");
  console.log(place);
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
  console.log("update **");
    console.log(req.body);

  var place = req.place;

  place.name = req.body.name;
  place.url = req.body.url;
  place.caption = req.body.caption;
  place.category = req.body.category;
  place.description = req.body.description;
  place.address1 = req.body.address1;
  place.address2 = req.body.address2;
  place.city = req.body.city;
  place.zip = req.body.zip;
  place.state = req.body.state;
  // place.lat = req.body.lat;
  // place.lng = req.body.lng;
  place.location = req.body.location;
  place.phone = req.body.phone;
  // place.contactName = req.body.contactName;
  // place.contactEmail = req.body.contactEmail;
  // place.contactPhone = req.body.contactPhone;
  place.hoursOpen = req.body.hoursOpen;
  // place.offersWifi = req.body.offersWifi;
  // place.wifiTerms = req.body.wifiTerms;
  // place.offersCourses = req.body.offersCourses;
  // place.computerReseller = req.body.computerReseller;
  // place.iconMatcher = req.body.iconMatcher;


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
