'use strict';

// Places controller
angular.module('places').controller('PlacesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Places',
  function ($scope, $stateParams, $location, Authentication, Places) {
    $scope.authentication = Authentication;
    // $scope.status = "not created";
    // Create new Place
    $scope.create = function (isValid, arg2, arg3) {
      $scope.error = null;
       $scope.status = "Successfully created resource";
       console.log("arg 2");
       console.log(arg2);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'placeForm');

        return false;
      }

      // Create new Place object
      var place = new Places({
        title: this.title,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        state: this.state,
        zip: this.zip,
        url: this.url,
        wifiTerms: arg2,
        phone: this.phone,
        description: this.description, 
        category: arg3
      });

      // Redirect after save
      place.$save(function (response) {
        // $location.path('places/' + response._id);
        console.log("response");
        console.log(response.$resolved);
        $scope.showStatus = true;
        $scope.res = response;
        // Clear form fields
        // $scope.title = '';
        // $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    // Remove existing Place
    $scope.remove = function (place) {
      if (place) {
        place.$remove();

        for (var i in $scope.places) {
          if ($scope.places[i] === place) {
            $scope.places.splice(i, 1);
          }
        }
      } else {
        $scope.place.$remove(function () {
          $location.path('places');
        });
      }
    };

    // Update existing Place
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'placeForm');

        return false;
      }

      var place = $scope.place;

      place.$update(function () {
        $location.path('places/' + place._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Places
    $scope.find = function () {
      $scope.places = Places.query();
    };

    // Find existing Place
    $scope.findOne = function () {
      $scope.place = Places.get({
        placeId: $stateParams.placeId
      });
    };
  }
]);
