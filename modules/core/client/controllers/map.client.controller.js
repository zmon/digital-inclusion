'use strict';
function onGoogleReady() {
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}
angular.module('core.map').controller('MapController', ['$scope', '$timeout',
  function ($scope, $timeout) {

    $scope.mapMarkers = [];
    $scope.mapOptions = {
      center: new google.maps.LatLng(39.1059,-94.57441),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // var cloudLayer = new google.maps.weather.CloudLayer();

    // $timeout(function(){
    //   cloudLayer.setMap($scope.customMap);
    // }, 1000);
}
]);
