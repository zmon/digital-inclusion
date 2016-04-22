'use strict';

/**
 * Module dependencies.
 */
var placesPolicy = require('../policies/places.server.policy'),
  places = require('../controllers/places.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/places').all(placesPolicy.isAllowed)
    .get(places.list)
    .post(places.create);

  // Single place routes
  app.route('/api/places/:placeId').all(placesPolicy.isAllowed)
    .get(places.read)
    .put(places.update)
    .delete(places.delete);

  // Finish by binding the place middleware
  app.param('placeId', places.placeByID);
};
