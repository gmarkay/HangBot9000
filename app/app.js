'use strict';
angular.module('Hangman', ['ngRoute'])
.config($routeProvider =>{
  $routeProvider
  .when('/game',{
    templateUrl: 'partials/game.html',
    controller: 'GameCtrl'
  });
  
});
