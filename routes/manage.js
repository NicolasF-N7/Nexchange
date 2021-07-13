var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('manage');
});
//get tokens ID from which to send data
//Post method because sending tokens ID list
router.post('/tokensdata', (req, res) => {
  console.log("Sending tokens data");
  db.collection('items').find().toArray().then(items => {
        let tokensID = req.body.tokensID;
        let data = items;
        //FIND DATA Without double loop ?
        /*for(let i=0; i < tokensID.length; i++){
          if(items[i].id == tokensID[i])
        }*/
        return  data;
  }).catch(error => console.error(error));
  return "There seems to be an error somewhere...";
});

module.exports = router;
