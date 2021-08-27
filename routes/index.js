var express = require('express');
const fs = require('fs');
var router = express.Router();
const mongoClient = require('mongodb').MongoClient

const readJson = fs.readFileSync('./data/series.json');
const data = JSON.parse(readJson);

router.get('/', (req, res) => {
  mongoClient.connect('mongodb://127.0.0.1:27017/', {useUnifiedTopology: true }, (err, client) =>{
    if(err){
      console.error(err + " ; Client: " + client);
      res.status(500).send();
      res.end();
    }

    const db = client.db('nexchangedb');
    const items = db.collection('items');

    let query = {};//All
    //READ DB for data requested
    let cursor = items.find(query);//Search in DB all items stored that the address has minted
    //Send data to client
    cursor.toArray().then(function(itemsData){
      res.render('index', { itemsData });
    });
  });
});

router.get('/alltokensdata', (req, res) => {
  mongoClient.connect('mongodb://127.0.0.1:27017/', {useUnifiedTopology: true }, (err, client) =>{
    if(err){
      console.error(err + " ; Client: " + client);
      res.status(500).send();
      res.end();
    }

    const db = client.db('nexchangedb');
    const items = db.collection('items');

    //READ DB for data requested
    let cursor = items.find({});//Search in DB all items stored that the address has minted
    //Send data to client
    cursor.toArray().then(function(itemsData){
      res.send(itemsData);
      res.end();
    });
  });
});

module.exports = router;
