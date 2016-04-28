'use strict';

//Courses service used for communicating with the courses REST endpoints
angular.module('courses').factory('Courses', ['$resource',
  function ($resource) {
    return $resource('api/courses/:courseId', {
      courseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


angular.module('courses').factory('getCoursesService', function($http) {
  var getCourses = function(callback) {
    $http.get('/api/courses').success(function(data) {
      callback(data);
    });
  };

  return {
    getCourses: getCourses
  };
});

