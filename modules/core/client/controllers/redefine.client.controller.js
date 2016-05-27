'use strict';
var showMarkers = {
                    trainingClasses: new Boolean(),
                    computerRetail: new Boolean(),
                    freeWifi: new Boolean(),
                    publicComputers: new Boolean()
                  };

var tmp = {};

// showMarkers.freeWifi = new Boolean();
// showMarkers.nightClasses = new Boolean();
function onGoogleReady() {
  angular.bootstrap(document.getElementById("customMap"), ['core.map']);
  showMarkers.freeWifi = true;
  showMarkers.publicComputers = false;
  showMarkers.computerRetail = false;
  showMarkers.trainingClasses = false;
}

angular.module('core.map', ['ngResource']).controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'getCoursesService',  'getPlacesService', '$location',
    function ($scope, $timeout, $http, $state, $stateParams, Authentication, getCoursesService, getPlacesService, $location) {

      $scope.markers = {
                          freeWifi: [],
                          computerTraining: [],
                          publicComputers: [],
                          computerRetail: []
                       };

      console.log("init toggle vals:");
      console.log(showMarkers.trainingClasses);
      console.log(showMarkers.computerRetail);
      console.log(showMarkers.freeWifi);
      console.log(showMarkers.publicComputers);
      var pattern1 = new RegExp("norm");
      var pattern2 = new RegExp("highlighted");


      var t2 = angular.element(document.getElementById("tgz2"));
      t2.on('click', function(event) {
        console.log('looking up');
        var cqP = event.toElement.className;
        var cqC = event.target.parentElement.className;
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          console.log("maiuybe then?");
          t2.removeClass('norm');
          t2.addClass('highlighted');
          showMarkers.computerTraining = true;
          if (showMarkers.computerTraining) {
              $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerTraining-day.json");
              $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerTraining-evening.json");
           } else if (!showMarkers.computerTraining) {
            console.log("donut hi");
           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          t2.removeClass('highlighted');
          t2.addClass('norm');
          showMarkers.computerTraining = false;
          if (showMarkers.computerTraining) {
           } else if (!showMarkers.computerTraining) {
              fBay();
              // oLay()
           }
        } else {
          console.log("throw err or do something else");
        }
      });





      var t3 = angular.element(document.getElementById("tgz3"));
      t3.on('click', function(event) {
        var cqP = event.toElement.className;
        var cqC = event.target.parentElement.className;
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          t3.removeClass('norm');
          t3.addClass('highlighted');
          showMarkers.publicComputers = true;
          if (showMarkers.publicComputers) {
              $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerAccess.json");
           } else if (!showMarkers.publicComputers) {
           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          t3.removeClass('highlighted');
          t3.addClass('norm');
          showMarkers.publicComputers = false;
          if (showMarkers.publicComputers) {
           } else if (!showMarkers.publicComputers) {
              crayCray("publicComputers");
           }
        } else {
          console.log("throw err");
        }
      });


      var t4 = angular.element(document.getElementById("tgz4"));
      t4.on('click', function(event) {
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
          console.log("CGHOmaiyybe 8then");
          t4.removeClass('norm');
          t4.addClass('highlighted');
          showMarkers.computerRetail = true;
          if (showMarkers.computerRetail) {
              $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerRetail.json");
           } else if (!showMarkers.computerRetail) {
            console.log("do not show that shit");
           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          console.log("then again maybe");
          t4.removeClass('highlighted');
          t4.addClass('norm');
          showMarkers.computerRetail = false;
          if (showMarkers.computerRetail) {
              console.log("DONT EVEN BIDDDDD");
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/freeWifi.json");
           } else if (!showMarkers.computerRetail) {
              console.log("ubtrduash");
              rayRay();
           }
        } else {
          console.log("throw err or do something else");
        }
      });


      var t1 = angular.element(document.getElementById("tgz1"));
      t1.on('click', function(event) {
        var cqP = event.toElement.className;
        var cqC = event.target.parentElement.className;
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          t1.removeClass('norm');
          t1.addClass('highlighted');
          showMarkers.freeWifi = true;
          if (showMarkers.freeWifi) {
              $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/freeWifi-public.json");
              $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/freeWifi-customer.json");
           } else if (!showMarkers.freeWifi) {

           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          console.log("then again maybe");
          t1.removeClass('highlighted');
          t1.addClass('norm');
          showMarkers.freeWifi = false;
          if (showMarkers.freeWifi) {
              console.log("4");
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/freeWifi.json");
           } else if (!showMarkers.freeWifi) {
              console.log("5");
              cBay();
           }
        } else {
          console.log("throw err or do something else");
        }
      });




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
        var norm = "norm";
        // var overreactive = '#DDF0FF';
        var overreactive = "highlighted";
        // element.removeClass(thisCss);
        // element.addClass(cssSetter);

        $scope.whippingBoy = function(fnName) {
          console.log(fnName);
          if (fnName === "freeWifi") {
            console.log("Case: freeWifi");
            // callback()
          } else if (fnName === "customerWifi") {
            console.log("Case: customerWifi")
          } else if (fnName === "dayClasses") {
            console.log("Case: dayClasses")
          } else if (fnName === "eveningClasses") {
            console.log("Case: eveningClasses");
            console.log(t4);
            // t4.removeClass(proverreactive);
            // t4.addClass(overreactive);
          }
        };



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

        // var checkVisibility = function(status) {
        //   if (!status.publicComputers) {
        //     console.log("peaceful shadows");
        //     div.style.display = 'hidden';
        //   }
        // }

        // Implement draw
        MarkerLabel.prototype.draw = function() {

            var projection = this.getProjection();
            var position = projection.fromLatLngToDivPixel(this.get('position'));
            var div = this.div;
            var checkVisibility = function(status) {
              if (!status.publicComputers) {
                console.log("peaceful shadows");
                return 'none';
              }
            }

            this.div.innerHTML = this.get('text').toString();
            checkVisibility(showMarkers.publicComputers);
            div.style.zIndex = this.get('zIndex'); // Allow label to overlay marker
            div.style.position = 'absolute';
            div.style.visibility = checkVisibility(showMarkers);
            // div.style.display = 'block';
            div.style.left = (position.x - (div.offsetWidth / 2)) + 'px';
            div.style.top = (position.y - div.offsetHeight) + 'px';

        };

        var infoWindow = new google.maps.InfoWindow();
        $scope.browserSupportFlag = new Boolean();
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


        var crayCray = function(type) {
          console.log("calling crayCray(type) with arg: " + type);
          $scope.map.data.forEach(function (feature) {
              console.log("bizzy crayCray");
              console.log(type);
              var str = feature.H.category;
              console.log(str);
              // if type == tmpStr
              var tmpStr = "computerAccess";
              var sv = "computerRetail";

              if (str === tmpStr) {
                console.log("remove this");
                // console.l
                $scope.map.data.remove(feature);
              } else {
                console.log("do not remove this");
              }
              // $scope.map.data.remove(feature);
          });
        }

        var rayRay = function() {
          console.log("calling fn ");
          $scope.map.data.forEach(function(feature) {
            console.log("7");
            var good = feature.H.category;
            var tea = "computerRetail";
            if (good === tea) {
              console.log("8");
              $scope.map.data.remove(feature);
            } else {
              console.log("9");
            }
          })
        }

        var cBay = function() {
          console.log("");
          $scope.map.data.forEach(function(feature) {
            var a = feature.H.category;
            var b = "freeWifi-public";
            var c = "freeWifi-customer";
            if (a == b || a == c) {
              console.log("6");
              $scope.map.data.remove(feature);
            } else {
              console.log("fail");
            }
          })
        }

        var fBay = function() {
          console.log("");
          $scope.map.data.forEach(function(feature) {
            var a = feature.H.category;
            var b = "computerTraining-day";
            var c = "computerTraining-night";
            if (a == b) {
              console.log("6");
              $scope.map.data.remove(feature);
            } else if (a==c) {
              $scope.map.data.remove(feature);
            } else {
              console.log('fail');
            }
          })
        }


        var eYotz = function() {
          console.log("otch");
          $scope.map.data.setStyle(function(feature) {
              var cat = feature.H.category;
              var iconUrl;
              var visib;
              if (cat === "library") {
                 iconUrl = "modules/core/client/img/computerAccess.png";
              } else if (cat === "computerTraining-day") {
                  iconUrl = "modules/core/client/img/userOrange.png";
              } else if (cat === "computerTraining-night") {
                  iconUrl = "modules/core/client/img/userBlue.png";
              } else if (cat === "freeWifi-public") {
                 iconUrl = "modules/core/client/img/wifiFree-2.png";
              } else if (cat === "freeWifi-customer") {
                  iconUrl = "modules/core/client/img/wifiCustomerOnly.png";
              } else if (cat === "computerAccess") {
                  iconUrl = "modules/core/client/img/computerAccess.png";
              } else if (cat === "computerRetail") {
                  iconUrl = "modules/core/client/img/computerRetail.png";
              } else if (cat === "serviceVendor") {
                  iconUrl = "modules/core/client/img/internetService.png";
              } else {
                  iconUrl = "modules/core/client/img/internetService.png";
              };
              console.log("markers.publicComputers");
              console.log($scope.markers.publicComputers);
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
                          animation: google.maps.Animation.DROP,
                          scaledSize: iconScaledSize
                      }
                  });
              });
        }

        $scope.showMap = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.mapOptions = {
                center: {lat: $scope.lat, lng: $scope.lng},
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById('customMap'), $scope.mapOptions);
            console.log("****$scope.map");
            console.log($scope.map.gm_bindings_);
            // console.log("markers.freeWifi");
            // console.log(markers.freeWifi);
            var iconoriginx = null;
            var iconoriginy = null;
            var iconSize = new google.maps.Size(30, 30);
            var iconAnchor = new google.maps.Point(15, 30);

            $scope.visitor = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng($scope.lat, $scope.lng),
                icon: {
                    path: MAP_PIN,
                    fillColor: 'transparent',
                    fillOpacity: 1,
                    strokeColor: 'none',
                    strokeWeight: 0
                },
                map_icon_label: '<span class="map-icon milb map-icon-circle"></span>'
            });

           // $scope.map.data.loadGeoJson("modules/core/client/map-data/freeWifi.json");

           // $scope.map.data.loadGeoJson("modules/core/client/map-data/dayClasses.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/nightClasses.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/customerWifi.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/publicComputers.json");

           // if (showMarkers.publicComputers) {
           //    $scope.map.data.loadGeoJson("modules/core/client/map-data/freeWifi.json");
           // } else if (!showMarkers.publicComputers) {
           //  console.log("do not show that shit");
           // }

           // $scope.map.data.loadGeoJson("modules/core/client/map-data/computerRetail.json");
           $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/ispList.json");
           console.log("mofo");
           console.log($scope.map.controls);
           var callback = function(feature) {
            $scope.map.data.remove(feature);
           };

           // console.log($scope.map.data.forEach(callback(thingy)));

           // $scope.map.data.setStyle(function(feature) {
           //      return {icon:feature.getProperty('icon')};
           // });







           // $scope.map.data.setStyle(function(feature) {
           //    var cat = feature.H.category;
           //    var iconUrl;
           //    var visib;
           //    if (cat === "library") {
           //       iconUrl = "modules/core/client/img/computerAccess.png";
           //    } else if (cat === "dayClass") {
           //        iconUrl = "modules/core/client/img/userOrange.png";
           //    } else if (cat === "nightClass") {
           //        iconUrl = "modules/core/client/img/userBlue.png";
           //    } else if (cat === "wifiFree") {
           //       iconUrl = "modules/core/client/img/wifiFree-2.png";
           //    } else if (cat === "wifiCustomer") {
           //        iconUrl = "modules/core/client/img/wifiCustomerOnly.png";
           //    } else if (cat === "computerAccess") {
           //        iconUrl = "modules/core/client/img/computerAccess.png";
           //    } else if (cat === "computerRetail") {
           //        iconUrl = "modules/core/client/img/computerRetail.png";
           //    } else if (cat === "serviceVendor") {
           //        iconUrl = "modules/core/client/img/internetService.png";
           //    } else {
           //        iconUrl = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
           //    };
           //    console.log("markers.publicComputers");
           //    console.log($scope.markers.publicComputers);
           //    var iconoriginx = null;
           //    var iconoriginy = null;
           //    var iconSize = new google.maps.Size(30, 30);
           //    var iconAnchor = new google.maps.Point(15, 30);
           //    var iconScaledSize = new google.maps.Size(30, 30);
           //    if (feature.getProperty('iconoriginy')) {
           //          iconoriginy = feature.getProperty('iconoriginy');
           //          iconoriginx = feature.getProperty('iconoriginx');
           //          var iconOrigin = new google.maps.Point(iconoriginx,iconoriginy);
           //        }
           //        return ({
           //            icon: {
           //                url: iconUrl,
           //                size: iconSize,
           //                anchor: iconAnchor,
           //                origin: iconOrigin,
           //                animation: google.maps.Animation.DROP,
           //                scaledSize: iconScaledSize
           //            }
           //        });
           //    });




           // $scope.map.data.setStyle(function(feature) {
           //  var val =
           //      return {icon:feature.setStyle({visible:false})};
           // });




  // $scope.map.event.addDomListener


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
              // alert('foo ' + ('foo') + '!');

              // document.getElementById('info-box').textContent =
              //     event.feature.getProperty('letter');
            // });


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
            eYotz();
            $scope.$apply();
        };

        $scope.checkV = function(data) {
          console.log("v check");
          console.log(data);
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

        $scope.getLocation();

    }
]);