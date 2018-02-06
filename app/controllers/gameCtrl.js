'use strict';

angular.module('Hangman').controller('GameCtrl', function ($scope, $window, $timeout) {


  var word = 'sap';
  $scope.wordArr = word.split('');

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");

  $scope.buildGameArea = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $scope.dashArr = [];
    $scope.wrongGuesses = [];

    ctx.beginPath();
    //foot
    ctx.moveTo(0, 300);
    ctx.lineTo(60, 300);
    ctx.stroke();
    //main trunk
    ctx.moveTo(30, 40);
    ctx.lineTo(30, 400);
    ctx.stroke();

    //line accross top
    ctx.moveTo(30, 40);
    ctx.lineTo(150, 40);
    ctx.stroke();

    //head holder
    ctx.moveTo(150, 40);
    ctx.lineTo(150, 70);
    ctx.stroke();
  };

  $scope.buildGuessArea = () => {
    for (let i = 0; i < word.length; i++) {
      $scope.dashArr.push('-');
    }
    console.log($scope.dashArr, 'dashes');
  };

  $scope.guesssLetter = function (e) {
    // return new Promise((resolve, reject)=>{
    if (e.which === 13) {
      if ($scope.guess === undefined || $scope.guess === '') {
        console.log('fail', $scope.guess);
      } else if ($scope.dashArr.includes($scope.guess) || $scope.wrongGuesses.includes($scope.guess)) {
        $window.alert(`You already guessed "${$scope.guess}". Guess Again`);
      } else {
        let correctGuess = [];
        for (let i = 0; i < $scope.wordArr.length; i++) {
          if ($scope.wordArr[i] === $scope.guess) {
            correctGuess.push(i);
          }
        }
        correctGuess.forEach((index) => {
          $scope.dashArr[index] = $scope.guess;

        });
        if (!$scope.wordArr.includes($scope.guess)) {
          $scope.wrongGuesses.push($scope.guess);
        }
        let failures = $scope.wrongGuesses.length;
        draw(failures);
      }

      $scope.guess = '';
      if ($scope.dashArr.join('') == word) {
        end('win');
      }
    }
  };

  function end(condition) {
    $timeout(function () {
      if (condition == 'win') {
        $window.alert('You win Congratulations');
      } else {
        $window.alert('You fail');
  
      }
      $scope.dashArr = [];
      $scope.wrongGuesses = [];
      $scope.showGame = false;
    }, 500);

  }

  function draw(part, counter) {

    switch (part) {
      case 1:
        //circle
        ctx.moveTo(185, 110);
        ctx.arc(150, 110, 34, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 2:
        //body
        ctx.moveTo(150, 143);
        ctx.lineTo(150, 215);
        ctx.stroke();
        break;
      case 3:
        //arm 1
        ctx.moveTo(150, 175);
        ctx.lineTo(120, 150);
        ctx.stroke();
        break;
      case 4:
        //arm 2
        ctx.moveTo(150, 175);
        ctx.lineTo(180, 150);
        ctx.stroke();
        break;
      case 5:
        //leg 1
        ctx.moveTo(150, 215);
        ctx.lineTo(110, 270);
        ctx.stroke();
        $window.alert('Three More Guess');

        break;
      case 6:
        //leg 2
        ctx.moveTo(150, 215);
        ctx.lineTo(190, 270);
        ctx.stroke();
        $window.alert('Two More Guesses');

        break;
      case 7:
        //eyes
        ctx.moveTo(147, 105);
        ctx.arc(139, 105, 8, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.moveTo(173, 105);
        ctx.arc(165, 105, 8, 0, 2 * Math.PI);
        ctx.stroke();
        $window.alert('One More Guess');
        break;
      case 8:
        ctx.moveTo(163, 135);
        ctx.arc(153, 135, 11, 0, Math.PI, true);
        ctx.stroke();
        end('fail');
        break;
    }
  }
});