var Point;

Point = function() {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(math.random(0, window.innerWidth), math.random(0, window.innerHeight), math.random(0, 5), 0, Math.PI * 2, true);
  ctx.closePath();
  return ctx.fill();
};

this;
