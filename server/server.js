const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Clarifai = require('clarifai');

app.use(bodyParser.json())

new Clarifai.App({
  apiKey: 'a151eabbd43f493783fd82f203ee48e8'
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/image', (req, res) => {
  console.log(req.body);
  res.end('success')
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})