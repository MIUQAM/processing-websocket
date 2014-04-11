
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var url = require("url");
var os = require("os");

app.use(express.logger());

app.use(express.static(__dirname + '/public'));

io.sockets.on("connection", function(socket){
	socket.emit("connection", { connected:true, id: socket.id });
});

io.set('destroy upgrade', false);

var port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log("Listening on " + port);
});