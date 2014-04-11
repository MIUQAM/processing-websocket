
void setup(){
	WebSocketImpl.DEBUG = true;
	new ChatClient("ws://localhost:8080");
}