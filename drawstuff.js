<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Raytraced + Alt Scene</title>
<style>
  body { background: #222; color: #eee; text-align: center; }
  canvas { background: #fff; display: block; margin: 1em auto; border:1px solid #555; }
</style>
</head>
<body>
<h3>Press SPACEBAR to switch scene</h3>
<canvas id="viewport" width="400" height="400"></canvas>

<script>
// -----------------
// IMAGE 1 (original random pixels/boxes)
// -----------------
function drawRandPixelsInInputBoxes(ctx) {
  // draw random tiny colored squares
  for (let i = 0; i < 2000; i++) {
    ctx.fillStyle = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    ctx.fillRect(Math.random()*ctx.canvas.width,
                 Math.random()*ctx.canvas.height,
                 3,3);
  }
}

// -----------------
// IMAGE 2 (new scene: triangles + ellipsoids + shading)
// -----------------
function drawInputEllipsoidsUsingArcs(ctx) {
  for (let i=0; i<5; i++) {
    let x = Math.random()*ctx.canvas.width;
    let y = Math.random()*ctx.canvas.height;
    let rx = 30+Math.random()*40;
    let ry = 15+Math.random()*30;
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(1, ry/rx);
    ctx.beginPath();
    ctx.fillStyle = `hsl(${Math.random()*360},60%,60%)`;
    ctx.arc(0,0,rx,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function drawInputTrainglesUsingPaths(ctx) {
  for (let i=0;i<6;i++){
    ctx.beginPath();
    ctx.moveTo(Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height);
    ctx.lineTo(Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height);
    ctx.lineTo(Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height);
    ctx.closePath();
    ctx.fillStyle = `hsl(${Math.random()*360},70%,70%)`;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.fill();
  }
}

function drawRandPixelsInInputTriangles(ctx){
  for (let i=0;i<500;i++){
    ctx.fillStyle=`rgba(0,0,0,${Math.random()})`;
    ctx.fillRect(Math.random()*ctx.canvas.width,Math.random()*ctx.canvas.height,1,1);
  }
}

function drawSecondImage() {
  const canvas = document.getElementById("viewport"); 
  const context = canvas.getContext("2d");
  // clear previous image
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawInputEllipsoidsUsingArcs(context);
  drawInputTrainglesUsingPaths(context);
  drawRandPixelsInInputTriangles(context);
}

// -----------------
// main on load
// -----------------
function main() {
  const canvas = document.getElementById("viewport"); 
  const context = canvas.getContext("2d");
  drawRandPixelsInInputBoxes(context); // original image 1
}
main();

// spacebar listener
window.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    drawSecondImage();
  }
});
</script>
</body>
</html>
