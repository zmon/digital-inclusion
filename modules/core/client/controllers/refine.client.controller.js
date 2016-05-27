'use strict';

var showMarkers = {
                    trainingClasses: new Boolean(),
                    computerRetail: new Boolean(),
                    freeWifi: new Boolean(),
                    customerWifi: new Boolean()
                  };
// showMarkers.
// showMarkers.freeWifi = new Boolean();
// showMarkers.nightClasses = new Boolean();

function onGoogleReady() {
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
  showMarkers.freeWifi = true;
}

angular.module('core.map', ['ngResource']).controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'getCoursesService',  'getPlacesService', '$location',
    function ($scope, $timeout, $http, $state, $stateParams, Authentication, getCoursesService, getPlacesService, $location) {
      console.log("init toggle vals:");
      console.log(showMarkers.trainingClasses);
      console.log(showMarkers.computerRetail);
      console.log(showMarkers.freeWifi);
      console.log(showMarkers.customerWifi);
      var fuckShitUp = angular.element(document.getElementById("tgz4"));
      console.log("no $$ y r u a loser " + fuckShitUp);
      // set button background colors with css classes
      var pattern1 = new RegExp("norm");
      var pattern2 = new RegExp("highlighted");

      fuckShitUp.on('click', function(event) {
        console.log('looking up');
        // parent
        var cqP = event.toElement.className;
        // child
        var cqC = event.target.parentElement.className;
        // console.log("event");
        // console.log(event);

        // console.log(cqC);
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          console.log("maybe then");
          fuckShitUp.removeClass('norm');
          fuckShitUp.addClass('highlighted');
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          console.log("then again maybe");
          fuckShitUp.removeClass('highlighted');
          fuckShitUp.addClass('norm');
        } else {
          console.log("throw err or do something else");
        }
      });


      var suckShitUp = angular.element(document.getElementById("tgz3"));
      suckShitUp.on('click', function(event) {
        console.log('fucking shit up');
        // parent
        var cqP = event.toElement.className;
        console.log("cqP");
        console.log(event);
        // child
        var cqC = event.target.parentElement.className;
        // console.log("event");
        // console.log(event);

        // console.log(cqC);
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          console.log("maybe then");
          suckShitUp.removeClass('norm');
          suckShitUp.addClass('highlighted');
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          console.log("then again maybe");
          suckShitUp.removeClass('highlighted');
          suckShitUp.addClass('norm');
        } else {
          console.log("throw err or do something else");
        }
      });

      var muckShitUp = angular.element(document.getElementById("tgz2"));
      muckShitUp.on('click', function(event) {
        console.log('fucking shit up');
        // parent
        var cqP = event.toElement.className;
        console.log("cqP");
        console.log(event);
        // child
        var cqC = event.target.parentElement.className;
        // console.log("event");
        // console.log(event);

        // console.log(cqC);
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          console.log("maybe then");
          muckShitUp.removeClass('norm');
          muckShitUp.addClass('highlighted');
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          console.log("then again maybe");
          muckShitUp.removeClass('highlighted');
          muckShitUp.addClass('norm');
        } else {
          console.log("throw err or do something else");
        }
      });

      var lookUp = angular.element(document.getElementById("tgz1"));
      lookUp.on('click', function(event) {
        console.log('fucking shit up');
        // parent
        var cqP = event.toElement.className;
        console.log("cqP");
        console.log(event);
        // child
        var cqC = event.target.parentElement.className;
        // console.log("event");
        // console.log(event);

        // console.log(cqC);
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          console.log("maybe then");
          lookUp.removeClass('norm');
          lookUp.addClass('highlighted');
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          console.log("then again maybe");
          lookUp.removeClass('highlighted');
          lookUp.addClass('norm');
        } else {
          console.log("throw err or do something else");
        }
      });





      // function ajaxResultPost(data, type, res) {
      //     var scope = angular.element(
      //     document.
      //     getElementById("MainWrap")).
      //     scope();
      //     scope.$apply(function () {
      //         scope.updateCustomRequest(data, type, res);
      //     });
      // }

        var ctrl = this;
        ctrl.clickity = function(log) {
          console.log("nohihi :(");
        }
        // '
        // .norm {
        //   bavckground: #F0EFEF;
        // }
        // .highlighted {
        //   background: #DDF0FF;
        // }
        // ';
        var proverreactive = "norm";
        // var overreactive = '#DDF0FF';
        var overreactive = "highlighted";
        // element.removeClass(thisCss);
        // element.addClass(cssSetter);

        $scope.whippingBoy = function(fnName) {
          console.log(fnName);
          if (fnName === "freeWifi") {
            console.log("Case: freeWifi");
          } else if (fnName === "customerWifi") {
            console.log("Case: customerWifi")
          } else if (fnName === "dayClasses") {
            console.log("Case: dayClasses")
          } else if (fnName === "eveningClasses") {
            console.log("Case: eveningClasses");
            console.log(fuckShitUp);
            // fuckShitUp.removeClass(proverreactive);
            // fuckShitUp.addClass(overreactive);
          }
        };




        $scope.hello = function(name) {
          console.log(name);
            // alert('Hello ' + (name || 'world') + '!');
        }



        // var showMarkers = function(markers) {

        // };



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


           $scope.clickMe = function(clickEvent) {
              console.log("poidfuh");
              // $scope.clickEvent = simpleKeys(clickEvent);
              console.log(clickEvent);
            };
            $scope.pickMe = function(clickEvent) {
              // $scope.clickEvent = simpleKeys(clickEvent);
              console.log(clickEvent);
            };


             // * return a copy of an object with only non-object keys
             // * we need this to avoid circular references

            // function simpleKeys (original) {
            //   return Object.keys(original).reduce(function (obj, key) {
            //     obj[key] = typeof original[key] === 'object' ? '{ '...' }' : original[key];
            //     return obj;
            //   }, {});
            // }


        // $scope.loadGeoJsonString = function(geoString) {
        //   var geojson = JSON.parse(geoString);
        //   map.data.addGeoJson(geojson);
        //   zoom(map);
        // };
