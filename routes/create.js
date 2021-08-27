var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient

//Careful in html: if href = stylesheets/common.css or /stylesheets/common.css REALLY different
//first one is relatve path; second one is absolute path
router.get('/', function(req, res, next) {
  res.render('create');
});

router.post('/', (req, res) => {
  mongoClient.connect('mongodb://127.0.0.1:27017/', {useUnifiedTopology: true }, (err, client) =>{
    if (err) console.error(err + " ; Client: " + client);

    const db = client.db('nexchangedb');
    const temp = db.collection('temp');

    temp.insertOne(req.body)
    .then(result => {
      console.log("New item " + req.body.itemName + " created ! (stored in temp collection)");
      console.log(req.body);
    })
    .catch(error => console.error(error));
  });
});

module.exports = router;
