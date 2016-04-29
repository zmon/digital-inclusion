'use strict';

function onGoogleReady() {
  console.log("Google APIs init");
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}

angular.module('core.map').controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'getCoursesService',  'getPlacesService', '$location',
    function ($scope, $timeout, $http, $state, $stateParams, Authentication, getCoursesService, getPlacesService, $location) {

        getCoursesService.getCourses(function(courses) {
            $scope.courses = courses;
            var i;
            for (i = 0; i < $scope.courses.length; i++){
                console.log($scope.courses[i]);
                createMarker($scope.courses[i]);
            }
        });

        getPlacesService.getPlaces(function(places) {
            $scope.places = places;
            var i;
            for (i=0;i<$scope.places.length;i++){
                createMarker($scope.places[i]);
            }
        });

        var infoWindow = new google.maps.InfoWindow();
        $scope.browserSupportFlag =  new Boolean();
        $scope.trainingMarkers = [];
        $scope.mapMarkers = [];
        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);
        $scope.model = { myMap: $scope.map};
        $scope.siteVisitor, $scope.id, $scope.watchOptions;

        $scope.success = function (pos) {
          var crd = pos.coords;

          if ($scope.visitor.latitude === crd.latitude && $scope.visitor.longitude === crd.longitude) {
            console.log('Congratulations, you reached the $scope.visitor');
            navigator.geolocation.clearWatch(id);
          }
        }

        $scope.geolocationError = function (err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        $scope.visitor = {
          latitude : 0,
          longitude: 0
        };

        $scope.watchOptions = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        $scope.id = navigator.geolocation.watchPosition($scope.success, $scope.geolocationError, $scope.watchOptions);


        $scope.showResult = function () {
            return $scope.error == "";
        }

        $scope.mapOptions = {

            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.showPosition = function (position) {
            console.log("show position");
            console.log(position);
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;

            var mapOptions = {
                center: {lat: $scope.lat, lng: $scope.lng},
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById('customMap'), mapOptions);
            $scope.visitor = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng($scope.lat, $scope.lng)
                });
            $scope.$apply();

            // $scope.model.myMap.setCenter(latlng);

            // $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
        }

        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }

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

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                console.log("supported");
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                console.log("not supported");
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }


        var geocode = function(latlng) {
            console.log("latlng geocoding");

        };


        var createMarker = function (info) {
                console.log("******Logging createMarker(info)");

                console.log(info);
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.lng),
                    title: info.title,
                    icon: setIcon(info.iconMatcher),
                    caption: info.caption
                });
// console.log("creating new marker*******");
                  // console.log($scope.icons.courses.day.path);
                // var marker = new Marker({
                //   map: $scope.map,
                //   position: new google.maps.LatLng(info.lat,info.lng),
                //   icon: {
                //     path: $scope.icons.dayCourse,
                //     fillColor: '#00CCBB',
                //     fillOpacity: 1,
                //     strokeColor: '',
                //     strokeWeight: 0
                //   },
                //   map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
                // });

                console.log("***Inspect marker");
                console.log("*marker");
                console.log(marker);
                console.log("***Close results");
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

        $scope.getLocation();

    }
]);