'use strict';

/**
 * @ngdoc filter
 * @name dingdangApp.filter
 * @description
 * # filter
 * filter in the dingdangApp.
 */
angular.module('dingdangApp').filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=0; i<range; i++){
      val.push(i);
    }
    return val;
  };
});