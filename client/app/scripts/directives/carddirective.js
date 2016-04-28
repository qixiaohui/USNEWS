'use strict';

/**
 * @ngdoc directive
 * @name dingdangApp.directive:cardDirective
 * @description
 * # cardDirective
 */
app.directive('cardDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the cardDirective directive');
      }
    };
  });
