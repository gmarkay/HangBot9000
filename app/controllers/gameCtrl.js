'use strict';

angular.module('Hangman').controller('GameCtrl', function ($scope, GameFactory, $window, $timeout) {

  $scope.button = 'Start Game';
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");

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
      .then(retWord => {
        $scope.word = retWord;
        buildGuessArea($scope.word);

      });
    buildGameArea();
  };

  function buildGameArea() {
    $scope.showButtons = false;
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
  }


  function buildGuessArea(word) {
    //creating word guessing area with dashes subbed for letters
    for (let i = 0; i < word.length; i++) {
      if (word[i] === '-') {
        $scope.dashArr.push('-');
      } else {
        $scope.dashArr.push('_');
      }
    }
  }

  //tracked number of letters guessed for bot guess
  let guessed = 0;
  // track the nubmer of correctly guessed letters
  let correctLetter = [];
  $scope.botGuessLetter = (word) => {
    // let wordLength = $scope.dashArr.length;
    word = word.toLowerCase();
    let wordArr = word.split('');
    let correctGuess = [];
    // if(correctLetter.length < 2){
    console.log(guessed, guessed);
    $scope.guess = getBotGuess(guessed, $scope.dashArr.length);
    // }else{
    //   console.log('you have to correct guesses');
    // }

    //if guess is correct
    for (let i = 0; i < wordArr.length; i++) {
      if (wordArr[i] === $scope.guess) {
        correctGuess.push(i);
        correctLetter.push(i);
      }
    }
    //add correct letter to dash array in game
    correctGuess.forEach((index) => {
      $scope.dashArr[index] = $scope.guess;

    });
    //if guess is wrong, add to array
    if (!wordArr.includes($scope.guess)) {
      $scope.wrongGuesses.push($scope.guess);
    }
    let failures = $scope.wrongGuesses.length;
    draw(failures);


    $scope.guess = '';
    if ($scope.dashArr.join('') == word) {
      end('win');
    }
    guessed++
    // GameFactory.makeGuess(dashArr);

    // console.log($scope.dashArr, 'what?');
    // guessedArr.push($scope.dashArr);
    // console.log(guessedArr, 'guessed arr')
    // $scope.guess = botGuess;
  };

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


  /*
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
                correctLetter.push(i);
              }
            }
            correctGuess.forEach((index) => {
              $scope.dashArr[index] = $scope.guess;
    
            });
            if (!wordArr.includes($scope.guess)) {
              $scope.wrongGuesses.push($scope.guess);
            }
            let failures = $scope.wrongGuesses.length;
            draw(failures);
        
          }
          console.log(correctLetter);
    
          $scope.guess = '';
          if ($scope.dashArr.join('') == word) {
            end('win');
          }
        }
    
      }; 
      */



  function end(condition) {
    $timeout(function () {
      if (condition == 'win') {
        $window.alert('You win Congratulations');
      } else {
        $window.alert('You fail');

      }
      $scope.showButton = false;
      $scope.button = 'Play again';
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