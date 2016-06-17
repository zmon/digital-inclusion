'use strict';

// Setting up route
angular.module('places').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('places', {
        abstract: true,
        url: '/places',
        template: '<ui-view/>'
      })
      .state('places.list', {
        url: '',
        templateUrl: 'modules/places/client/views/list-places.client.view.html'
      })
      .state('places.create', {
        url: '/create',
        templateUrl: 'modules/places/client/views/create-place.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('places.view', {
        url: '/:placeId',
        templateUrl: 'modules/places/client/views/view-place.client.view.html'
      })
      .state('places.edit', {
        url: '/:placeId/edit',
        templateUrl: 'modules/places/client/views/edit-place.client.view.html',
        data: {
          roles: ['guest','user', 'admin']
        }
      });
  }
]);
