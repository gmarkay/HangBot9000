'use strict';

angular.module('Hangman').controller('GameCtrl', function ($scope, GameFactory, $window, $timeout) {
  
  $scope.button = 'Start Game';
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");

  $scope.clearBoard = () =>{
    $scope.showButtons = true;
    $scope.hideButton = true;
    $scope.showGame = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $scope.dashArr = [];
    $scope.wrongGuesses = [];

  };

  $scope.initialize = (diff) => {
    let minLength;
    let maxLength;
    if (diff === 'easy') {
      minLength = 3;
      maxLength = 5;
    } else if (diff === 'med') {
      minLength = 5;
      maxLength = 8;
    } else if (diff === 'hard') {
      minLength = 7;
      maxLength = 12;
    }
    $scope.showButtons = false;
    $scope.showGame = true;
    GameFactory.getWord(minLength, maxLength)
      .then(gameWord => {
        $scope.word = gameWord;
        buildGuessArea($scope.word);
        console.log(gameWord);
      });
    buildGameArea();
  };

  function buildGameArea() {
  

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
  }

  function buildGuessArea(word) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === '-') {
        $scope.dashArr.push('-');
      } else {
        $scope.dashArr.push('_');
      }
    }
  }

  $scope.guesssLetter = function (e, word) {

    if (e.which === 13) {
      word = word.toLowerCase();

      let wordArr = word.split('');
      if ($scope.guess === undefined || $scope.guess === '') {
        console.log('fail', $scope.guess);
      } else if ($scope.dashArr.includes($scope.guess) || $scope.wrongGuesses.includes($scope.guess)) {
        $window.alert(`You already guessed "${$scope.guess}". Guess Again`);
      } else {
        let correctGuess = [];
        for (let i = 0; i < wordArr.length; i++) {
          if (wordArr[i] === $scope.guess) {
            correctGuess.push(i);
          }
        }
        correctGuess.forEach((index) => {
          $scope.dashArr[index] = $scope.guess;

        });
        if (!wordArr.includes($scope.guess)) {
          $scope.wrongGuesses.push($scope.guess);
        }
        let failures = $scope.wrongGuesses.length;
        draw(failures, word);
      }

      $scope.guess = '';
      if ($scope.dashArr.join('') == word) {
        end('win', word);
      }
    }
  };

  function end(condition, theWord) {
    console.log(theWord, 'in end');
    $timeout(function () {
      if (condition == 'win') {
        $window.alert('You win Congratulations');
      } else {
        $window.alert(`You failed to guess ${theWord}`);
      }
      $scope.hideButton = false;
      $scope.button = 'Play again';
    }, 500);
  }

  function draw(part, word) {
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
        end('fail', word);
        break;
    }
  }
});