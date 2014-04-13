import wsp5.*;

WsClient client;

void mousePressed(){
	try {
    client.send("hey?");
  } catch ( Exception e ){
  	println(e);
  }
  
}

void onWsOpen(){
}

void onWsMessage( String msg ){
  println("client: got a message "+msg);
}

void onWsClose(){
}