// Create a <script> tag and set the USGS URL as the source.
    // var script = document.createElement('script');

    // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
    // document.getElementsByTagName('head')[0].appendChild(script);


            // $scope.clickMe = function(clickEvent) {
            //   // $scope.clickEvent = simpleKeys(clickEvent);
            //   console.log(clickEvent);
            // };


             // * return a copy of an object with only non-object keys
             // * we need this to avoid circular references

            // function simpleKeys (original) {
            //   return Object.keys(original).reduce(function (obj, key) {
            //     obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key];
            //     return obj;
            //   }, {});
            // }

        $scope.showMap = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.mapOptions = {
                center: {lat: $scope.lat, lng: $scope.lng},
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);
            console.log("****$scope.map");
            console.log($scope.map);
               var iconoriginx = null;
                var iconoriginy = null;
                var iconSize = new google.maps.Size(30, 30);
                var iconAnchor = new google.maps.Point(15, 30);
            // var iconScaledSize = ;


            // var rico: {
            //         path: MAP_PIN,
            //         fillColor: 'transparent',
            //         fillOpacity: 1,
            //         strokeColor: 'orange',
            //         strokeWeight: 0.75
            //     },
            //     map_icon_label: '<span class="map-icon map-icon-library"></span>'

            // var cl = {
            //           url: '/modules/core/client/img/lm.ico',
            //           size: new google.maps.Size(32, 32),
            //           origin: new google.maps.Point(0, 0),
            //           anchor: new google.maps.Point(0, 6),
            //           scaledSize: new google.maps.Size(30, 30)
            //          };

            // $scope.visitor = new Marker({
            //                               map: $scope.map,
            //                               position: new google.maps.LatLng($scope.lat, $scope.lng),
            //                               icon: rico
            //                            });

            $scope.visitor = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng($scope.lat, $scope.lng),
                icon: {
                    path: MAP_PIN,
                    fillColor: '#EAF0F0',
                    fillOpacity: 1,
                    strokeColor: '#B8BDBD',
                    strokeWeight: 1.165
                },
                map_icon_label: '<span class="map-icon"></span>'
            });

            // $scope.map.data.loadGeoJson('./map-data/data.json');
            // getCoursesService.getCourses(function(courses) {
            //   $scope.courses = courses;
            //     var i;
            //     for (i = 0; i < $scope.courses.length; i++){
            //         console.log('8883838838338383838');
            //         console.log($scope.courses[i]);
            //         if ($scope.courses[i].iconMatcher==='day'){
            //             console.log("if a");
            //             createDayCourseMarker($scope.courses[i]);
            //         } else if ($scope.courses[i].iconMatcher==='evening') {
            //             console.log("else if b");
            //             createEveningCourseMarker($scope.courses[i]);
            //         } else {
            //             console.log('noooomathch');
            //         }

            //     }
            // });

            // getPlacesService.getPlaces(function(places) {
            //     $scope.places = places;
            //     var i;
            //     for (i=0;i<$scope.places.length;i++){
            //         createPublicWifiMarker($scope.places[i]);
            //     }
            // });

             // $timeout(function() {
             //    cloudLayer.setMap($scope.myMap);
             //  }, 1000);
             //  $scope.addMarker = function($event, $params) {
             //    $scope.myMarkers.push(new google.maps.Marker({ map: $scope.myMap, position: $params[0]. latLng }));
             //  };
             //  $scope.eventBinding = {'map-click': 'addMarker($event, $params)'};

       //  $scope.master = {};

       // $scope.update = function(map) {
       //    $scope.master = angular.copy(map);
       //  };

       //  $scope.reset = function() {
       //    $scope.map = angular.copy($scope.master);
       //  };

           //  $scope.reset();





           var image = {
                        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                        size: new google.maps.Size(20, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 32)
                       };

           $scope.togFreeWifi = $scope.map.data.loadGeoJson("modules/core/client/map-data/freeWifi.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/dayClasses.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/nightClasses.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/customerWifi.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/computerAccess.json");
           $scope.map.data.loadGeoJson("modules/core/client/map-data/computerRetail.json");
           $scope.map.data.loadGeoJson("modules/core/client/map-data/internetService.json");
           // $scope.map.data.setStyle(function(feature) {
           //      return {icon:feature.getProperty('icon')};
           // });
           $scope.map.data.setStyle(function(feature) {
                console.log("^^%%$$$  a a aa a a a a ");

                var cat = feature.H.category;
                console.log(cat);
                var iconUrl;
                if (cat === "library") {
                   iconUrl = "modules/core/client/img/wifiFree-2.png";
                } else if (cat === "dayClass") {
                    iconUrl = "modules/core/client/img/userOrange.png";
                } else if (cat === "nightClass") {
                    iconUrl = "modules/core/client/img/userBlue.png";
                } else if (cat === "wifiFree") {
                   iconUrl = "modules/core/client/img/wifiFree-2.png";
                } else if (cat === "wifiCustomer") {
                    iconUrl = "modules/core/client/img/wifiCustomerOnly.png";
                } else if (cat === "computerAccess") {
                    iconUrl = "modules/core/client/img/computerAccess.png";
                } else if (cat === "computerRetail") {
                    iconUrl = "modules/core/client/img/computerRetail.png";
                } else if (cat === "serviceVendor") {
                    iconUrl = "modules/core/client/img/internetService.png";
                } else {
                    iconUrl = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                };
                // var iconUrl = "modules/core/client/img/wifiFree-2.png";
                var iconoriginx = null;
                var iconoriginy = null;
                var iconSize = new google.maps.Size(30, 30);
                var iconAnchor = new google.maps.Point(15, 30);
                var iconScaledSize = new google.maps.Size(30, 30);
                if (feature.getProperty('iconoriginy')) {
                    iconoriginy = feature.getProperty('iconoriginy');
                    iconoriginx = feature.getProperty('iconoriginx');

                    var iconOrigin = new google.maps.Point(iconoriginx,iconoriginy);

                    }
                    return ({
                        icon: {
                            url: iconUrl,
                            size: iconSize,
                            anchor: iconAnchor,
                            origin: iconOrigin,
                            scaledSize: iconScaledSize
                        }
                    });
                });

           // $scope.map.data.setStyle(function(feature) {
           //      return {icon:feature.getProperty('size')};
           // });
           // $scope.map.data.setStyle(function(feature) {
           //      return {anchor:feature.getProperty('iconAnchor')};
           // });
           // console.log("$scope.geojson");
           // console.log($scope.map.data);

           // $scope.map.data.addListener('mouseover', function(event) {
           //    console.log("docsss");
           //    console.log(document);
           //    document.getElementById('info-box').textContent =
           //        event.feature.getProperty('letter');
           //  });


          // ng-if="googleReady"
          // showMarkers.dayClasses = true
                                                    // listener responds
                                                    // appropriately



           $scope.map.data.addListener('click', function(event) {
                //show an infowindow on click
                // console.log(event.feature.H);
                // infoWindow.setContent('<div style="line-height:1.35;overflow:hidden;white-space:nowrap;">'+
                //                             event.feature.H.name +"<br/>Feature Value = Zone " + event.feature.getProperty("value") + "</div>");
                var anchor = new google.maps.MVCObject();
                anchor.set("position",event.latLng);
                // infoWindow.open($scope.map,anchor);
                document.getElementById('info-box0').textContent = event.feature.H.category;
                document.getElementById('info-box2').textContent = event.feature.H.name;
                document.getElementById('info-box3').textContent = event.feature.H.street;
            });

            $scope.$apply();
        };




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

        var buildMarker = function (info) {

        }

        var getIcon = function(string){
            var day = {};


            if (string === 'day') {

            } else if (string === 'publicWifi') {
                return  {
                         path: MAP_PIN,
                         fillColor: 'transparent',
                         fillOpacity: 1,
                         strokeColor: '',
                         strokeWeight: 0
                        };
            } else {
                console.log("sad");
            }
        }


        var createMarker = function (info) {
            console.log('createMarker');
            console.log(info);
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


        var html ='<i class="material-icons">wifi</i>';
        // map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
        var createDayCourseMarker = function(info) {
             console.log('day-createMarker');
            console.log(info);

            var marker = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption,
                icon: {
                    path: MAP_PIN,
                    fillColor: 'transparent',
                    fillOpacity: 1,
                    strokeColor: 'orange',
                    strokeWeight: 0.75
                },
                map_icon_label: '<span class="map-icon map-icon-library"></span>'
            });
            marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.mapMarkers.push(marker);
        }

        var createEveningCourseMarker = function(info) {
            console.log('night-createMarker');
            console.log(info);
            var marker = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption,
                icon: {
                    path: MAP_PIN,
                    fillColor: '#FF0DFF',
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
            // console.log('wifi-createMarker');
            // console.log(info);


            var icon = getIcon(info.iconMatcher);
            var marker = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption,
                icon: image
                // map_icon_label: '<span class="map-icon map-icon-cafe mil-green"></span>'
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