var WebSocketServer = require('ws').Server,
	http = require('http'),
	express = require('express'),
	app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({server: server});


var processingClientId;
var newClientId = -1;

wss.on('connection', function(ws) {

	console.log('started client interval');

	newClientId++;

	ws.on('close', function() {
		console.log('stopping client interval');
	});

	ws.on('message', function(message) {
		if(message == "/processing"){
			processingClientId = newClientId;
		}

		if(wss.clients[processingClientId] != null){
			wss.clients[processingClientId].send("You are the processing client!");
		}

		console.log('received: %s', message);
	});

	ws.send('something');
});