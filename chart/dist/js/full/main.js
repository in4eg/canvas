var canvas, ctx, drawPieChart, height, setCanvasSize, width;

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

drawPieChart = function(canvasId, canvasWidth, canvasHeight, data_arr, label_arr, color_arr) {
  var cxt, endAngle, i, ox, oy, paddingBuffer, radius, startAngle, totalValue;
  canvas = document.getElementById(canvasId);
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  cxt = canvas.getContext('2d');
  paddingBuffer = 20;
  radius = canvasHeight / 2 - paddingBuffer;
  ox = radius + paddingBuffer;
  oy = radius + paddingBuffer;
  totalValue = eval(data_arr.join('+'));
  startAngle = 0;
  endAngle = 0;
  i = 0;
  while (i < data_arr.length) {
    endAngle = endAngle + data_arr[i] / totalValue * Math.PI * 2;
    cxt.fillStyle = color_arr[i];
    cxt.beginPath();
    cxt.moveTo(ox, oy);
    cxt.arc(ox, oy, radius, startAngle, endAngle, false);
    cxt.closePath();
    cxt.fill();
    startAngle = endAngle;
    cxt.fillStyle = color_arr[i];
    cxt.fillRect(canvasWidth - paddingBuffer - 100, paddingBuffer + 20 * i, 20, 20);
    cxt.font = 'bold 12px sans-serif';
    cxt.fillText(label_arr[i] + ':' + data_arr[i], canvasWidth - paddingBuffer - 70, paddingBuffer + 20 * i + 12);
    i++;
  }
};

window.onload = function() {
  var color_arr, data_arr, label_arr;
  data_arr = [20, 50, 90, 10];
  label_arr = ['firts', 'secound', 'third', 'fourth'];
  color_arr = ['#F24', '#FA0', '#0AB', '000'];
  drawPieChart('canvas', 400, 300, data_arr, label_arr, color_arr);
};

window.addEventListener('resize', function() {
  setCanvasSize();
});
