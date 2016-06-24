'use strict';

var showMarkers = {
                    trainingClasses: new Boolean(),
                    computerRetail: new Boolean(),
                    freeWifi: new Boolean(),
                    publicComputers: new Boolean()
                  };

var tmp = {};

function onGoogleReady() {
  angular.bootstrap(document.getElementById("rcMap"), ['digitalInclusion.core.map']);
  showMarkers.freeWifi = true;
  showMarkers.publicComputers = false;
  showMarkers.computerRetail = false;
  showMarkers.trainingClasses = false;
}

angular.module('digitalInclusion.core.map', ['ngResource']).controller('MapController', ['$scope', '$timeout', '$http', '$state', '$stateParams', 'Authentication', 'getCoursesService',  'getPlacesService', '$location',
    function ($scope, $timeout, $http, $state, $stateParams, Authentication, getCoursesService, getPlacesService, $location) {


  //     $scope.goData = function(){
	 //     myService.getResponders.then(function(data){
	 //          $scope.gotData = data;
	 //     });

	 // };
	 // var placesData = getPlacesService.getPlaces;

      // $scope.places = function() {
      // 	getPlacesService.getPlaces.then(function(data){
      // 		console.log(data);
      // 		$scope.places = data;
      // 	})
      // };
      // var placesData = getPlacesService.getPlaces;
      // console.log("places");
      // console.log(placesData);

    var counter = 0;
    function incrementToLimit(num) {
      console.log(num + " reaching limit =>" + limit);
    }

    // $scope.allPlaces = getAllPlaces.getPlaces(function(data) {
    //   $scope.allPlaces = data;
    //   console.log("data");
    //   console.log(data);
    // });


    $scope.places = getPlacesService.getPlaces(function(places) {

          // caption: info.caption
                // map_icon_label: '<span class="map-icon map-icon-cafe mil-green"></span>'
                // map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
          
        $scope.places = places;
 
        var lng = $scope.places.length;
        console.log("count: " + lng);
        var i;
        for (i = 0; i < lng; i++) {
            // console.log($scope.places[i]);
            var place = $scope.places[i];
            var category = place.primaryCategory;
            // console.log("loco");
            // console.log(place);
            if (category === "computers-access") {
               $scope.array.computers.access.push(place);
            } else if (category === "training-day") {
               $scope.array.training.day.push(place);
            } else if (category === "training-night") {
               $scope.array.training.night.push(place);
            } else if (category === "wifi-free") {
               $scope.array.wifi.free.push(place);
            } else if (category === "wifi-customer") {
              $scope.array.wifi.customer.push(place);
            } else if (category === "computers-retail") {
              $scope.array.computers.retail.push(place);
            } else if (category === "isp") {
              $scope.array.isps.push(place);
            };
            // console.log($scope.markers);
            // createMarker(loc);
        }
        console.log($scope.array);
	  });


    function setWifiMarkers() {
      var frLocations = $scope.array.wifi.free;
      var coLocations = $scope.array.wifi.customer;
      var i;
      var n;
      var frLength = frLocations.length;
      var coLength = coLocations.length;
      for (i=0; i<frLength; i++) {
        var place = frLocations[i];
        // console.log(place);
        createMarker(place);
        
      }
      for (n=0;n<coLength;n++){
        var place = coLocations[n];
        createMarker(place);
      }
    }

    function setTrainingMarkers() {
      var dayLocations = $scope.array.training.day;
      var nightLocations = $scope.array.training.night;
      var i;
      var n;
      var dayLength=dayLocations.length;
      var nightLength = nightLocations.length;
      for (i=0;i<dayLength;i++){
        var place = dayLocations[i];
        createMarker(place);
      }
      for (n=0;n<nightLength;n++){
        var place = nightLocations[n];
        createMarker(place);
      }
    }

    function setAccessMarkers(){
      var locations = $scope.array.computers.access;
      var i;
      var length = locations.length;
      for (i=0;i<length;i++){
        var place = locations[i];
        createMarker(place);
      }
    }

    function setRetailMarkers(){
      var locations = $scope.array.computers.retail;
      var i;
      var length = locations.length;
      for (i=0;i<length;i++){
        var place = locations[i];
        createMarker(place);
      }
    }






    // place object retrieved from Angularjs service
    function createMarker(json) {
      // console.log(json);


      var cat = json.primaryCategory;
      var iconUrl;
      if (cat === "computers-access") {
         iconUrl = "modules/core/client/img/computerAccess.png";

      } else if (cat === "training-day") {
          iconUrl = "modules/core/client/img/userOrange.png";
      } else if (cat === "training-night") {
          iconUrl = "modules/core/client/img/userBlue.png";
      } else if (cat === "wifi-free") {
         iconUrl = "modules/core/client/img/wifiFree-2.png";
      } else if (cat === "wifi-customer") {
          iconUrl = "modules/core/client/img/wifiCustomerOnly.png";
      } else if (cat === "computers-retail") {
          iconUrl = "modules/core/client/img/computerRetail.png";
      } else if (cat === "isp") {
          iconUrl = "modules/core/client/img/internetService.png";
      };
      
      var image = new google.maps.MarkerImage(
                                             iconUrl,
                                              new google.maps.Size(71, 71),
                                              new google.maps.Point(0, 0),
                                              new google.maps.Point(17, 34),
                                              new google.maps.Size(25, 25)
                                             );
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(json.location[0].lat, json.location[0].lng),
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        icon: image,
        title: json.title
      });
      google.maps.event.addListener(marker, 'click', function(){
          // infoWindow.setContent('<h4>' + marker.title + '</h4>');
          // infoWindow.open($scope.map, marker);
          resizeMap();
          resyzeMap();
          var anchor = new google.maps.MVCObject();
          anchor.set("position",event.latLng);
          console.log("event inspect");
          console.log(event);
          document.getElementById('info-box00').textContent = json.primaryCategory;
          document.getElementById('info-box01').textContent = json.title;
          document.getElementById('info-box02').textContent = json.description;
          document.getElementById('info-box04').textContent = json.phone;
          document.getElementById('info-box03').textContent = json.street;
      });
      // $scope.markers.wifi.free.push(marker);
      if (cat === "computers-access") {
         // iconUrl = "modules/core/client/img/computerAccess.png";
         $scope.markers.computers.access.push(marker);
      } else if (cat === "training-day") {  
          $scope.markers.training.day.push(marker);
      } else if (cat === "training-night") {  
          $scope.markers.training.night.push(marker);
      } else if (cat === "wifi-free") {
         $scope.markers.wifi.free.push(marker);
      } else if (cat === "wifi-customer") {
         $scope.markers.wifi.customer.push(marker);
      } else if (cat === "computers-retail") {
         $scope.markers.computers.retail.push(marker);
      } else if (cat === "isp") {
         
      };
      // console.log($scope.markers.wifi.free.length);
    };

    // function setListeners() {
    //   var markers = $scope.markers.wifi.free;
    //   var i;
    //   var length = markers.length;
    //   for (i=0; i<length; i++) {
    //      var marker = markers[i];
    //      console.log(marker);
    //      google.maps.event.addListener(marker, 'click', function() {
    //       resizeMap();
    //       document.getElementById('info-box01').textContent = marker.title;
    //      });
    //   }
    // }
      // marker.content = '<div class="infoWindowContent">' + '<h3>' + json.caption + '</h3><h4>' + json.phone + '</h4>'+ json.address1+', '+ json.city+', '+ json.state+', '+ json.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';
      
      // console.log(marker.position);
      // if (cat === "computers-access") {
      //    $scope.markers.computers.access.push(marker);
      // } else if (cat === "training-day") {
      //    $scope.markers.training.day.push(marker);
      // } else if (cat === "training-night") {
      //    $scope.markers.training.night.push(marker);
      // } else if (cat === "wifi-free") {
      //    $scope.markers.wifi.free.push(marker);
      // } else if (cat === "wifi-customer") {
      //   $scope.markers.wifi.customer.push(marker);
      // } else if (cat === "computers-retail") {
      //   $scope.markers.computers.retail.push(marker);
      // } else if (cat === "isp") {
      //   $scope.markers.isps.push(marker);
      // };
      // console.log(iconUrl);
      // var iconoriginx = null;
      // var iconoriginy = null;
      // var iconSize = new google.maps.Size(30, 30);
      // var iconAnchor = new google.maps.Point(15, 30);
      // var iconScaledSize = new google.maps.Size(30, 30);
      // if (feature.getProperty('iconoriginy')) {
      //       iconoriginy = feature.getProperty('iconoriginy');
      //       iconoriginx = feature.getProperty('iconoriginx');
      //       var iconOrigin = new google.maps.Point(iconoriginx,iconoriginy);
      //     }
      //     return ({
      //         icon: {
      //             url: iconUrl,
      //             size: iconSize,
      //             anchor: iconAnchor,
      //             origin: iconOrigin,
      //             animation: google.maps.Animation.DROP,
      //             scaledSize: iconScaledSize
      //         }
      //     });
      // });
      // addMarker(marker.position, $scope.map);
    // };
	  
    // function addMarker(location, map) {
    //   // Add the marker at the clicked location, and add the next-available label
    //   // from the array of alphabetical characters.
    //   console.log("add");
    //   console.log(location);
    //   console.log(map);
    //   var marker = new google.maps.Marker({
    //     position: location,
    //     // label: labels[labelIndex++ % labels.length],
    //     map: map
    //   });
    // }


    function clearWifiMarkers() {
      var freeWifiSpots = $scope.markers.wifi.free;
      var customerWifiSpots = $scope.markers.wifi.customer;
      var i;
      var n;
      var l = freeWifiSpots.length; 
      var m = customerWifiSpots.length;
      for (i=0;i<l;i++) {
        freeWifiSpots[i].setMap(null);
      }
      for (n=0;n<m;n++){
        customerWifiSpots[n].setMap(null);
      }
      freeWifiSpots=[];
      customerWifiSpots=[];
    }
    


    function clearTrainingMarkers() {
      var dayCourses = $scope.markers.training.day;
      var nightCourses = $scope.markers.training.night;
      for (var i = 0; i < dayCourses.length; i++) {
        dayCourses[i].setMap(null);
      }
      dayCourses = [];
      for (var i = 0; i < nightCourses.length; i++) {
        nightCourses[i].setMap(null);
      }
      nightCourses = [];
    }



    function clearAccessMarkers() {
      var markers = $scope.markers.computers.access;
      var i;
      var length = markers.length;
      for (i=0; i<length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function clearRetailMarkers() {
      var markers = $scope.markers.computers.retail;
      var i; 
      var length = markers.length;
      for (i=0;i<length;i++){
        markers[i].setMap(null);
      }
      markers = [];
    }


    function dropTrainingMarkers() {
      clearTrainingMarkers();
      var dayCourses = $scope.markers.training.day;
      for (var i = 0; i < dayCourses.length; i++) {
        console.log("droppping");
        // console.log(dayCourses[i].location[0]);
        var lat = Number(dayCourses[i].location[0].lat);
        console.log(lat);
        var lng = Number(dayCourses[i].location[0].lng);
        var loc = new google.maps.LatLng({lat:lat, lng:lng});
        addMarkerWithTimeout(loc, i * 200);
      }
    }

    function addMarkerWithTimeout(position, timeout) {
      console.log(position);
      window.setTimeout(function() {
        $scope.markers.training.day.push(new google.maps.Marker({
          position: position,
          map: $scope.map,
          animation: google.maps.Animation.DROP
        }));
      }, timeout);
    }




    $scope.markers = {  
                        wifi: {
                               free: [],
                               customer: []
                              },
                        computers: 
                                  {
                                    retail: [],
                                    access: []
                                  },
                        training: 
                                 { 
                                   day: [],
                                   night: []
                                 }, 
                        isps: []
                       };






      $scope.array = {  
      					        wifi: {
	                             free: [],
	                             customer: []
			                        },
                        computers: 
                                  {
                                  	retail: [],
                                  	access: []
                                  },
                        training: 
                          			 { 
                          				 day: [],
                          				 night: []
                          			 }, 
                        isps: []
                       };


      var createPublicWifiMarker = function(info) {
            // console.log('wifi-createMarker');
            // console.log(info);


            // var icon = getIcon(info.iconMatcher);
            var marker = new Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lng),
                title: info.title,
                caption: info.caption
                // map_icon_label: '<span class="map-icon map-icon-cafe mil-green"></span>'
                // map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
            });
            marker.content = '<div class="infoWindowContent">' + '<h3>' + info.caption + '</h3><h4>' +info.phone+'</h4>'+info.address1+', '+info.city+', '+info.state+', '+info.zip+'<br>' +'<br><a ng-click="">More Details</a></div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.wifi.public.push(marker);
        }



        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }









      

      var pattern1 = new RegExp("norm");
      var pattern2 = new RegExp("highlighted");


      var t2 = angular.element(document.getElementById("tgz2"));
      t2.on('click', function(event) {
        // console.log('looking up');
        var cqP = event.toElement.className;
        var cqC = event.target.parentElement.className;
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          t2.removeClass('norm');
          t2.addClass('highlighted');
          showMarkers.computerTraining = true;
          if (showMarkers.computerTraining) {
            // console.log("dahel");
            setTrainingMarkers();
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerTraining-day.json");
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerTraining-evening.json");
           } else if (!showMarkers.computerTraining) {
           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          t2.removeClass('highlighted');
          t2.addClass('norm');
          showMarkers.computerTraining = false;
          if (showMarkers.computerTraining) {
            // console.log("dahel");
            // dropTrainingMarkers();
           } else if (!showMarkers.computerTraining) {
              // clickTrain();
              clearTrainingMarkers();
              // console.log('thereef');
            console.log($scope.markers);
           }
        } else {
          // console.log("throw err or do something else");
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
              setAccessMarkers();
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerAccess.json");
           } else if (!showMarkers.publicComputers) {
           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          t3.removeClass('highlighted');
          t3.addClass('norm');
          showMarkers.publicComputers = false;
          if (showMarkers.publicComputers) {
           } else if (!showMarkers.publicComputers) {
              clickPCs("publicComputers");
              clearAccessMarkers();
           }
        } else {
          // console.log("throw err");
        }
      });


      var t4 = angular.element(document.getElementById("tgz4"));
      t4.on('click', function(event) {

        var cqP = event.toElement.className;
        var cqC = event.target.parentElement.className;
   
        if (pattern1.test(cqP) || pattern1.test(cqC)) {
          t4.removeClass('norm');
          t4.addClass('highlighted');
          showMarkers.computerRetail = true;
          if (showMarkers.computerRetail) {
              console.log("<<");
              setRetailMarkers();
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/computerRetail.json");
           } else if (!showMarkers.computerRetail) {
           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          t4.removeClass('highlighted');
          t4.addClass('norm');
          showMarkers.computerRetail = false;
          if (showMarkers.computerRetail) {
           } else if (!showMarkers.computerRetail) {
              // clickRetail();
              console.log(">>");
              clearRetailMarkers();
           }
        } else {
          // console.log("throw err or do something else");
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
            setWifiMarkers();
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/freeWifi-public.json");
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/freeWifi-customer.json");
           } else if (!showMarkers.freeWifi) {

           }
        } else if (pattern2.test(cqP) || pattern2.test(cqC)) {
          t1.removeClass('highlighted');
          t1.addClass('norm');
          showMarkers.freeWifi = false;
          if (showMarkers.freeWifi) {
              // console.log("4");
              // $scope.map.data.loadGeoJson("modules/core/client/map-data/freeWifi.json");
           } else if (!showMarkers.freeWifi) {
              // console.log("5");
              clickFree();
              clearWifiMarkers();
           }
        } else {
          // console.log("throw err or do something else");
        }
      });

        var ctrl = this;
        var norm = "norm";




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
            var checkVisibility = function(status) {
              if (!status.publicComputers) {
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
          console.log(clickEvent);
        };
       

        var clickPCs = function(type) {

          $scope.map.data.forEach(function (feature) {
              var str = feature.f.category;
              var tmpStr = "computerAccess";
              var sv = "computerRetail";

              if (str === tmpStr) {
                $scope.map.data.remove(feature);
              } else {
              }
          });
        }

        var clickRetail = function() {
          // console.log("calling fn ");
          $scope.map.data.forEach(function(feature) {
            // console.log("7");
            var good = feature.f.category;
            var tea = "computerRetail";
            if (good === tea) {
              // console.log("8");
              $scope.map.data.remove(feature);
            } else {
              // console.log("9");
            }
          })
        }

        var clickFree = function() {
          // console.log("");
          $scope.map.data.forEach(function(feature) {
            var a = feature.f.category;
            var b = "Public WiFi";
            var c = "freeWifi-customer";
            if (a == b || a == c) {
              $scope.map.data.remove(feature);
            } 
          })
        }

        var clickTrain = function() {
          console.log("nawab3333");
          clearTrainingMarkers();
          console.log($scope.map.data);
          $scope.map.data.forEach(function(feature) {
            var a = feature.f.category;
            var b = "training-day";
            var c = "computerTraining-night";
            if (a == b) {
              console.log("6");
              $scope.map.data.remove(feature);
            } else if (a==c) {
              $scope.map.data.remove(feature);
            } else {
                        }
          })
        }


        var clickEvt = function() {
          // resizeMap();
          // resyzeMap();
          $scope.map.data.setStyle(function(feature) {
            // console.log("wtf");
            // console.log(feature);
              var cat = feature.f.category;
              var iconUrl;
              var visib;
              if (cat === "library") {
                 iconUrl = "modules/core/client/img/computerAccess.png";
              } else if (cat === "computerTraining-day") {
                  iconUrl = "modules/core/client/img/userOrange.png";
              } else if (cat === "computerTraining-night") {
                  iconUrl = "modules/core/client/img/userBlue.png";
              } else if (cat === "Public WiFi") {
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
              // console.log("markers.publicComputers");
              // console.log($scope.markers.publicComputers);
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




        function setMapOnAllHotspots(map) {
		  for (var i = 0; i < markers.length; i++) {
		    $scope.markers.wifi.public[i].setMap(map);
		  }
		}

		// Removes the markers from the map, but keeps them in the array.
		function clearMarkers() {
		  setMapOnAll(null);
		}

		// Shows any markers currently in the array.
		function showMarkers() {
		  setMapOnAll(map);
		}

    var mapKanvas = document.getElementById("rcMap");
    var sideWindow = document.getElementById("sw");
    var wndBtn = document.getElementById("winCtrl");
    function rmvWindow() {
      sideWindow.style.display = "none";
      mapKanvas.style.width = "750px";
    }
    var resizeMap = function() {
      mapKanvas.style.width = "420px";
      sideWindow.style.display = "initial";
      console.log("it was clicked-------------------");
    }

    function resyzeMap() {
      console.log("it was clycked+++++++++++++++++++");
    }






















        $scope.showMap = function(position) {

            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;

            $scope.mapOptions = {
                center: {lat: $scope.lat, lng: $scope.lng},
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById('rcMap'), $scope.mapOptions);

            var iconoriginx = null;
            var iconoriginy = null;
            var iconSize = new google.maps.Size(30, 30);
            var iconAnchor = new google.maps.Point(15, 30);

            $scope.input = document.getElementById('plac');
			      $scope.searchBox = new google.maps.places.SearchBox($scope.input);
			      $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.input);

      
            $scope.initialLocation = new google.maps.LatLng($scope.lat, $scope.lng);
            var marker = new google.maps.Marker({
                position: $scope.initialLocation,
                animation: google.maps.Animation.DROP,
                map: $scope.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });


            // console.log('thef');
            // console.log($scope.markers);

            setWifiMarkers();
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/computerRetail.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/freeWifi-customer.json");
           // $scope.map.data.loadGeoJson("modules/core/client/map-data/export/c/freeWifi-public.json");


           $scope.removeWindow = function(event) {
              console.log("clicked and now this");
              console.log(event);
              rmvWindow();
           }

           //    var iconoriginx = null;
         



           $scope.map.data.addListener('click', function(event) {
              resizeMap();
                resyzeMap();
                var anchor = new google.maps.MVCObject();
                anchor.set("position",event.latLng);
                console.log("event inspect");
                console.log(event.feature);
                document.getElementById('info-box00').textContent = event.feature.f.category;
                document.getElementById('info-box01').textContent = event.feature.f.description;
                document.getElementById('info-box02').textContent = event.feature.f.name;
                document.getElementById('info-box04').textContent = event.feature.f.phone;
                document.getElementById('info-box03').textContent = event.feature.f.street;
            });
            clickEvt();
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

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showMap, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.getLocation();

    }
]);