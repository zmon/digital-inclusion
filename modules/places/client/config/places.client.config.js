
'use strict';

// Configuring the Places module
angular.module('places').run(['Menus',
  function (Menus) {
    // Add the places dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Places',
      state: 'places',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'places', {
      title: 'List Places',
      state: 'places.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'places', {
      title: 'Create Places',
      state: 'places.create',
      roles: ['user']
    });
  }
]);
