
let word = 'sasquatch';
let wordArr = word.split('');
let wrongGuesses = [];

let buildGuessArea = (function () {

  for (let i = 0; i < word.length; i++) {
    $('#wordArea').append(`<li id='${i}'>_</li>`);

  };

})();

$(document).keypress(guessLetter);

function guessLetter(e) {
  if (e.which == 13) {
    let inputVal = $('#guessLetter').val();
    wordArr.forEach((letter, i) => {
      if (letter == inputVal) {
        $(`#${i}`).html(letter);
      }
    });
    if (!wordArr.includes(inputVal)) {
      wrongGuesses.push(inputVal);
      $('#wrongLetters').append(inputVal);

    };
    let failures = wrongGuesses.length;
    draw(failures);
  }
};


function draw(part) {

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");
  console.log(ctx);
  switch (part) {
    case 1:
      ctx.beginPath();
      //foot
      ctx.moveTo(0, 300);
      ctx.lineTo(60, 300);
      ctx.stroke();
      break;
    case 2:
      //main trunk
      ctx.moveTo(30, 40);
      ctx.lineTo(30, 400);
      ctx.stroke();
      break;
    case 3:
      //line accross top
      ctx.moveTo(30, 40);
      ctx.lineTo(150, 40);
      ctx.stroke();
      break;
    case 4:
      //head holder
      ctx.moveTo(150, 40);
      ctx.lineTo(150, 70);
      ctx.stroke();
      break;
    case 5:
      //circle
      ctx.moveTo(185, 110);
      ctx.arc(150, 110, 34, 0, 2 * Math.PI);
      ctx.stroke();
      break;
    case 6:
      //body
      ctx.moveTo(150, 143);
      ctx.lineTo(150, 215);
      ctx.stroke();
      break;
    case 7:
      //arm 1
      ctx.moveTo(150, 175);
      ctx.lineTo(120, 150);
      ctx.stroke();
      break;
    case 8:
      //arm 2
      ctx.moveTo(150, 175);
      ctx.lineTo(180, 150);
      ctx.stroke();
      break;
    case 9:
      //leg 1
      ctx.moveTo(150, 215);
      ctx.lineTo(110, 270);
      ctx.stroke();
      break;
    case 10:
      //leg 2
      ctx.moveTo(150, 215);
      ctx.lineTo(190, 270);
      ctx.stroke();
      break;
    case 11:
      //eyes
      ctx.moveTo(147, 105);
      ctx.arc(139, 105, 8, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.moveTo(173, 105);
      ctx.arc(165, 105, 8, 0, 2 * Math.PI);
      ctx.stroke();
      break
    case 12:
      ctx.moveTo(163, 135);
      ctx.arc(153, 135, 11, 0, Math.PI, true);
      ctx.stroke();
      break;
  }
};