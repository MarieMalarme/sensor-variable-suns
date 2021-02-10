window.onload = () => {
  const body = document.querySelector('body')
  const { innerWidth, innerHeight } = window

  // create the suns to appear at random positions on the window
  suns.map((i) => {
    const sun = document.createElement('div')
    sun.id = `sun-${i}`
    sun.className = 'sun'
    sun.textContent = letters[random(0, 1)]
    sun.style.top = `${random(0, innerHeight) - 100}px`
    sun.style.left = `${random(0, innerWidth) - 100}px`
    body.append(sun)
  })

  const socket = io()

  // change the display according to the sensor data received
  socket.on('sendNormalizedSensorValue', (normalizedValue, sensorValue) => {
    // change background color
    const hue = normalizedValue / 2 + 50
    const luminosity = normalizedValue / 10
    body.style.background = `hsl(${hue}, 100%, ${luminosity}%)`

    // modify each sun
    suns.forEach((i) => {
      const sun = document.getElementById(`sun-${i}`)
      const move = normalizedValue * 1.25

      // vary the sun weight
      sun.style.setProperty('--weight', normalizedValue)

      // move the sun position
      const x = i % 3 ? move : -move
      const y = !(i % 2) ? move : -move
      sun.style.transform = `translate(${x}px, ${y}px)`
    })
  })
}

const random = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const suns = [...Array(30).keys()]
const letters = ['A', 'B']
