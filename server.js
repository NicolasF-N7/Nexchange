//Bootstraop is already installed in this project
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

app.use(bodyParser.urlencoded({ extended: false }));
//express.static : to let clients access files in the root (parameter of static) folder
app.use(express.static(__dirname + '/views'));// Views are accessible by anyone ? Before processing ?
app.use(express.static('public'))

const readJson = fs.readFileSync('./data/series.json');
const data = JSON.parse(readJson);

app.get('/', (req, res) => {
  res.render('index', { data });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  console.log("Creation data received !");
  console.log(req.body.object);
  console.log(req.body.desc);
  console.log(req.body.photo);
  console.log(req.body.price);
  console.log(req.body.name);
  //Mint token on blockchain
  res.redirect('manage');
});

app.get('/manage', (req, res) => {
  res.render('manage');
});

app.listen(port, () => console.log(`json-bread listening on port ${port}!`));
