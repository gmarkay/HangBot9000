'use strict';

angular.module('Hangman').controller('UserCtrl', function ($scope, GameFactory, $window, $timeout, $rootScope) {


  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");



  $scope.$on('initialized', function () {
    $scope.showButtons = false;
    $scope.wrongGuesses = [];
    // GameFactory.buildhangguy(ctx, canvas);
    $scope.$parent.buildGallows(ctx, canvas);

  });

  $scope.guesssLetter = function (e) {
    if (e.which === 13) {
      let word = $scope.word.toLowerCase();
      let wordArr = word.split('');
      if ($scope.guess === undefined || $scope.guess === '') {
        console.log('fail', $scope.guess);
      } else if ($scope.dashArr.includes($scope.guess) || $scope.wrongGuesses.includes($scope.guess)) {
        $window.alert(`You already guessed "${$scope.guess}". Guess Again`);
      } else {
        let correctGuess = [];
        for (let i = 0; i < wordArr.length; i++) {
          if (wordArr[i] === $scope.guess) correctGuess.push(i);
        }
        correctGuess.forEach((index) => {
          $scope.dashArr[index] = $scope.guess;
        });
        if (!wordArr.includes($scope.guess))$scope.wrongGuesses.push($scope.guess);

        let failures = $scope.wrongGuesses.length;
        $scope.$parent.draw(failures, ctx);

        $rootScope.$broadcast('botTurn');
        
      }

      $scope.guess = '';
      if ($scope.dashArr.join('') == word) $scope.$parent.end('win', 'user');
    }
  };

});