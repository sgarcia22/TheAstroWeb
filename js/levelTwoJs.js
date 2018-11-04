document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

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

  }



  function drawLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawLoop);
  }

  drawLoop();
}
