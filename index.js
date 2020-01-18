const express = require('express')
const sensor = require('./sensor')
const mdns = require('mdns')

const app = express()
const port = 3737

app.get('/', async (req, res) => {
  try {
    let results = await sensor(22, 11)
    res.json(results)
  } catch(e) {
    res.json(e)
  }
})

const ad = mdns.createAdvertisement(mdns.tcp('http'), port, { name: 'greenhouse' })

app.listen(port, () => console.log(`Greenhouse active on port ${port}!`))
ad.start()
