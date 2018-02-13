'use strict';
let hangApp = angular.module('Hangman', ['ui.router']);

hangApp.config(function($stateProvider, $urlRouterProvider, $qProvider){
  // $qProvider.errorOnUnhandledRejections(false);


  $urlRouterProvider.otherwise('/home');

  $stateProvider
  .state('home', {
    url: '/home',

    
    templateUrl: 'partials/home.html'
    })
    .state('game', {
      url: '/game',
      views:{  
        '': {templateUrl: 'partials/game-page.html',
             controller: 'GamepageCtrl'
        },
        
        'userGame@game':{
          templateUrl: 'partials/game.html',
          controller: 'GameCtrl'
        },
        'botGame@game':{
          templateUrl: 'partials/bot-game.html',
          controller: 'BotCtrl'
        }
      }
    });
  //   url: 'partials/game.html',
  //   controller: 'GameCtrl'
  // });
});
