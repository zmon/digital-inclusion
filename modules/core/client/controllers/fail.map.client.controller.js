'use strict';

angular.module('core.map').controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'courseIndexService',  'placeIndexService', '$location',
    function ($scope, $timeout, $http, $state, $stateParams, Authentication, courseIndexService, placeIndexService, $location) {

        // define new variables
        var sprintCenter = new google.maps.LatLng(39.097951,-94.616262);
        var infoWindow = new google.maps.InfoWindow();
        var browserSupportFlag =  new Boolean();

        $scope.visitor = {};

        // store markers in array for display on map
        $scope.mapMarkers = [];

        // get courses from Courses API
        courseIndexService.getCourses(function(courses) {
          $scope.courses = courses;
          var i;
          for (i = 0; i < $scope.courses.length; i++){
            createMarker($scope.courses[i]);
          }
        });

        // get places from Places API
        placeIndexService.getPlaces(function(places) {
          $scope.places = places;
          var i;
          for (i=0;i<$scope.places.length;i++){
            createMarker($scope.places[i]);
          }
        });




        // center map to visitor location
        if(navigator.geolocation) {
          browserSupportFlag = true;
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log("geolocation: ");
            console.log(position.coords);
            initalLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            // $scope.visitor.position = position.coords;
            // return $scope.visitor.position;
            $scope.map.setCenter(initialLocation);
            // console.log("&&&&&");
            // console.log($scope.map);
            setVisitorMarker(initialLocation);
          }, function() {
            handleNoGeolocation(browserSupportFlag);
          });
        }
        else {
          browserSupportFlag = false;
          handleNoGeolocation(browserSupportFlag);
        }

        // error handling if geolocation not available
        function handleNoGeolocation(errorFlag) {
          if (errorFlag == true) {
            alert("Geolocation service failed.");
            initialLocation = sprintCenter;
          } else {
            alert("Your browser doesn't support geolocation.");
            initialLocation = sprintCenter;
          }
          // $scope.visitor.position(initialLocation);
        }


         // console.log("outer scope");
        // console.log($scope.visitor.position);








        $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);

        $scope.mapOptions = {
          center: new google.maps.LatLng(39.1059,-94.57441),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: [
              google.maps.MapTypeId.ROADMAP,
              google.maps.MapTypeId.TERRAIN
            ]
          }
        };

        // var setIcon = function(obj) {
        //   if (obj.iconMatcher === "day") {
        //       return $scope.icons.dayTraining;
        //   } else if (obj.iconMatcher === "evening") {
        //       return $scope.icons.nightTraining;
        //   } else if (obj.iconMatcher === "publicWifi") {
        //       return $scope.icons.publicWifi;
        //   } else if (obj.iconMatcher === "customerWifi") {
        //       return $scope.icons.customerWifi;
        //   } else if (obj.iconMatcher === "pcAccess") {
        //       return $scope.icons.publicAccess;
        //   } else if (obj.iconMatcher === "pcResale") {
        //       return $scope.icons.retailPcs;
        //   } else {
        //       return $scope.icons.siteVisitor;
        //   }
        // }

        var setVisitorMarker = function(loc){
          console.log('Site visitor current loc');
          console.log(loc);
          var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(loc.latitude, loc.longitude),
                icon: setIcon('_')
          });
          $scope.mapMarkers.push(marker);
        };

       var createMarker = function (info) {

          var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lng),
            title: info.title,
            icon: setIcon(info),
            caption: info.caption
          });

          marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';

          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
          });

          $scope.mapMarkers.push(marker);
      }

      $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      }










          // map markers



          var setIcon = function(obj) {
            if (obj.iconMatcher === "day") {
                return $scope.icons.dayTraining;
            } else if (obj.iconMatcher === "evening") {
                return $scope.icons.nightTraining;
            } else if (obj.iconMatcher === "publicWifi") {
                return $scope.icons.publicWifi;
            } else if (obj.iconMatcher === "customerWifi") {
                return $scope.icons.customerWifi;
            } else if (obj.iconMatcher === "pcAccess") {
                return $scope.icons.publicAccess;
            } else if (obj.iconMatcher === "pcResale") {
                return $scope.icons.retailPcs;
            } else {
                return $scope.icons.siteVisitor;
            }
          }


         var createMarker = function (info) {
            console.log("******Logging createMarker(info)");
            console.log(info.iconMatcher);
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                icon: setIcon(info),
                caption: info.caption
            });

            marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.mapMarkers.push(marker);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
    }
]);