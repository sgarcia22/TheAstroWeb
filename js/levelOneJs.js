document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var x = canvas.width / 2, y = canvas.height - 30;
  var dx = 2, dy = -2;
  var radius = 10;
  var paddleHeight = 10, paddleWidth = 75, paddleX = (canvas.width - paddleWidth) / 2;
  var pressedRight = false, pressedLeft = false;

  //Listen for button presses
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler (e) {
    if (e.keyCode == 39)
      pressedRight = true;
    if (e.keyCode == 37)
      pressedLeft = true;
  }

  function keyUpHandler (e) {
    if (e.keyCode == 39)
      pressedRight = false;
    if (e.keyCode == 37)
      pressedLeft = false;
  }

  function drawBallPlay() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  function drawUserPaddel() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

  function movePaddle() {
    if (pressedRight && paddleX < canvas.width - paddleWidth)
      paddleX += 7;
    else if (pressedLeft && paddleX > 0)
      paddleX -= 7;
  }

  function checkBoundaries() {
      if(x + dx > canvas.width-radius || x + dx < radius) {
          dx = -dx;
      }
      if(y + dy < radius) {
          dy = -dy;
      }
      else if(y + dy > canvas.height-radius) {
          if(x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
          }
          else {
              alert("GAME OVER");
              document.location.reload();
          }
      }
  }

  function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBallPlay();
    drawUserPaddel();
    checkBoundaries();
    movePaddle();
    x += dx;
    y += dy;
  }

  //Updates the canvas every 10 milliseconds
  setInterval(drawLoop, 10);

}
