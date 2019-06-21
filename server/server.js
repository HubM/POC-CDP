const express = require('express')
const fs = require('fs');
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/image', (req, res) => {
  const base64Image = req.body.picture.split(';base64,').pop();

  fs.writeFile(__dirname + '/public/out.jpg', base64Image, {encoding: 'base64'}, function(err) {
    if (err) {
      console.log(err);
    }
  });

  res.send({
    url: "out.jpg"
  })
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})