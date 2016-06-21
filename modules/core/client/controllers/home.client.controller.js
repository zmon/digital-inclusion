'use strict';

angular.module('digitalInclusion.core').controller('HomeController', ['$scope', '$location', 'Authentication',
  function ($scope, $location, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.showme = false;



    $scope.items = [
	    'Map of Free Services',
	    'Add Service',
	    'Internet at Home (Internet Service Providers)', 
	    'Training Online', 
	    'About Us', 
	    '_Join Us',  
	    '_Resources for Coalition Members', 
	    'Contact Us'
	  ];

	  $scope.clicked = function($event) {
	  	var path;
	  	if ($event === "Add Service") {
	  		path = "map-resources";
	  	} else if ($event === "Map of Free Services") {
	  		path = "/";
	  	} else if ($event === "Internet at Home (Internet Service Providers)") {
	  		path = "/isps";
	  	} else if ($event === "Training Online") {
	  		path = "/training";
	  	} else if ($event === "About Us") {
	  		path = "/about";
	  	} else if ($event === "_Join Us") {
	  		path = "/join";
	  	} else if ($event === "_Resources for Coalition Members") {
	  		path = "/coalition-resources";
	  	} else if ($event === "Contact Us") {
	  		path = "/contact";
	  	}
	  	$location.url(path);
	  }

	  $scope.status = {
	    isopen: false
	  };

	  $scope.toggled = function(open) {
	    $log.log('Dropdown is now: ', open);
	  };

	  $scope.toggleDropdown = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;
	  };

	  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
  }
]);
