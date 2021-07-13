var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient
const Web3 = require('web3');
//const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/f96a777fce0a4e30ad13544c52314cd5");
const provider = new Web3.providers.WebsocketProvider("https://rinkeby.infura.io/v3/f96a777fce0a4e30ad13544c52314cd5");
const web3 = new Web3(provider);

//Careful in html: if href = stylesheets/common.css or /stylesheets/common.css REALLY different
//first one is relatve path; second one is absolute path
router.get('/', function(req, res, next) {
  res.render('create');
});

router.post('/', (req, res) => {
  console.log("Creation form received !");
  console.log(req.body);

  mongoClient.connect('mongodb://127.0.0.1:27017/', {useUnifiedTopology: true }, (err, client) =>{
    if (err) console.error(err + " ; Client: " + client);

    const db = client.db('nexchangedb');
    const temp = db.collection('temp');

    temp.insertOne(req.body)
    .then(result => {
      console.log("Form data inserted in DB")
    })
    .catch(error => console.error(error))
  });
  res.status(204).send();

});

module.exports = router;
