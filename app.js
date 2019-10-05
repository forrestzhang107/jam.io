const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./routes/api')
const auth = require('./routes/auth')
const mongo = require('./core/mongo')

const app = express()

app.use(bodyParser.json())
app.use(auth)
app.use('/api', api)
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')))

mongo.init().then(async () => {
  console.log('Serving jam.io on port 5000')
  app.listen(5000)
})
