'use strict';

angular.module('Hangman').controller('UserCtrl', function ($scope, GameFactory, $window, $timeout, $rootScope) {


  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");

  $scope.$on('initialized', function () {
    $scope.showButtons = false;
    $scope.wrongGuesses = [];
    $scope.$parent.buildGallows(ctx, canvas);
    $scope.wordArr = $scope.word.toLowerCase().split('');

  });
  $scope.guesssLetter = function (e) {
    if (e.which === 13) {
      $scope.guess = $scope.guess.toLowerCase();
      if (!$scope.guess) $window.alert(`Please Enter a Letter`);
      else if ($scope.dashArr.includes($scope.guess) || $scope.wrongGuesses.includes($scope.guess)) {
        $window.alert(`You already guessed "${$scope.guess}". Guess Again`);
      } else {
        if (!$scope.wordArr.includes($scope.guess)) $scope.wrongGuesses.push($scope.guess);
        getCorrectGuess($scope.guess);
        let failures = $scope.wrongGuesses.length;
        $scope.$parent.draw(failures, ctx);
        $rootScope.$broadcast('botTurn');
      }
      $scope.guess = '';
      if ($scope.dashArr.join('') == $scope.word) $scope.$parent.end('win', 'user');

    }
  };

  function getCorrectGuess(guess) {
    let correctGuess = [];
    for (let i = 0; i < $scope.wordArr.length; i++) {
      if ($scope.wordArr[i] === guess){
      correctGuess.push(i);
      $scope.dashArr[i] = guess;
      }
    }
  }

  $scope.guessWord = function (e) {
    if (e.which === 13) {
      $scope.wordGuess = $scope.wordGuess.toLowerCase();
      if ($scope.word === $scope.wordGuess) {
        let wordGuessArr = $scope.wordGuess.split('');
        for (let i = 0; i < wordGuessArr.length; i++) {
          getCorrectGuess(wordGuessArr[i]);
        }
        $scope.$parent.end('win', 'user');
      } else {
        for (let i = $scope.wrongGuesses.length; i < 9; i++) {
          $scope.$parent.draw(i, ctx);
        }
      }
      $scope.wordGuess = '';
      $scope.showGuessWord = false;
    }
  };
  $scope.buyALetter = () => {
    let buyArr = $scope.wordArr.map(item => item);

    for (let i = 0; i < $scope.wordArr.length; i++) {
      for (let j = 0; j < $scope.dashArr.length; j++) {
        if ($scope.wordArr[i] === $scope.dashArr[j]) {
          buyArr = buyArr.filter(l => l !== $scope.wordArr[i]);

        }
      }
    }
    let bought = buyArr[Math.floor(Math.random() * buyArr.length)];
    getCorrectGuess(bought);
  };

});
