
void setup(){
	size(100,100);

	try {
		client = new WsClient( this, "ws://localhost:8080");
		client.connect();
	} catch ( Exception e ){
	}
}

void draw(){
	background(100);
	fill(255);
	ellipse(10,10,10,10);
}