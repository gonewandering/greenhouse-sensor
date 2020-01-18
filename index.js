const express = require('express')
const sensor = require('./sensor')
const mdns = require('mdns')
const config = require('./data')

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

app.get('/info', async (req, res) => {
  try {
    let results = await config.get() || {}
    res.json(results)
  } catch(e) {
    res.json(e)
  }
})

app.post('/info', async (req, res) => {
  let data = JSON.parse(req.body)

  try {
    await config.set(data)
    let results = await config.get()
    res.json(results)
  } catch(e) {
    res.json(e)
  }
})

async function init() {
  const meta = await config.get()
  const ad = mdns.createAdvertisement(mdns.tcp('http'), port, { name: 'greenhouse', txtRecord: meta })

  app.listen(port, () => console.log(`Greenhouse active on port ${port}!`))
  ad.start()
}

init()
