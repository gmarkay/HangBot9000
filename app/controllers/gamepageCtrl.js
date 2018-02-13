'use strict';

angular.module('Hangman').controller('GamepageCtrl', function ($scope, GameFactory, $window, $timeout) {


$scope.initialize = (diff) => {
    $scope.showButton = true;
    let minLength;
    let maxLength;
    if (diff === 'easy') {
      minLength = 4;
      maxLength = 6;
    } else if (diff === 'med') {
      minLength = 6;
      maxLength = 9;
    } else if (diff === 'hard') {
      minLength = 9;
      maxLength = 12;
    }
    $scope.showButtons = false;
    $scope.showGame = true;
    GameFactory.getWord(minLength, maxLength)
      .then(randWord => {
        $scope.word = randWord;
        $scope.$broadcast('initialized');
      });
  };
});