'use strict';

angular.module('Hangman').controller('BotCtrl', function ($scope, GameFactory, $window, $timeout, $rootScope) {
  var botCanvas = document.getElementById('botCanvas');
  var bctx = botCanvas.getContext("2d");

  $scope.$on('initialized', function () {
    $scope.showButtons = false;
    $scope.wrongGuesses = [];
    $scope.$parent.buildGallows(bctx, botCanvas);
    $scope.showDashArr = false;
  });

  //tracked number of letters guessed by bot
  let guessed = 0;
  $scope.$on('botTurn', function () {
    $scope.botGuessLetter();
  });

  $scope.botGuessLetter = () => {
    let word = $scope.word.toLowerCase();
    $scope.wordArr = word.split('');
    if (guessed < 4) {
      $scope.botGuess = getBotGuess(guessed, $scope.botDashArr.length);
      checkCorrect();
    } else {
      GameFactory.makeGuess(convertUrlString(), $scope.botDashArr, $scope.wrongGuesses)
        .then((result) => {
          $scope.botGuess = result;
          if (result.length > 1) {
            guessWord();
          } else {
            checkCorrect();
          }
          if ($scope.botDashArr.join('') == $scope.word) {
            $scope.$parent.end('win', 'bot');
            $scope.showDashArr = true;
          }
        });
    }
    $scope.botGuess = '';
    guessed++;
  };

  function guessWord() {
    let wordGuess = $scope.botGuess.split('');
    for (let i = 0; i < wordGuess.length; i++) {
      $scope.botDashArr[i] = wordGuess[i];
    }
    $scope.showDashArr = true;
  }

  function checkCorrect() {
    if ($scope.wordArr.includes($scope.botGuess)) {
      guessCorrect();
    } else {
      guessWrong();
    }
  }

  function guessCorrect() {
    let correctGuess = [];
    for (let i = 0; i < $scope.wordArr.length; i++) {
      if ($scope.wordArr[i] === $scope.botGuess) correctGuess.push(i);
    }
    //add correct letter to dash array at index in word
    correctGuess.forEach((index) => {
      $scope.botDashArr[index] = $scope.botGuess;
      $scope.fakeArray[index] = 'x';
    });
  }

  function guessWrong() {
    //add wrong guess to wrong array and then draw bodypart
    $scope.wrongGuesses.push($scope.botGuess);
    let failures = $scope.wrongGuesses.length;
    $scope.$parent.draw(failures, bctx);

  }
  //initial guesses for bot based on letter probability
  function getBotGuess(guessed, length) {
    let botGuess;
    switch (guessed) {
      case 0:
        if (length === 4) {
          botGuess = 'a';
        }
        else if (length === 5) {
          botGuess = 's';
        } else {
          botGuess = 'e';
        }
        break;
      case 1:
        if (length === 4 || length === 5) {
          botGuess = 'e';
        } else if (length === 6) {
          botGuess = 'a';
        } else {
          botGuess = 'i';
        }
        break;
      case 2:
        if (length === 4 || length > 9) {
          botGuess = 'o';
        } else if (length === 6) {
          botGuess = 'i';
        } else {
          botGuess = 'a';
        }
        break;
      case 3:
        if (length === 4) {
          botGuess = 'i';

        } else if (length < 10 && length > 4) {
          botGuess = 'o';
        } else {
          botGuess = 'a';
        }
        break;
    }
    return botGuess;
  }

  //format word pattern for api url
  function convertUrlString() {
    let guessPtrn = [];
    $scope.botDashArr.forEach((letter, i) => {
      if (letter === '_') {
        guessPtrn.push('%3F');
      } else {
        guessPtrn.push(letter);
      }
    });
    let guessString = guessPtrn.join('');
    return guessString;
  }
});