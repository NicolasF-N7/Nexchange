var express = require('express');
var router = express.Router();

//Careful in html: if href = stylesheets/common.css or /stylesheets/common.css REALLY different
//first one is relatve path; second one is absolute path
router.get('/', function(req, res, next) {
  res.render('create');
});

router.post('/', (req, res) => {
  console.log("Creation data received !");
  console.log(req.body.object);
  console.log(req.body.desc);
  console.log(req.body.photo);
  console.log(req.body.price);
  console.log(req.body.name);
  //res.redirect('manage');
});

module.exports = router;
