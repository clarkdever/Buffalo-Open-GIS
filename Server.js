var http = require('http')
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Dis BOGIS node server in da cloud so sweet you be cryin. Yea... you thought it was rain. -DMFL\n');
}).listen(port);