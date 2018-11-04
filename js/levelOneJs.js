document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var x = canvas.width / 2, y = canvas.height - 30;
  var dx = 4, dy = -4;
  var radius = 10;
  var paddleHeight = 20, paddleWidth = 100, paddleX = (canvas.width - paddleWidth) / 2;
  var pressedRight = false, pressedLeft = false;
  var brickRowCount = 7;
  var brickColumnCount = 9;
  var brickWidth = 75, brickHeight = 20, brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 30;
  var bricks = [];
  var score = 0;
  var win = null;

  for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: true };
      }
  }
  //Listen for button presses
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

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


  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
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
              win = false;
          }
      }
  }

  function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if (bricks[c][r].status) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
      }
    }
  }

  function brickCollision() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = false;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        win = true;
                    }
                }
            }
        }
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ score, 8, 20);
  }

  function endScoreScreen() {
    ctx.font = "60px Arial";
    ctx.fillStyle = "#0095DD";
    if (win)
      ctx.fillText("You Won!", canvas.width/2 - 125, canvas.height/2);
    else
      ctx.fillText("You Lose!", canvas.width/2 - 125, canvas.height/2);
  }

  function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (win == null) {
      drawBallPlay();
      drawUserPaddel();
      drawBricks();
      brickCollision();
      checkBoundaries();
      drawScore();
      movePaddle();
      x += dx;
      y += dy;
    }
    else {
      endScoreScreen();
    }
    requestAnimationFrame(drawLoop);
  }

  drawLoop();
}
