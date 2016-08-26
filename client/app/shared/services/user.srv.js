(function() {
  'use strict';
  var customService = function() {
    var $customService;
    $customService = function() {
      this.foo = function() {
        return 'foo';
      };
    };
    return new $customService();
  };
  angular.module('app.services').factory('$customService', customService);
})();
