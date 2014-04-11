
void setup(){
	WebSocketImpl.DEBUG = true;
	new ChatClient("ws://localhost:8080");

	size(100,100);
}

void draw(){
	background(100);
	fill(255);
	ellipse(10,10,10,10);
}