'use strict';

// function onGoogleReady() {
//   angular.bootstrap(document.getElementById("customMap"), ['core.map']);
// }

angular.module('core.map').controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'courseIndexService',  'placeIndexService', '$location',

    function ($scope, $timeout, $http, $state, $stateParams, Authentication, courseIndexService, placeIndexService, $location) {

            courseIndexService.getCourses(function(courses) {
                $scope.courses = courses;
                var i;
                for (i = 0; i < $scope.courses.length; i++){
                    console.log("bubonic rat plague black lungs more ashes blacker lungs death");
                    console.log($scope.courses[i]);
                    createMarker($scope.courses[i]);
                }
            });

            placeIndexService.getPlaces(function(places) {
                $scope.places = places;
                var i;
                for (i=0;i<$scope.places.length;i++){
                    createMarker($scope.places[i]);
                }
            });

            // $http({
            //     method: 'GET',
            //     url: '/api/courses'
            // }).then(function successCallback(response) {
            //     $scope.panelData = response.data;
            //     angular.forEach($scope.panelData, function(item){
            //     console.log("log title =>");
            //     console.log(item.title);
            //     console.log("lat: " + item.lat + " lng: " + item.lng );
            //     });

                // var self = this;
                // var data = response.data;
                // self.tableParams = new NgTableParams({}, { dataset: data});

            //     return response.data;
            // }, function errorCallback(response) {
            //     console.log("error");
            //     return response.status;
            // });

            $scope.mapMarkers = [];

            $scope.mapOptions = {
              center: new google.maps.LatLng(39.1059,-94.57441),
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var initialLocation;


            if(navigator.geolocation) {
                browserSupportFlag = true;
                navigator.geolocation.getCurrentPosition(function(position) {
                  initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                  $scope.map.setCenter(initialLocation);
                }, function() {
                  handleNoGeolocation(browserSupportFlag);
                });
              }
              else {
                browserSupportFlag = false;
                handleNoGeolocation(browserSupportFlag);
              }

              // function handleNoGeolocation(errorFlag) {
              //   if (errorFlag == true) {
              //     alert("Geolocation service failed.");
              //     initialLocation = newyork;
              //   } else {
              //     alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
              //     initialLocation = siberia;
              //   }
              //   map.setCenter(initialLocation);
              // }



            $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);

            var infoWindow = new google.maps.InfoWindow();

            var browserSupportFlag =  new Boolean();

            var setIcon = function(obj) {
                if (obj.iconMatcher === "day") {
                    console.log('day');
                    return { path: 'M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z', fillColor: 'orange', fillOpacity: 0.8, scale: 1.25, strokeColor: 'orange', strokeWeight: 2 };
                } else if (obj.iconMatcher === "evening") {
                    console.log('evening');
                    return {path: 'M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z', fillColor: 'navy', fillOpacity: 0.8, scale: 1.25, strokeColor: 'navy', strokeWeight: 2};
                } else if (obj.iconMatcher === "publicWifi") {
                    console.log('pubWifi');
                    return {path: 'M6.337,7.247c-0.391-0.391-1.023-0.391-1.414,0l0.708,0.708L6.337,7.247z', fillColor: 'green', fillOpacity: 0.8, scale: 15, strokeColor: 'green', strokeWeight: .52};
                } else if (obj.iconMatcher === "customerWifi") {
                    console.logI(" ");
                    return {path: 'M6.337,7.247c-0.391-0.391-1.023-0.391-1.414,0l0.708,0.708L6.337,7.247z', fillColor: 'black', fillOpacity: 0.8, scale: 15, strokeColor: 'black', strokeWeight: .52};
                } else if (obj.iconMatcher === "pcAccess") {
                    console.log("computer access");
                    return {path: 'M448,48v256H64V48H448 M448,16H64c-17.688,0-32,14.328-32,32v256c0,17.688,14.313,32,32,32h384c17.688,0,32-14.313,32-32V48C480,30.328,465.688,16,448,16L448,16z M480,344H32L0,440h512L480,344z M58.813,360h394.344l19.219,64H39.625L58.813,360z M0,448v16c0,17.688,14.313,32,32,32h448c17.688,0,32-14.313,32-32v-16H0z M400,488c-8.844,0-16-7.156-16-16s7.156-16,16-16s16,7.156,16,16S408.844,488,400,488z M464,488c-8.844,0-16-7.156-16-16s7.156-16,16-16s16,7.156,16,16S472.844,488,464,488z', fillColor: 'black', fillOpacity: 0.99, scale: .05, strokeColor: 'black', strokeWeight: .52 };
                } else if (obj.iconMatcher === "pcResale") {
                    console.log("computer resale");
                    return {path: 'M267.922,351.734V384h-25.719v-30.406c-19.516-0.609-39.047-6.25-50.203-13.469l8.375-29.766c12.406,7.531,29.438,13.781,48.344,13.781c19.812,0,33.141-9.703,33.141-24.438c0-14.391-10.828-23.156-34.078-31.641c-32.219-11.906-53.609-27.25-53.609-56.094c0-26.938,18.609-47.938,49.891-53.562V128h25.406v28.828c19.516,0.625,32.859,5.641,42.781,10.656l-8.375,28.828c-7.438-3.75-21.078-10.969-42.141-10.969c-21.703,0-29.453,11.281-29.453,21.938c0,12.844,11.156,20.359,37.812,30.719C304.797,251.156,320,268.062,320,296.281C320,322.922,301.703,346.094,267.922,351.734z', fillColor: 'black', fillOpacity: 1, scale: .085, strokeColor: 'black', strokeWeight: .82};
                } else {
                    console.log("no matches");
                }
            }

             var createMarker = function (info) {
                console.log("Log createMarker(info)");
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.lng),
                    title: info.title,
                    icon: setIcon(info),
                    caption: info.caption
                });
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
    }
]);