'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Course = mongoose.model('Course'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a course
 */
exports.create = function (req, res) {
  var course = new Course(req.body);
  course.user = req.user;

  course.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(course);
    }
  });
};

/**
 * Show the current course
 */
exports.read = function (req, res) {
  res.json(req.course);
};

/**
 * Update a course
 */
exports.update = function (req, res) {
  var course = req.course;

  course.title = req.body.title;
  course.shortDescription = req.body.shortDescription;
  course.fullDescription = req.body.fullDescription;
  course.keyDetails = req.body.keyDetails;
  course.cost = req.body.cost;
  course.signupNotes = req.body.signupNotes;
  course.scheduleNotes = req.body.scheduleNotes;
  course.locationName = req.body.locationName;
  course.address1 = req.body.address1;
  course.address2 = req.body.address2;
  course.city = req.body.city;
  course.state = req.body.state;
  course.zipCode = req.body.zipCode;
  course.contactName = req.body.contactName;
  course.contactPhone = req.body.contactPhone;
  course.contactEmail = req.body.contactEmail;
  course.dateTimeInterval = req.body.dateTimeInterval;
  course.url = req.body.url;
  course.datesScheduled = req.body.datesScheduled;
  course.sundayHours = req.body.sundayHours;
  course.mondayHours = req.body.mondayHours;
  course.tuesdayHours = req.body.tuesdayHours;
  course.wednesdayHours = req.body.wednesdayHours;
  course.thursdayHours = req.body.thursdayHours;
  course.fridayHours = req.body.fridayHours;
  course.saturdayHours = req.body.saturdayHours;

  course.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(course);
    }
  });
};

/**
 * Delete an course
 */
exports.delete = function (req, res) {
  var course = req.course;

  course.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(course);
    }
  });
};

/**
 * List of Courses
 */
exports.list = function (req, res) {
  Course.find().sort('-created').populate('user', 'displayName').exec(function (err, courses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(courses);
    }
  });
};

/**
 * Course middleware
 */
exports.courseByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Course is invalid'
    });
  }

  Course.findById(id).populate('user', 'displayName').exec(function (err, course) {
    if (err) {
      return next(err);
    } else if (!course) {
      return res.status(404).send({
        message: 'No course with that identifier has been found'
      });
    }
    req.course = course;
    next();
  });
};
