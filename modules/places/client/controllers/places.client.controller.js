'use strict';


// Places controller
angular.module('digitalInclusion.places').controller('PlacesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Places',
  function ($scope, $stateParams, $location, Authentication, Places) {
    $scope.authentication = Authentication;
    // $scope.status = "not created";
 
    var geocoder = new google.maps.Geocoder();
    var resultsArr = [];
    $scope.xArray = [];

    $scope.hoist = function(arg1) {
      console.log("hoist: " + arg1);
      var latLng = new google.maps.LatLng(arg1[0], arg1[1]);
      console.log("very res");
      console.log(latLng);
      return latLng;
    }
    // geocode existing Place object
    // arg1 => readable address (string)
    // arg2 => place
    $scope.hoisted = [];
    $scope.geocode = function(isValid, arg2, arg3) {
      console.log("***** geocoding => " + isValid + " " + arg2);
      console.log(arg3);

      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'placeForm');

        return false;
      }

      var place = $scope.place;

      place.$update(function () {
        $location.path('/');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });

    };
    // arg2 => subcategory(public,customer,access,retail,day,evening)
    // arg3 => category(wifi,training,computers)
    $scope.create = function (isValid, arg2, arg3) {
      $scope.error = null;
       $scope.status = "Successfully created resource";
       
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'placeForm');

        return false;
      }

      var readableAddress = this.address1 + ", " + this.address2 + ", " + this.city + ", " + this.state + " " + this.zip;

      // console.log("code " + $scope.code);
      // console.log($scope.code);
      // console.log("then " + $scope.hoisted);
      // console.log($scope.hoisted);
      // console.log("arg 2, 3");
      //  console.log(arg2);
      //  console.log(arg3);
       // console.log("& this");
       // console.log(this.xArray);
      // console.log("readable address: " + readableAddress);
      // console.log("& code");
      // console.log($scope.code);
      // console.log("& xArray");
      // console.log($scope.xArray);
      // console.log($scope.xArray[0]);
      // console.log(this.x);

      // geocoder.geocode(readableAddress, function (err, res) {

      // });
      // $scope.latLng;
      // $scope.arr = [];
      
      // console.log('tmpREsults');
      // console.log(tmpResults);
      // console.log($scope.arr[0]);

      // console.log("$scope.geolocation");
      // console.log(this.geolocation);
      // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY


      // Create new Place object
      var place = new Places({
        title: this.title,
        readableAddress: readableAddress,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        state: this.state,
        zip: this.zip,
        url: this.url,
        phone: this.phone,
        description: this.description, 
        subcategory: arg2,
        category: arg3
      });


      // Redirect after save
      place.$save(function (response) {
        // $location.path('places/' + response._id);
        // console.log("response");
        // console.log(response.$resolved);
        // $scope.showStatus = true;
        // $scope.res = response;
        console.log("place");
        console.log(readableAddress);
        console.log(response);
        console.log(response._id);
        var oid = response._id;
        // var tmpRes = $scope.geocode(readableAddress, place);
         $location.path('confirm-location-details/' + response._id);
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
          $location.path('/');
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
      console.log("finding one");
      console.log($stateParams.placeId);
      $scope.place = Places.get({
        placeId: $stateParams.placeId
      });
    };

    $scope.findById = function(id) {
      $scope.place = Places.get({
        placedId: id
      });
    };

  }
]);