'use strict';

// function onGoogleReady() {
//   angular.bootstrap(document.getElementById("customMap"), ['core.map']);
// }

angular.module('core.map').controller('GeolocationController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.authentication = Authentication;



    // var siteVisitor, id, options;

    // function success(pos) {
    //   var crd = pos.coords;

    //   if (siteVisitor.latitude === crd.latitude && siteVisitor.longitude === crd.longitude) {
    //     console.log('Congratulations, you reached the siteVisitor');
    //     navigator.geolocation.clearWatch(id);
    //   }
    // }

    // function error(err) {
    //   console.warn('ERROR(' + err.code + '): ' + err.message);
    // }

    // siteVisitor = {
    //   latitude : 0,
    //   longitude: 0
    // };

    // options = {
    //   enableHighAccuracy: false,
    //   timeout: 5000,
    //   maximumAge: 0
    // };

    // id = navigator.geolocation.watchPosition(success, error, options);












    // var browserSupportFlag =  new Boolean();
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

    // function geo_success(position) {
    //   var lat = position.coords.latitude;
    //   var lng = position.coords.longitude;
    //   // function(lat,lng) {
    //   //   var this.pos = {lat:lat, lng:lng};
    //   // };
    //   // console.log('success');
    //   // console.log(this);
    // }

    // function geo_error() {
    //   alert("Sorry, no position available.");
    // }

    // var geo_options = {
    //   enableHighAccuracy: true,
    //   maximumAge        : 30000,
    //   timeout           : 27000
    // };

    // var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

    $scope.icons = {
      dayTraining: {path:'M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z', fillColor: 'orange', fillOpacity: .9, scale: 1.45, strokeColor: 'orange', strokeWeight: 1.41},
      nightTraining: {path:'M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z', fillColor: 'navy', fillOpacity: 0.8, scale: 1.25, strokeColor: 'navy', strokeWeight: 2},
      publicWifi: {path:'M6.337,7.247c-0.391-0.391-1.023-0.391-1.414,0l0.708,0.708L6.337,7.247z', fillColor: 'green', fillOpacity: 0.8, scale: 25, strokeColor: 'darkgreen', strokeWeight: 1.52},
      customerWifi:  {path: 'M6.337,7.247c-0.391-0.391-1.023-0.391-1.414,0l0.708,0.708L6.337,7.247z', fillColor: 'black', fillOpacity: 0.8, scale: 15, strokeColor: 'black', strokeWeight: .52},
      publicAccess: {path:'M448,48v256H64V48H448 M448,16H64c-17.688,0-32,14.328-32,32v256c0,17.688,14.313,32,32,32h384c17.688,0,32-14.313,32-32V48C480,30.328,465.688,16,448,16L448,16z M480,344H32L0,440h512L480,344z M58.813,360h394.344l19.219,64H39.625L58.813,360z M0,448v16c0,17.688,14.313,32,32,32h448c17.688,0,32-14.313,32-32v-16H0z M400,488c-8.844,0-16-7.156-16-16s7.156-16,16-16s16,7.156,16,16S408.844,488,400,488z M464,488c-8.844,0-16-7.156-16-16s7.156-16,16-16s16,7.156,16,16S472.844,488,464,488z', fillColor: 'black', fillOpacity: 0.99, scale: .05, strokeColor: 'black', strokeWeight: .52},
      retailPcs: {path:'M267.922,351.734V384h-25.719v-30.406c-19.516-0.609-39.047-6.25-50.203-13.469l8.375-29.766c12.406,7.531,29.438,13.781,48.344,13.781c19.812,0,33.141-9.703,33.141-24.438c0-14.391-10.828-23.156-34.078-31.641c-32.219-11.906-53.609-27.25-53.609-56.094c0-26.938,18.609-47.938,49.891-53.562V128h25.406v28.828c19.516,0.625,32.859,5.641,42.781,10.656l-8.375,28.828c-7.438-3.75-21.078-10.969-42.141-10.969c-21.703,0-29.453,11.281-29.453,21.938c0,12.844,11.156,20.359,37.812,30.719C304.797,251.156,320,268.062,320,296.281C320,322.922,301.703,346.094,267.922,351.734z', fillColor: 'black', fillOpacity: 1, scale: .085, strokeColor:'black', strokeWeight: .82},
      siteVisitor: {path:"M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z", fillColor: "navy", fillOpacity: .99, scale: .64, strokeColor: 'navy', strokeWeight: .5}
    }

    // $scope.initialLocation = {};

    // if(navigator.geolocation) {

    //   browserSupportFlag = true;

    //   navigator.geolocation.getCurrentPosition(function(position) {

    //     $scope.initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    //     console.log("Log initialLocation in geocontroller");
    //     console.log(position.coords.latitude + " " + position.coords.longitude);
    //     // $scope.map.setCenter($scope.initialLocation);
    //     // setVisitorMarker(position.coords);

    //   }, function() {

    //     handleNoGeolocation(browserSupportFlag);

    //   });
    // }
    // else {
    //   browserSupportFlag = false;
    //   handleNoGeolocation(browserSupportFlag);
    // }

    // function handleNoGeolocation(errorFlag) {

    //   if (errorFlag == true) {
    //     alert("Geolocation service failed.");
    //     $scope.initialLocation = sprintCenter;
    //   } else {
    //     alert("Your browser doesn't support geolocation.");
    //     $scope.initialLocation = sprintCenter;
    //   }
    //   // map.setCenter($scope.initialLocation);

    // }



    // $scope.icons = {

    //   courses: {
    //               day: {
    //                      path: 'SQUARE_PIN',
    //                      css: 'map-icon-point-of-interest'
    //                    },
    //               night: {
    //                       path: 'SQUARE_PIN',
    //                       css: 'map-icon-point-of-interest'
    //                      }
    //            },

    //   wifi: {

    //          open: {
    //                  path: 'SQUARE_PIN',
    //                  css:  'map-icon-point-of-interest'
    //                },

    //          customer: {
    //                     path: 'SQUARE_PIN',
    //                     css:  'map-icon-point-of-interest'
    //                    }

    //         },

    //   pc: {
    //        access: {
    //                 path: 'SQUARE_PIN',
    //                 css:  'map-icon-point-of-interest'
    //                },
    //        refurbished: {
    //                      path: 'SQUARE_PIN',
    //                      css:  'map-icon-point-of-interest'
    //                     }
    //       },

    //  site: {
    //          visitor: {
    //             path: 'SQUARE_PIN',
    //             css: 'map-icon-point-of-interest'
    //          }
    //         }
    // };


  }
]);
