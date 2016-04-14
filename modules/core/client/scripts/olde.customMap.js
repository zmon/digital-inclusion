"use strict";
angular.module('CustomMap', ['uiGmapgoogle-maps'])
.config(function(uiGmapGoogleMapApiProvider) {
 uiGmapGoogleMapApiProvider.configure({
  key: 'AIzaSyC8JLiD8m3R3_0cnjdaNy2hQ26irjAxA7E',
  v: '3.17',
  libraries: 'weather,geometry,visualization'
 });
})
.controller("MapController", function($scope, uiGmapGoogleMapApi) {
  // Define variables for our Map object
  var areaLat      = 44.2126995,
      areaLng      = -100.2471641,
      areaZoom     = 3;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
  });

});