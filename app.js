var express = require('express')
var cors = require('cors')
var app = express()

rnd_num = String(Math.random()).slice(3);

uid = rnd_num.slice(0,3);

seed = rnd_num.slice(3);

var corsOptions = {
  origin: 'http://maeno-backend-service.maeno-be.svc.cluster.local',
  optionsSuccessStatus: 200
}

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://maeno-user:n6gJSjGf3IZq86Ml@demo.bmqni.mongodb.net/maeno?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("maeno").collection("maeno-seeds");
  collection.insertOne({ "uid": uid, "seed": seed }, function(err, r) {
      console.log('updated the verification server');
      client.close();
  });
});

app.use(cors())

app.get('/seed', function (req, res, next) {
  res.json({ "uid": uid, "seed": seed })
})

app.listen(3000, function () {
  console.log('Web server listening on port 3000')
})
