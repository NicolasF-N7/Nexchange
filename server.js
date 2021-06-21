const http = require('http'); // 1 - Import Node.js core module
const fs = require('fs');

let server = http.createServer(function (req, res) {   // 2 - creating server
  if(req.url == '/'){
    let index = fs.readFileSync('./index.html', 'utf8');
    //Send response
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(index)
  }
  else {
    res.end('Invalid Request ! Get out of here !');
  }

});

server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')
