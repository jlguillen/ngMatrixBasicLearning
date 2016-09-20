(function() {
  'use strict';
  var ddo = function() {
    return {
      controller: 'ejercicio1.ctrl',
      restrict: 'AE',
      scope: {},
      templateUrl: 'app/components/ejercicio1/ejercicio1.html'
    };
  };

  angular.module('ejercicio1')
    .directive('ejercicio1', ddo);
})();
