var express = require('express');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient

router.get('/', (req, res) => {
  res.render('manage');
});
//retrieve list of tokens data from an account address
//GET method receiving account addr in input and outputs all tokens data related to this addr
router.get('/tokensdata', (req, res) => {
  mongoClient.connect('mongodb://127.0.0.1:27017/', {useUnifiedTopology: true }, (err, client) =>{
    if(err){
      console.error(err + " ; Client: " + client);
      res.status(500).send();
      res.end();
    }

    const db = client.db('nexchangedb');
    const items = db.collection('items');

    let queryMatchAddr = {accountAddr: req.query.accountAddr.toLowerCase()};
    //READ DB for data requested
    let cursor = items.find(queryMatchAddr);//Search in DB all items stored that the address has minted
    //Send data to client
    cursor.toArray().then(function(itemsData){
      res.send(itemsData);
      res.end();
    });
  });
});

module.exports = router;
