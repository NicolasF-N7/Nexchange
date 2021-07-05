var express = require('express');
const fs = require('fs');
var router = express.Router();

const readJson = fs.readFileSync('./data/series.json');
const data = JSON.parse(readJson);

router.get('/', (req, res) => {
  res.render('index', { data });
});

module.exports = router;
