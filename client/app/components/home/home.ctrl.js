(function() {
  'use strict';
  var homeCtrl = function($scope) {
    $scope.section = 'home';
  };

  angular.module('home').controller('homeCtrl', homeCtrl);
})();
