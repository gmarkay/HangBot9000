'use strict';
let hangApp = angular.module('Hangman', ['ui.router']);

hangApp.config(function ($stateProvider, $urlRouterProvider, $qProvider) {
  // $qProvider.errorOnUnhandledRejections(false);


  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',


      templateUrl: 'partials/home.html'
    })
    .state('game', {
      url: '/game',
      views: {
        '': {
          templateUrl: 'partials/game.html',
          controller: 'GameCtrl'
        },

        'userGame@game': {
          templateUrl: 'partials/user-game.html',
          controller: 'UserCtrl'
        },
        'botGame@game': {
          templateUrl: 'partials/bot-game.html',
          controller: 'BotCtrl'
        }
      }
    });
});
