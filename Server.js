var http = require('http'),
path = require('path'),
fs = require('fs');
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  fs.readFile("./index.html",function(err,contents){
      if(!err){
          //if there was no error
          //send the contents with the default 200/ok header
          res.end(contents);
      } else {
          //for our own troubleshooting
          console.dir(err);
      };
  });
}).listen(port);
