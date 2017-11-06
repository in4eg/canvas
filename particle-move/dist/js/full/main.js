var Particle, animation, canvas, createParticles, ctx, drawParticles, height, killParticles, math, particleCount, particles, randomColor, setCanvasSize, updateParticles, width;

(function() {
  var requestAnimationFrame;
  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

math = {
  random: function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
};

randomColor = function() {
  var b, g, r;
  r = Math.floor(math.random(0, 500));
  g = Math.floor(math.random(0, 500));
  b = Math.floor(math.random(0, 500));
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

canvas = document.getElementById('canvas');

ctx = canvas.getContext('2d');

width = 0;

height = 0;

(setCanvasSize = function() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
})();

particles = [];

particleCount = 50;

animation = function() {
  createParticles();
  updateParticles();
  killParticles();
  drawParticles();
  requestAnimationFrame(animation);
};

Particle = function() {
  this.x = math.random(0, canvas.width);
  this.y = 0;
  this.speed = math.random(1, 5);
  this.radius = math.random(3, 10);
  this.color = randomColor();
  return this;
};

createParticles = function() {
  if (particles.length < particleCount) {
    particles.push(new Particle);
  }
};

updateParticles = function() {
  var i, part;
  for (i in particles) {
    part = particles[i];
    part.y += part.speed;
  }
};

killParticles = function() {
  var i, part;
  for (i in particles) {
    part = particles[i];
    if (part.y > canvas.height) {
      part.y = 0;
    }
  }
};

drawParticles = function() {
  var i, part;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i in particles) {
    part = particles[i];
    ctx.beginPath();
    ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = part.color;
    ctx.fill();
  }
};

requestAnimationFrame(animation);

window.addEventListener('resize', function() {
  setCanvasSize();
});
