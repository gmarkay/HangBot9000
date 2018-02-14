'use strict';

angular.module('Hangman').controller('UserCtrl', function ($scope, GameFactory, $window, $timeout, $rootScope) {


  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");



  $scope.$on('initialized', function () {
    $scope.showButtons = false;
    $scope.wrongGuesses = [];
    $scope.$parent.buildGallows(ctx, canvas);

  });

  $scope.guesssLetter = function (e) {
    if (e.which === 13) {
      let word = $scope.word.toLowerCase();
      $scope.wordArr = word.split('');
      if ($scope.guess === undefined || $scope.guess === '') {
      } else if ($scope.dashArr.includes($scope.guess) || $scope.wrongGuesses.includes($scope.guess)) {
        $window.alert(`You already guessed "${$scope.guess}". Guess Again`);
      } else {
        if (!$scope.wordArr.includes($scope.guess))$scope.wrongGuesses.push($scope.guess);
        let guess = $scope.guess;
        getCorrectGuess(guess);
        let failures = $scope.wrongGuesses.length;
        $scope.$parent.draw(failures, ctx);
        $rootScope.$broadcast('botTurn');
      }
      $scope.guess = '';
      if ($scope.dashArr.join('') == word) $scope.$parent.end('win', 'user');
    }
  };


  function getCorrectGuess(guess){
    let correctGuess = [];
    for (let i = 0; i < $scope.wordArr.length; i++) {
      if ($scope.wordArr[i] === guess) correctGuess.push(i);
    }
    correctGuess.forEach((index) => {
      $scope.dashArr[index] = guess;
    });
  }

  $scope.guessWord = function(e){
    if (e.which === 13) {
      let word = $scope.word.toLowerCase();

      if(word === $scope.wordGuess.toLowerCase()){
        let wordGuessArr = $scope.wordGuess.split('');
        for(let i = 0; i<wordGuessArr.length; i++){
          getCorrectGuess(wordGuessArr[i], word);
        }
        $scope.$parent.end('win', 'user');

      }else{
        $scope.$parent.end('fail', 'user');

      }
      $scope.wordGuess = '';
      $scope.showGuessWord=false;
    }
  };
});