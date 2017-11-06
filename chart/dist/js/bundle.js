var math;

math = {
  random: function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
};

console.log(math.random(0, 10));
;
var math;math={random:function(min,max){return Math.round(Math.random()*(max-min)+min);}};console.log(math.random(0,10));;var Point;

Point = function() {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(math.random(0, window.innerWidth), math.random(0, window.innerHeight), math.random(0, 5), 0, Math.PI * 2, true);
  ctx.closePath();
  return ctx.fill();
};

this;
;
var Point;Point=function(){ctx.beginPath();ctx.fillStyle='#fff';ctx.arc(math.random(0,window.innerWidth),math.random(0,window.innerHeight),math.random(0,5),0,Math.PI*2,true);ctx.closePath();return ctx.fill();};this;;var canvas, ctx, height, i, points, setCanvasSize, width;

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
;
var canvas,ctx,height,i,points,setCanvasSize,width;(function(){var requestAnimationFrame;requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;window.requestAnimationFrame=requestAnimationFrame;})();canvas=document.getElementById('canvas');width=0;height=0;(setCanvasSize=function(){width=window.innerWidth;height=window.innerHeight;canvas.width=width;canvas.height=height;})();ctx=canvas.getContext('2d');points=[];for(i=0;i<100;i++){points.push(new Point(10,20));}
window.addEventListener('resize',function(){setCanvasSize();});