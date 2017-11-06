do ->
  requestAnimationFrame = window.requestAnimationFrame or window.mozRequestAnimationFrame or window.webkitRequestAnimationFrame or window.msRequestAnimationFrame
  window.requestAnimationFrame = requestAnimationFrame
  return

canvas = document.getElementById 'canvas'

width = 0
height = 0

do setCanvasSize = ->
  width = window.innerWidth
  height = window.innerHeight

  canvas.width = width
  canvas.height = height
  return

ctx = canvas.getContext '2d'





drawPieChart = (canvasId, canvasWidth, canvasHeight, data_arr, label_arr, color_arr) ->
  canvas = document.getElementById(canvasId)
  canvas.height = canvasHeight
  canvas.width = canvasWidth
  cxt = canvas.getContext('2d')
  paddingBuffer = 20
  radius = canvasHeight / 2 - paddingBuffer
  ox = radius + paddingBuffer
  oy = radius + paddingBuffer


  totalValue = eval(data_arr.join('+'))
  startAngle = 0
  endAngle = 0
  i = 0
  while i < data_arr.length
    endAngle = endAngle + data_arr[i] / totalValue * Math.PI * 2
    cxt.fillStyle = color_arr[i]
    cxt.beginPath()
    cxt.moveTo ox, oy
    cxt.arc ox, oy, radius, startAngle, endAngle, false
    cxt.closePath()
    cxt.fill()
    startAngle = endAngle
    cxt.fillStyle = color_arr[i]
    cxt.fillRect canvasWidth - paddingBuffer - 100, paddingBuffer + 20 * i, 20, 20
    cxt.font = 'bold 12px sans-serif'


    cxt.fillText label_arr[i] + ':' + data_arr[i], canvasWidth - paddingBuffer - 70, paddingBuffer + 20 * i + 12
    i++
  return

window.onload = ->
  data_arr = [
    20
    50
    90
    10
  ]
  label_arr = [
    'firts'
    'secound'
    'third'
    'fourth'
  ]
  color_arr = [
    '#F24'
    '#FA0'
    '#0AB'
    '000'
  ]
  drawPieChart 'canvas', 400, 300, data_arr, label_arr, color_arr
  return

window.addEventListener 'resize', ->
  setCanvasSize()

  return