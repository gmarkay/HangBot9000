'use strict';

angular.module('Hangman').controller('BotCtrl', function ($scope, GameFactory, $window, $timeout) {

  var botCanvas = document.getElementById('botCanvas');
  var bctx = botCanvas.getContext("2d");

  $scope.$on('initialized', function(){
    $scope.showButtons = false;
    $scope.wrongGuesses = [];
    GameFactory.buildhangguy(bctx, botCanvas);

  });


  //tracked number of letters guessed by bot
  let guessed = 0;

  $scope.botGuessLetter = () => {
    let word = $scope.word.toLowerCase();
    let wordArr = word.split('');
    if(guessed <4){
    $scope.botGuess = getBotGuess(guessed, $scope.botDashArr.length);
    }else{
       GameFactory.makeGuess(convertUrlString(), $scope.botDashArr, $scope.wrongGuesses)
       .then((highestVal)=>{
        $scope.botGuess = highestVal;
        console.log($scope.botGuess);
       });
    }
    if(wordArr.includes($scope.botGuess)){
      guessCorrect(wordArr);
    }else{    
      guessWrong();
    }
    $scope.botGuess = '';
    if ($scope.botDashArr.join('') == $scope.word) {
      end('win');
    }
    guessed++;
  };
  function guessCorrect(wordArr) {
    console.log('here');
    let correctGuess = [];
    // console.log(wordArr);
    // console.log( $scope.botGuess);
    //find index of wordarray where guess matches word
    for (let i = 0; i < wordArr.length; i++) {
      if (wordArr[i] === $scope.botGuess) {
        correctGuess.push(i);
      }
    }
    //add correct letter to dash array at index in word
    correctGuess.forEach((index) => {
      console.log(  $scope.botDashArr[index], 'index');
      console.log(  $scope.botGuess, 'botguess');

      $scope.botDashArr[index] = $scope.botGuess;
    });
  }

  function guessWrong(){
    //add wrong guess to wrong array and then draw bodypart
    $scope.wrongGuesses.push($scope.botGuess);
    let failures = $scope.wrongGuesses.length;
    draw(failures);

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
    console.log(guessString, 'guessString');
    return guessString;
  }


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



  function draw(part, counter) {

    switch (part) {
      case 1:
        //head
        bctx.moveTo(185, 110);
        bctx.arc(150, 110, 34, 0, 2 * Math.PI);
        bctx.stroke();
        break;
      case 2:
        //body
        bctx.moveTo(150, 143);
        bctx.lineTo(150, 215);
        bctx.stroke();
        break;
      case 3:
        //arm 1
        bctx.moveTo(150, 175);
        bctx.lineTo(120, 150);
        bctx.stroke();
        break;
      case 4:
        //arm 2
        bctx.moveTo(150, 175);
        bctx.lineTo(180, 150);
        bctx.stroke();
        break;
      case 5:
        //leg 1
        bctx.moveTo(150, 215);
        bctx.lineTo(110, 270);
        bctx.stroke();
        $window.alert('Three More Guess');

        break;
      case 6:
        //leg 2
        bctx.moveTo(150, 215);
        bctx.lineTo(190, 270);
        bctx.stroke();
        $window.alert('Two More Guesses');

        break;
      case 7:
        //eyes
        bctx.moveTo(147, 105);
        bctx.arc(139, 105, 8, 0, 2 * Math.PI);
        bctx.stroke();

        bctx.moveTo(173, 105);
        bctx.arc(165, 105, 8, 0, 2 * Math.PI);
        bctx.stroke();
        $window.alert('One More Guess');
        break;
      case 8:
        //mouth
        bctx.moveTo(163, 135);
        bctx.arc(153, 135, 11, 0, Math.PI, true);
        bctx.stroke();
        end('fail');
        break;
    }
  }
});