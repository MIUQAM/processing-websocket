var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(11001, function() {
    console.log((new Date()) + ' Server is listening on port 11001');
});

wsServer = new WebSocketServer({ httpServer: server });

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

var connections = {};
var connectionIDCounter = 0;
var processingClientID;

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    var connection = request.accept(null, request.origin);

    // Store a reference to the connection using an incrementing ID
    connection.id = connectionIDCounter ++;
    connections[connection.id] = connection;

    // Now you can access the connection with connections[id] and find out
    // the id for a connection with connection.id

    console.log((new Date()) + ' Connection ID ' + connection.id + ' accepted.');


    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected. ' +
                    "Connection ID: " + connection.id);

        // Make sure to remove closed connections from the global pool
        delete connections[connection.id];
    });


    connection.on('message', function(message) {
        console.log("message entrant")
        console.log(message);
        if (message.type === 'utf8') {
            try {
                if (message.utf8Data === '/iamprocessing') {
                    processingClientID = connection.id;
                    console.log("processingClientID : " + processingClientID)
                }
            }
            catch(e) {
                // do nothing if there's an error.
                console.log("erreur réception message");
                //console.log(e);
            }
        }
    });

    broadcast("allo");

});

// Broadcast to all open connections
function broadcast(data) {
    Object.keys(connections).forEach(function(key) {
        var connection = connections[key];
        if (connection.connected) {
            connection.send(data);
        }
    });
}

// Send a message to a connection by its connectionID
function sendToConnectionId(connectionID, data) {
    var connection = connections[connectionID];
    if (connection && connection.connected) {
        connection.send(data);
    }
}

// Send a message to a connection by its connectionID
function sendToProcessing(data) {
    if(processingClientID != null){
        var connection = connections[processingClientID];
        if (connection && connection.connected) {
            connection.send(data);
        }
    }
}