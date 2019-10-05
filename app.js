const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./api')
const mongo = require('./mongo')

const app = express()

app.use(bodyParser.json())
app.use('/api', api)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html')))

mongo.init().then(async () => {
  console.log('Serving jam.io on port 5000')
  app.listen(5000)
})
