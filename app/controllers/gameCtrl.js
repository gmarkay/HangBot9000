'use strict';

angular.module('Hangman').controller('GameCtrl', function ($scope, GameFactory, $window, $timeout) {

$scope.button = 'Start Game';

$scope.switchButtons = ()=>{
  $scope.showButtons=true;
  $scope.showButton = true;
  $scope.showWelcome = true;

};
$scope.initialize = (diff) => {
  $scope.isSaving = false;
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
    $scope.gameOver = false;
    GameFactory.getWord(minLength, maxLength)
      .then(randWord => {
        $scope.word = randWord;
        $scope.dashArr = [];
        $scope.botDashArr =[];
        $scope.fakeArray = [];
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
        $scope.fakeArray.push('_');
        $scope.botDashArr.push('_');
      }
    }
  }
  $scope.buildGallows = (context, canvas) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    //foot
    context.moveTo(0, 300);
    context.lineTo(60, 300);
    context.stroke();
    //main trunk
    context.moveTo(30, 40);
    context.lineTo(30, 400);
    context.stroke();

    //line accross top
    context.moveTo(30, 40);
    context.lineTo(150, 40);
    context.stroke();

    //head holder
    context.moveTo(150, 40);
    context.lineTo(150, 70);
    context.stroke();
  };



  $scope.draw = (part, context) => {
    console.log(context.canvas, 'id');
    switch (part) {
      case 1:
        //head
        context.moveTo(185, 110);
        context.arc(150, 110, 34, 0, 2 * Math.PI);
        context.stroke();
        break;
      case 2:
        //body
        context.moveTo(150, 143);
        context.lineTo(150, 215);
        context.stroke();
        break;
      case 3:
        //arm 1
        context.moveTo(150, 175);
        context.lineTo(120, 150);
        context.stroke();
        break;
      case 4:
        //arm 2
        context.moveTo(150, 175);
        context.lineTo(180, 150);
        context.stroke();
        break;
      case 5:
        //leg 1
        context.moveTo(150, 215);
        context.lineTo(110, 270);
        context.stroke();
        // $window.alert('Three More Guess');

        break;
      case 6:
        //leg 2
        context.moveTo(150, 215);
        context.lineTo(190, 270);
        context.stroke();
        // $window.alert('Two More Guesses');

        break;
      case 7:
        //eyes
        context.moveTo(147, 105);
        context.arc(139, 105, 8, 0, 2 * Math.PI);
        context.stroke();

        context.moveTo(173, 105);
        context.arc(165, 105, 8, 0, 2 * Math.PI);
        context.stroke();
        // $window.alert('One More Guess');
        break;
      case 8:
        //mouth
        context.moveTo(163, 135);
        context.arc(153, 135, 11, 0, Math.PI, true);
        context.stroke();
        if(context.canvas.id=== 'myCanvas'){
          $scope.end('fail');
        }
        break;
    }
  };


  $scope.end = (condition, player) => {
    $scope.isSaving = true;
    $timeout(function () {
      // letguessed = 0;
      if (condition == 'win') {
        if(player === 'user'){
        $window.alert('You win Congratulations');
        }else if(player === 'bot'){
          $window.alert(`Hangbot9000 beat you, the word is:${$scope.word}`);
        }
      } else {
        $window.alert(`You fail, the word is: ${$scope.word}` );

      }
      $scope.showButton = false;
      $scope.gameOver = true;
      $scope.button = 'Play again';
    }, 500);
  };
});

