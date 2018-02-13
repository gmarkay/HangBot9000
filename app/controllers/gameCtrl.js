'use strict';

angular.module('Hangman').controller('GameCtrl', function ($scope, GameFactory, $window, $timeout) {

  $scope.button = 'Start Game';
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");

  var botCanvas = document.getElementById('botCanvas');
  var bctx = botCanvas.getContext("2d");
  let canvases = [ctx, bctx];
  console.log(canvases);

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
        buildGuessArea();

      });
    buildGameArea();
  };

  function buildGameArea() {
    $scope.showButtons = false;
    $scope.dashArr = [];
    $scope.botDashArr = [];
    $scope.wrongGuesses = [];
    $scope.botWrongGuesses = [];

    canvases.forEach((canvas)=>{
    canvas.clearRect(0, 0, canvas.width, canvas.height);
 
      canvas.beginPath();
      //foot
      canvas.moveTo(0, 300);
      canvas.lineTo(60, 300);
      canvas.stroke();
      //main trunk
      canvas.moveTo(30, 40);
      canvas.lineTo(30, 400);
      canvas.stroke();
  
      //line accross top
      canvas.moveTo(30, 40);
      canvas.lineTo(150, 40);
      canvas.stroke();
  
      //head holder
      canvas.moveTo(150, 40);
      canvas.lineTo(150, 70);
      canvas.stroke();
    });

  
  }


  function buildGuessArea() {
    //creating word guessing area with dashes subbed for letters
    for (let i = 0; i < $scope.word.length; i++) {
      if ($scope.word[i] === '-') {
        $scope.dashArr.push('-');
        $scope.botDashArr.push('-');
      } else {
        $scope.dashArr.push('_');
        $scope.botDashArr.push('_');

      }
    }
  }

  //tracked number of letters guessed by bot
  let guessed = 0;
  $scope.botGuessLetter = () => {
    let word = $scope.word.toLowerCase();
    let botWordArr = word.split('');
    if(guessed <4){
    $scope.botGuess = getBotGuess(guessed, $scope.dashArr.length);
    }else{
       GameFactory.makeGuess(convertUrlString(), $scope.botDashArr, $scope.botWrongGuesses)
       .then((highestVal)=>{
        $scope.botGuess = highestVal;
        console.log($scope.botGuess);
       });
    }

    if(botWordArr.includes($scope.botGuess)){
      guessCorrect(botWordArr);
    }else{    
      guessWrong();
    }
    $scope.botGuess = '';
    if ($scope.botDashArr.join('') == $scope.word) {
      end('win');
    }
    guessed++;
  };
  function guessCorrect(botWordArr) {
    let botCorrectGuess = [];
    //find index of wordarray where guess matches word
    for (let i = 0; i < botWordArr.length; i++) {
      if (botWordArr[i] === $scope.botGuess) {
        botCorrectGuess.push(i);
      }
    }
    //add correct letter to dash array at index in word
    console.log($scope.botGuess);
    console.log(botCorrectGuess, 'correctguess');
    console.log($scope.botDashArr);
    botCorrectGuess.forEach((index) => {
      $scope.botDashArr[index] = $scope.botGuess;
    });
  }

  function guessWrong(){
    //add wrong guess to wrong array and then draw bodypart
    $scope.botWrongGuesses.push($scope.botGuess);
    let failures = $scope.botWrongGuesses.length;
    draw(failures, 'bot');

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
   function convertUrlString(){
    let guessPtrn =[];
    $scope.botDashArr.forEach((letter, i) => {
      if (letter === '_') {
        guessPtrn.push('%3F');
      } else {
        guessPtrn.push(letter);
      }
    });
    let guessString = guessPtrn.join('');
    console.log(guessString);
    return guessString;
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
      let humanFailures = $scope.wrongGuesses.length;
      draw(humanFailures, 'human');

    }

    $scope.guess = '';
    if ($scope.dashArr.join('') == word) {
      end('win');
    }
    $scope.botGuessLetter();
  }

  };


  function end(condition) {
    $timeout(function () {
      guessed = 0;
      if (condition == 'win') {
        $window.alert('You win Congratulations');
      } else {
        $window.alert('You fail');

      }
      $scope.showButton = false;
      $scope.button = 'Play again';
    }, 500);
  }


let area;
  function draw(part, player) {
    if(player === 'human'){
      area = ctx;
    } else{
      area = bctx;
    }

switch (part) {
      case 1:
        //head
        area.moveTo(185, 110);
        area.arc(150, 110, 34, 0, 2 * Math.PI);
        area.stroke();
        break;
      case 2:
        //body
        area.moveTo(150, 143);
        area.lineTo(150, 215);
        area.stroke();
        break;
      case 3:
        //arm 1
        area.moveTo(150, 175);
        area.lineTo(120, 150);
        area.stroke();
        break;
      case 4:
        //arm 2
        area.moveTo(150, 175);
        area.lineTo(180, 150);
        area.stroke();
        break;
      case 5:
        //leg 1
        area.moveTo(150, 215);
        area.lineTo(110, 270);
        area.stroke();
        $window.alert('Three More Guess');

        break;
      case 6:
        //leg 2
        area.moveTo(150, 215);
        area.lineTo(190, 270);
        area.stroke();
        $window.alert('Two More Guesses');

        break;
      case 7:
        //eyes
        area.moveTo(147, 105);
        area.arc(139, 105, 8, 0, 2 * Math.PI);
        area.stroke();

        area.moveTo(173, 105);
        area.arc(165, 105, 8, 0, 2 * Math.PI);
        area.stroke();
        $window.alert('One More Guess');
        break;
      case 8:
        //mouth
        area.moveTo(163, 135);
        area.arc(153, 135, 11, 0, Math.PI, true);
        area.stroke();
        end('fail');
        break;
    }
  }
});