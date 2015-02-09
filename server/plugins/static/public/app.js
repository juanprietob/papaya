'use strict';

// Declare app level module which depends on views, and components
angular.module('papaya', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: 'home/papayaHome.html'
  })
  .when('/about', {
    templateUrl: 'about/papayaAbout.html'
  })
  .otherwise({redirectTo: '/home'});
}]);
