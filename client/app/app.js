(function() {
  'use strict';
  angular.module('app', ['app.filters', 'app.services', 'home', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'app/components/home/home.html',
          controller: 'homeCtrl',
          resolve: {
            authenticated: function($location) {
              return $location.path('/home');
            }
          }
        });
      $urlRouterProvider.otherwise('/home');
    });
})();

