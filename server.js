//Bootstraop is already installed in this project
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 3000;

let index = require('./routes/index');
let create = require('./routes/create');
let manage = require('./routes/manage');

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use('/', index);
app.use('/create', create);
app.use('/manage', manage);


app.listen(port, () => console.log(`json-bread listening on port ${port}!`));
