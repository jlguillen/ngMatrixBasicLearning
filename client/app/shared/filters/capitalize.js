(function() {
  'use strict';
  angular.module('app.filters')
    .filter('capitalize', function() {
      return function(input) {
        if (!input) {
          return null;
        }
        if (input !== null) {
          input = input.toLowerCase();
        }
        return input.substring(0, 1).toUpperCase() + input.substring(1);
      };
    });
})();

