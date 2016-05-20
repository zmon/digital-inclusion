'use strict';

angular.module('core.map', [])
    .component('addInfowindow', {
        template:
           '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">{{location.name}}</h1>'+
              '<div id="bodyContent">'+
               '<p>{{location.address1}}</p>'+
               '<p><a href="">{{location.url}}'+'</a>'+'</p>'+
             '</div>'+
            '</div>',
        bindings: {
            oneWay: '<',
            string: '@',
            twoWay: '=',
            // Note: * You shouldn't use two way binding on a component,
            // but it is possible which is why we show it here.

            // Instead you should pass the changed object back to the parent.
            // look at how we used the aFunction function to change properties in a parent object.
            aFunction: '&'
        },
        controller: function () {
            var ctrl = this;

            // ctrl.other = 'Another: I\'m Declared in the child\'s controller too';

            // ctrl.update = function (name) {
            //     ctrl.bFunction({object: name})
            // }
        }
    });


  // var infowindow = new google.maps.InfoWindow({
  //   content: contentString
  // });