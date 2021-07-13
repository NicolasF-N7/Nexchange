//Bootstraop is already installed in this project
const express = require('express');
const bodyParser = require('body-parser');// To handle form data parsing among other
const Web3 = require('web3');
const provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/f96a777fce0a4e30ad13544c52314cd5");
const web3 = new Web3(provider);
const mongoClient = require('mongodb').MongoClient

const app = express();
const port = 3000;

let index = require('./routes/index');
let create = require('./routes/create');
let manage = require('./routes/manage');

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//DB
app.use(express.json());
//const dbo = require("./db/conn");

app.use('/', index);
app.use('/create', create);
app.use('/manage', manage);

/* CONTRACT, Handling Transfer event : getting the corresponding form submition
and store that for + token id associated in Item collection in DB*/
let compiledFilePath = './TokenManagerMetadataEnum.json';
let compiledToken = require(compiledFilePath);
let contractABI = compiledToken['abi'];

let contractAddr = "0x2a7ffea65a9db35f600456730399a3530a0492fe";
let toknMngr = new web3.eth.Contract(contractABI, contractAddr);

let options = {filter: {value: [],}, fromBlock: "latest"};
toknMngr.events.Transfer(options)
        .on('data', (event) => {
          let fromAddr = event.returnValues._from;
          let toAddr = event.returnValues._to;
          let tokenId = event.returnValues._tokenId;
          console.log("fromAddr " + fromAddr);
          console.log("toAddr " + toAddr);
          console.log("tokenId " + tokenId);
          if(fromAddr == "0x0000000000000000000000000000000000000000"){//Transfer event from Mint
            //Retrieve the corresponding form data and register it into DB
            mongoClient.connect('mongodb://127.0.0.1:27017/', {useUnifiedTopology: true }, (err, client) =>{
              if (err) console.error(err + " ; Client: " + client);

              const db = client.db('nexchangedb');
              const temp = db.collection('temp');
              const items = db.collection('items');

              //Read doc from DB in temp with addr == toAddr & delete it

              /*items.insertOne(...)
              .then(result => {
                console.log("Successful form & token ID data stored in DB !")
              })
              .catch(error => console.error(error))*/
            });
          }
        })
        .on('error', err => console.error(err))

app.listen(port, () => {
  console.log(`json-bread listening on port ${port}!`);
});
