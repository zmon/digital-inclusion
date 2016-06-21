'use strict';

angular.module('digitalInclusion.core').controller('LogoController', ['$scope', '$location', 'Authentication',
  function ($scope, $location, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var getTagline = function(url) {
    	console.log("getTagline");
    	console.log(url.$$path);
    	if (url.$$path === "/map-resources") {
    		return "Add Map Resources";
    	} else if (url.$$path === "/isps") {
    		return "Internet Service Providers";
    	} else if (url.$$path === "/about") {
    		return "About Us";
    	} else if (url.$$path === "/contact") {
    		return "Contact Us";
    	} else if (url.$$path === "/") {
    		return "Map of Free Services";
    	} else if (url.$$path === "/join") {
    		return "Join Coalition";
    	} else if (url.$$path === "/coalition-resources") {
    		return "Coalition Resources";
    	} else if (url.$$path === "/training") {
    		return "Online Training";
    	}


    };
    $scope.tagline = getTagline($location);
   }
]);
