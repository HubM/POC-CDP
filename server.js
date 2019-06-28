const express = require('express')
const fs = require('fs');
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.static('storage'));
app.use(express.static('build'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html')
})

app.post('/api/image', (req, res) => {
  const base64Image = req.body.picture.split(';base64,').pop();
  if (process.env.NODE_ENV === "prod") {
    fs.writeFile(__dirname + '/build/out.jpg', base64Image, {encoding: 'base64'}, function(err) {
      if (err) {
        console.log(err);
      }
    });

    res.send({
      url: "https://cdp2021.herokuapp.com/out.jpg"
    })
  }

  if (process.env.NODE_ENV === "dev") {
    res.send({
      message: "Il est nécessaire d'être en production pour tester cette fonctionnalité"
    })
  }

})

app.listen(process.env.PORT || 4000, function () {
  if (process.env.PORT) {
    console.log(`CDP2021 app running on port ${process.env.PORT}`);
  } else {
    console.log(`CDP2021 app running on port 4000`);
  }
})