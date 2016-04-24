'use strict';

function onGoogleReady() {
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}

angular.module('core.map').controller('GeoController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.authentication = Authentication;
    console.log("works like a CHARM");




    // var sprintCenter = new google.maps.LatLng(39.097951,-94.616262);
    // var kcDigDrv = new google.maps.LatLng(39.101983,-94.584735);




  }
]);
