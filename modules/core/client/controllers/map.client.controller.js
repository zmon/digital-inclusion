'use strict';
function onGoogleReady() {
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}
angular.module('core.map').controller('MapController', ['$scope', '$timeout',
  function ($scope, $timeout) {

    // var freeWifiSvg = { path: 'M6.337,7.247c-0.391-0.391-1.023-0.391-1.414,0l0.708,0.708L6.337,7.247z', fillColor: 'green', fillOpacity: 0.8, scale: 15, strokeColor: 'green', strokeWeight: .52};

    $scope.mapMarkers = [ ];
    $scope.mapOptions = {
      center: new google.maps.LatLng(39.1059,-94.57441),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    //  var circle = new google.maps.Circle({
    //     center: $scope.mapOp,
    //     map: map,
    //     fillColor: '#0000FF',
    //     fillOpacity: 0.5,
    //     strokeColor: '#0000FF',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2,
    //     draggable: true,
    //     zIndex: 30
    // });

    // circle.setRadius(18362.55489862987);

    // map.fitBounds(circle.getBounds());

    // var labelText = '<div style="color: #FFF">Text goes here</div>';


    // var cloudLayer = new google.maps.weather.CloudLayer();

    // $timeout(function(){
    //   cloudLayer.setMap($scope.customMap);
    // }, 1000);

// place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            $scope.mapMarkers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }


    }
]);
