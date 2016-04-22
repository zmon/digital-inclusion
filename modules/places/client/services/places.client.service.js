'use strict';

//Places service used for communicating with the places REST endpoints
angular.module('places').factory('Places', ['$resource',
  function ($resource) {
    return $resource('api/places/:placeId', {
      placeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('places').factory('placeIndexService', function($http) {
  var getPlaces = function(callback) {
    $http.get('/api/places').success(function(data) {
      callback(data);
    });
  };

  return {
    getPlaces: getPlaces
  };
});