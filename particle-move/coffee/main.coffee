do ->
  requestAnimationFrame = window.requestAnimationFrame or window.mozRequestAnimationFrame or window.webkitRequestAnimationFrame or window.msRequestAnimationFrame
  window.requestAnimationFrame = requestAnimationFrame
  return

math =
  random: (min, max)->
    return Math.round Math.random() * (max - min) + min


randomColor = ->
  r = Math.floor(math.random(0, 500))
  g = Math.floor( math.random(0, 500))
  b = Math.floor( math.random(0, 500))
  'rgb(' + r + ',' + g + ',' + b + ')'

canvas = document.getElementById 'canvas'
ctx = canvas.getContext '2d'

width = 0
height = 0

do setCanvasSize = ->
  width = window.innerWidth
  height = window.innerHeight

  canvas.width = width
  canvas.height = height
  return


particles = []
particleCount = 50

animation = ->
  createParticles()
  updateParticles()
  killParticles()
  drawParticles()
  requestAnimationFrame animation
  return

Particle = ->
  @x = math.random(0, canvas.width)
  @y = 0
  @speed = math.random(1, 5)
  @radius = math.random(3, 10)
  @color = randomColor()

  @

createParticles = ->
  if particles.length < particleCount
    particles.push new Particle
  return

updateParticles = ->
  for i of particles
    part = particles[i]
    part.y += part.speed
  return

killParticles = ->
  for i of particles
    part = particles[i]
    if part.y > canvas.height
      part.y = 0
  return

drawParticles = ->
  ctx.clearRect 0, 0, canvas.width, canvas.height

  for i of particles
    part = particles[i]
    ctx.beginPath()
    ctx.arc part.x, part.y, part.radius, 0, Math.PI * 2
    ctx.closePath()
    ctx.fillStyle = part.color
    ctx.fill()
  return

requestAnimationFrame animation


window.addEventListener 'resize', ->
  setCanvasSize()

  return