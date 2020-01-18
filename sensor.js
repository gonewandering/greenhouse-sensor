var sensor = require("node-dht-sensor");

function read(model, pin) {
  return new Promise ((succ, cat) => {
    sensor.read(model, pin, (err, temp, hum) => {
      if(err) { return cat(err) }
      return succ({
        temperature: temp,
        humidity: hum
      })
    })
  })
}

module.exports = read
