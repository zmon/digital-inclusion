'use strict';

// Setting up route
angular.module('digitalInclusion.core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('tabs', {
      url: '/tabs',
      templateUrl: 'modules/core/client/views/tabs.client.view.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'modules/core/client/views/about.client.view.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'modules/core/client/views/contact.client.view.html'
    })
    .state('map-resources', {
      url: '/map-resources',
      templateUrl: 'modules/core/client/views/map-resources.client.view.html'
    })

    .state('isps', {
      url: '/isps',
      templateUrl: 'modules/core/client/views/isps.client.view.html'
    })

    .state('training', {
      url: '/training',
      templateUrl: 'modules/core/client/views/training.client.view.html'
    })
    .state('confirm-location-details', {
      url: '/confirm-location-details/:placeId',
      templateUrl: 'modules/core/client/views/verify.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
