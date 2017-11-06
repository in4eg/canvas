var canvas, ctx, height, i, points, setCanvasSize, width;

(function() {
  var requestAnimationFrame;
  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

canvas = document.getElementById('canvas');

width = 0;

height = 0;

(setCanvasSize = function() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
})();

ctx = canvas.getContext('2d');

points = [];

for (i = 0; i < 100; i++) {
  points.push(new Point(10, 20));
}

window.addEventListener('resize', function() {
  setCanvasSize();
});
