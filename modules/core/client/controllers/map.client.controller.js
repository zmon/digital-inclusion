'use strict';

function onGoogleReady() {
  console.log("Google APIs init");
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
}

angular.module('core.map').controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'getCoursesService',  'getPlacesService', '$location',
    function ($scope, $timeout, $http, $state, $stateParams, Authentication, getCoursesService, getPlacesService, $location) {


        var MAP_PIN = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
        var SQUARE_PIN = 'M22-48h-44v43h16l6 5 6-5h16z';
        var SHIELD = 'M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z';
        var ROUTE = 'M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z';
        var SQUARE = 'M-24-48h48v48h-48z';
        var SQUARE_ROUNDED = 'M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z';

        // Function to do the inheritance properly
        // Inspired by: http://stackoverflow.com/questions/9812783/cannot-inherit-google-maps-map-v3-in-my-custom-class-javascript
        var inherits = function(childCtor, parentCtor) {
            /** @constructor */
            function tempCtor() {};
            tempCtor.prototype = parentCtor.prototype;
            childCtor.superClass_ = parentCtor.prototype;
            childCtor.prototype = new tempCtor();
            childCtor.prototype.constructor = childCtor;
        };

        function Marker(options){
            google.maps.Marker.apply(this, arguments);

            if (options.map_icon_label) {
                this.MarkerLabel = new MarkerLabel({
                    map: this.map,
                    marker: this,
                    text: options.map_icon_label
                });
                this.MarkerLabel.bindTo('position', this, 'position');
            }
        }

        // Apply the inheritance
        inherits(Marker, google.maps.Marker);

        // Custom Marker SetMap
        Marker.prototype.setMap = function() {
            google.maps.Marker.prototype.setMap.apply(this, arguments);
            (this.MarkerLabel) && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments);
        };

        // Marker Label Overlay
        var MarkerLabel = function(options) {
            var self = this;
            this.setValues(options);

            // Create the label container
            this.div = document.createElement('div');
            this.div.className = 'map-icon-label';

            // Trigger the marker click handler if clicking on the label
            google.maps.event.addDomListener(this.div, 'click', function(e){
                (e.stopPropagation) && e.stopPropagation();
                google.maps.event.trigger(self.marker, 'click');
            });
        };

        // Create MarkerLabel Object
        MarkerLabel.prototype = new google.maps.OverlayView;

        // Marker Label onAdd
        MarkerLabel.prototype.onAdd = function() {
            var pane = this.getPanes().overlayImage.appendChild(this.div);
            var self = this;

            this.listeners = [
                google.maps.event.addListener(this, 'position_changed', function() { self.draw(); }),
                google.maps.event.addListener(this, 'text_changed', function() { self.draw(); }),
                google.maps.event.addListener(this, 'zindex_changed', function() { self.draw(); })
            ];
        };

        // Marker Label onRemove
        MarkerLabel.prototype.onRemove = function() {
            this.div.parentNode.removeChild(this.div);

            for (var i = 0, I = this.listeners.length; i < I; ++i) {
                google.maps.event.removeListener(this.listeners[i]);
            }
        };

        // Implement draw
        MarkerLabel.prototype.draw = function() {
            var projection = this.getProjection();
            var position = projection.fromLatLngToDivPixel(this.get('position'));
            var div = this.div;

            this.div.innerHTML = this.get('text').toString();

            div.style.zIndex = this.get('zIndex'); // Allow label to overlay marker
            div.style.position = 'absolute';
            div.style.display = 'block';
            div.style.left = (position.x - (div.offsetWidth / 2)) + 'px';
            div.style.top = (position.y - div.offsetHeight) + 'px';

        };

        // getCoursesService.getCourses(function(courses) {
        //   $scope.courses = courses;

        //     var i;
        //     for (i = 0; i < $scope.courses.length; i++){
        //         console.log($scope.courses[i]);
        //         createMarker($scope.courses[i]);
        //     }
        // });
        // console.log("scope courses");
        // console.log($scope.courses);

        // getPlacesService.getPlaces(function(places) {
        //     $scope.places = places;
        //     var i;
        //     for (i=0;i<$scope.places.length;i++){
        //         createMarker($scope.places[i]);
        //     }
        // });


        var infoWindow = new google.maps.InfoWindow();
        $scope.browserSupportFlag =  new Boolean();
        $scope.courses = [];
        $scope.hotspots = [];
        $scope.mapMarkers = [];
        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        // $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);
        // $scope.model = { myMap: $scope.map};
        $scope.siteVisitor, $scope.id;
        $scope.watchOptions;

        $scope.success = function (pos) {
          var crd = pos.coords;

          if ($scope.visitor.latitude === crd.latitude && $scope.visitor.longitude === crd.longitude) {
            console.log('$scope.visitor');
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


        $scope.showMap = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.mapOptions = {
                center: {lat: $scope.lat, lng: $scope.lng},
                zoom: 11,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);
            $scope.visitor = new google.maps.Marker({
                                                      map: $scope.map,
                                                      position: new google.maps.LatLng($scope.lat, $scope.lng)
                                                   });
            getCoursesService.getCourses(function(courses) {
              $scope.courses = courses;
                var i;
                for (i = 0; i < $scope.courses.length; i++){
                    console.log('8883838838338383838');
                    console.log($scope.courses[i]);
                    if ($scope.courses[i].iconMatcher==='day'){
                        console.log("if a");
                        createDayCourseMarker($scope.courses[i]);
                    } else if ($scope.courses[i].iconMatcher==='evening') {
                        console.log("else if b");
                        createEveningCourseMarker($scope.courses[i]);
                    } else {
                        console.log('noooomathch');
                    }

                }
            });

            getPlacesService.getPlaces(function(places) {
                $scope.places = places;
                var i;
                for (i=0;i<$scope.places.length;i++){
                    createPublicWifiMarker($scope.places[i]);
                }
            });

            $scope.$apply();
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

        $scope.setIcon = function(obj) {
            console.log("seticon");
            console.log(obj);
            if (obj === "day") {
                return $scope.icons.dayTraining;
            } else if (obj === "evening") {
                return $scope.icons.nightTraining;
            } else if (obj === "publicWifi") {
                console.log("&matched=>publicWifi");
                console.log($scope.icons.publicWifi);
                return $scope.icons.publicWifi;
            } else if (obj === "customerWifi") {
                return $scope.icons.customerWifi;
            } else if (obj === "pcAccess") {
                return $scope.icons.publicAccess;
            } else if (obj === "pcResale") {
                return $scope.icons.retailPcs;
            } else {
                return $scope.icons.siteVisitor;
            }
            $scope.$apply();
        }

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                console.log("supported");
                navigator.geolocation.getCurrentPosition($scope.showMap, $scope.showError);
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
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption
            });
            marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.mapMarkers.push(marker);
        }

        var createDayCourseMarker = function(info) {
            var marker = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption,
                icon: {
                    path: MAP_PIN,
                    fillColor: '#00CCBB',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0
                },
                map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
            });
            marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.mapMarkers.push(marker);
        }

        var createEveningCourseMarker = function(info) {
            var marker = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption,
                icon: {
                    path: MAP_PIN,
                    fillColor: '#00CCBB',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0
                },
                map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
            });
            marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.mapMarkers.push(marker);
        }

        var createPublicWifiMarker = function(info) {
            var marker = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption,
                icon: {
                    path: MAP_PIN,
                    fillColor: 'transparent',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0
                },
                map_icon_label: '<span class="map-icon map-icon-map-pin mil-green"></span>'
                // map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
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

        $scope.getLocation();

    }
]);