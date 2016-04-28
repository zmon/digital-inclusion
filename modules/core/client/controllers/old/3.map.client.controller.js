'use strict';

function onGoogleReady() {
  console.log("Google APIs init");
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}

angular.module('core.map').controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'getCoursesService',  'getPlacesService', '$location',
    function ($scope, $timeout, $http, $state, $stateParams, Authentication, getCoursesService, getPlacesService, $location) {

        // var sprintCenter = new google.maps.LatLng(39.097951,-94.616262);
        // var siteVisitor;
        // var infoWindow = new google.maps.InfoWindow();
        var browserSupportFlag =  new Boolean();
        $scope.mapMarkers = [];
        $scope.trainingMarkers = [];
        $scope.hotspotMarkers = [];

        // getCoursesService.getCourses(function(courses) {
        //     $scope.courses = courses;
        //     var i;
        //     for (i = 0; i < $scope.courses.length; i++){
        //         createMarker($scope.courses[i]);
        //     }
        // });

        // getPlacesService.getPlaces(function(places) {
        //     $scope.places = places;
        //     var i;
        //     for (i=0;i<$scope.places.length;i++){
        //         createMarker($scope.places[i]);
        //     }
        // });

        // $scope.mapOptions = {
        //   center: new google.maps.LatLng(39.1059,-94.57441),
        //   zoom: 16,
        //   mapTypeControl: true,
        //   mapTypeControlOptions: {
        //     style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        //     mapTypeIds: [
        //       google.maps.MapTypeId.ROADMAP,
        //       google.maps.MapTypeId.TERRAIN
        //     ]
        //   }
        // };

        // (function () {





        // })(navigator.geolocation);


         // var currentPosition;
         // function returnCurrentLocation () {
         //    return currentPosition;
         // }



         // (function () {

            //   var currentGeoposition;

            //   function returnCurrentGeoposition () {
            //     return currentGeoposition;
            //   };
            $scope.geolocationAvailable = navigator.geolocation ? true : false;

            console.log("?");
            console.log($scope.geolocationAvailable);

            $scope.visitorLocation = function () {
              var browserSupportFlag;
              if($scope.geolocationAvailable) {
                browserSupportFlag = true;
                navigator.geolocation.getCurrentPosition(function(position) {
                  console.log("**Logging inside navigator.geolocation getter");
                  // console.log(position);
                  $scope.center = position.coords;
                  $scope.$apply();
                  console.log($scope.center);
                  // console.log(position.coords.latitude + " " + position.coords.longitude);
                  // $scope.map.setCenter(currentPosition);
                  // setVisitorMarker(position.coords);
                  // $scope.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
                  // new google.maps.Marker({position: {lat: position.coords.latitude, lng: position.coords.longitude}, map: $scope.map});
                }, function() {
                  handleNoGeolocation(browserSupportFlag);
                });
              } else {
                browserSupportFlag = false;
                handleNoGeolocation(browserSupportFlag);
              }
          };










            // function getGeolocation(){
            //     return currentPosition;
            // }

            // getGeolocation();


            // console.log("currentPosition:");
            // currentPosition = returnCurrentLocation();
            // console.log(currentPosition);
         // })();






        // var currentPosition = function() {
        // var currentPosition;

        // (function () {
        //   if(navigator.geolocation) {
        //     browserSupportFlag = true;
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //       console.log("Logging navigator.geolocation position inside function scope");
        //       console.log(position);
        //       currentPosition = position.coords;
        //       // console.log(position.coords.latitude + " " + position.coords.longitude);
        //       // $scope.map.setCenter(currentPosition);
        //       // setVisitorMarker(position.coords);
        //       $scope.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        //       new google.maps.Marker({position: {lat: position.coords.latitude, lng: position.coords.longitude}, map: $scope.map});

        //     }, function() {
        //       handleNoGeolocation(browserSupportFlag);
        //     });
        //   } else {
        //     browserSupportFlag = false;
        //     handleNoGeolocation(browserSupportFlag);
        //   }
        // })();

        // var siteVisitorLocation;
        // function getLocation() {
        //   var siteVisitor = locateSiteVisitor();
        //   function locateSiteVisitor() {
        //     console.log("site visitor lcoation function");
        //     if (navigator.geolocation) {
        //       navigator.geolocation.getCurrentPosition(function(position) {
        //         console.log("coords");
        //         console.log(position.coords);
        //       })
        //     } else {
        //       return "nil";
        //     }
        //         // console.log(position.coords.latitude + " " + position.coords.longitude);
        //         // $scope.map.setCenter(currentPosition);
        //         // setVisitorMarker(position.coords);
        //         // $scope.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
        //         // new google.maps.Marker({position: {lat: position.coords.latitude, lng: position.coords.
        //   }
        //   console.log("return");
        //   console.log(siteVisitorLocation);
        //   return siteVisitorLocation;
        // }

        // var currentPosition = getLocation();
        // console.log("Log currentPosition outside scope");
        // console.log(currentPosition);

        // currentPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

        // $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);


        // $scope.addMarker = function ($event, $params) {
        //   $scope.myMarkers.push(new google.maps.Marker({
        //     map: $scope.myMap,
        //     position: $params[0].latLng
        //   }));
        // };

        // $scope.setZoomMessage = function (zoom) {
        //   $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
        //   console.log(zoom, 'zoomed');
        // };

        // $scope.openMarkerInfo = function (marker) {
        //   $scope.currentMarker = marker;
        //   $scope.currentMarkerLat = marker.getPosition().lat();
        //   $scope.currentMarkerLng = marker.getPosition().lng();
        //   $scope.myInfoWindow.open($scope.myMap, marker);
        // };

        // $scope.setMarkerPosition = function (marker, lat, lng) {
        //   marker.setPosition(new google.maps.LatLng(lat, lng));
        // };











        // };

        // if(navigator.geolocation) {
        //   browserSupportFlag = true;
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     // $scope.currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        //     // return $scope.currentLocation;
        //     console.log("Log initialLocation");
        //     console.log(position.coords.latitude + " " + position.coords.longitude);
        //     // $scope.map.setCenter($scope.currentLocation);
        //     // setVisitorMarker(position.coords);
        //   }, function() {
        //     handleNoGeolocation(browserSupportFlag);
        //   });
        // } else {
        //   browserSupportFlag = false;
        //   handleNoGeolocation(browserSupportFlag);
        // }

        // console.log(currentPosition);
        // var cl = $scope.currentLocation;
        // console.log(cl);

              // function handleNoGeolocation(errorFlag) {

              //   if (errorFlag == true) {
              //     alert("Geolocation service failed.");
              //     initialLocation = sprintCenter;
              //   } else {
              //     alert("Your browser doesn't support geolocation.");
              //     initialLocation = sprintCenter;
              //   }
              //   map.setCenter(initialLocation);

              // }









            // var setIcon = function(obj) {
            //     if (obj.iconMatcher === "day") {
            //         return $scope.icons.dayTraining;
            //     } else if (obj.iconMatcher === "evening") {
            //         return $scope.icons.nightTraining;
            //     } else if (obj.iconMatcher === "publicWifi") {
            //         return $scope.icons.publicWifi;
            //     } else if (obj.iconMatcher === "customerWifi") {
            //         return $scope.icons.customerWifi;
            //     } else if (obj.iconMatcher === "pcAccess") {
            //         return $scope.icons.publicAccess;
            //     } else if (obj.iconMatcher === "pcResale") {
            //         return $scope.icons.retailPcs;
            //     } else {
            //         return $scope.icons.siteVisitor;
            //     }
            // }


            // var request = {
            //     location: pyrmont,
            //     radius: '500',
            //     types: ['store']
            //   };

            // $scope.service = new google.maps.places.PlacesService($scope.map);
            // // $scope.service.nearbySearch(request, callback);

            // var viewport = new google.maps.InfoWindow();

            // var service = new google.maps.places.PlacesService($scope.map);

            // console.log("$scope.map");
            // console.log($scope.map);

            // $scope.service.nearbySearch({
            //   location: pyrmont,
            //   radius: 500,
            //   type: ['store']
            // }, callback);

            // var setVisitorMarker = function(loc){
            //   console.log('loc');
            //   console.log(loc);
            //   // var marker = new google.maps.Marker({
            //   //       map: $scope.map,
            //   //       position: new google.maps.LatLng(loc.latitude, loc.longitude),
            //   //       icon: setIcon(loc)
            //   //   });

            //   // $scope.mapMarkers.push(marker);
            // };

            //  var createMarker = function (info) {
            //     var marker = new google.maps.Marker({
            //         map: $scope.map,
            //         position: new google.maps.LatLng(info.lat, info.lng),
            //         title: info.title,
            //         icon: setIcon(info),
            //         caption: info.caption
            //     });

            //     // console.log("creating new marker*******");
            //     // console.log($scope.icons.courses.day.path);
            //     // var marker = new Marker({
            //     //   map: $scope.map,
            //     //   position: new google.maps.LatLng(info.lat,info.lng),
            //     //   icon: {
            //     //     path: $scope.icons.dayCourse,
            //     //     fillColor: '#00CCBB',
            //     //     fillOpacity: 1,
            //     //     strokeColor: '',
            //     //     strokeWeight: 0
            //     //   },
            //     //   map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
            //     // });

            //     // console.log("*marker");
            //     // console.log(marker);

            //     marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';

            //     google.maps.event.addListener(marker, 'click', function(){
            //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            //         infoWindow.open($scope.map, marker);
            //     });

            //     $scope.mapMarkers.push(marker);

            // }

            // $scope.openInfoWindow = function(e, selectedMarker){
            //     e.preventDefault();
            //     google.maps.event.trigger(selectedMarker, 'click');
            // }
    }
]);