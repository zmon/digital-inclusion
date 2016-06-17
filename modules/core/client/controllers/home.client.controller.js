'use strict';

angular.module('digitalInclusion.core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.showme = false;
  }
]);
