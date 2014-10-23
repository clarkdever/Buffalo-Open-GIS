var http = require('http');
var port = process.env.port || 1337;
http.createServer(function(req, res){
	res.status(200).sendFile('/index.html');
}).listen(port);