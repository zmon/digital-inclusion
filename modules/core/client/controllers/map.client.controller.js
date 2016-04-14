'use strict';
function onGoogleReady() {
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}
angular.module('core.map').controller('MapController', ['$scope', '$timeout',
  function ($scope, $timeout) {

    $scope.mapMarkers = [];
    $scope.mapOptions = {
      center: new google.maps.LatLng(37.782,-122.418),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    // var cloudLayer = new google.maps.weather.CloudLayer();

    // $timeout(function(){
    //   cloudLayer.setMap($scope.customMap);
    // }, 1000);
}
]);
