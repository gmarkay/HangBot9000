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
        $scope.dashArr = [];
        $scope.botDashArr =[];
        buildGuessArea();
        $scope.$broadcast('initialized');
      });
  };
  function buildGuessArea() {

    console.log($scope.word);
    //creating word guessing area with dashes subbed for letters
    for (let i = 0; i < $scope.word.length; i++) {
      if ($scope.word[i] !=='-') {
        $scope.dashArr.push('_');
        $scope.botDashArr.push('_');
      }
    }
  }

});