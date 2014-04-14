import wsp5.*;

WsClient client;

void mousePressed(){

  client.send("hey?");
  
}

void onWsOpen(){
  client.send("/iamprocessing");
}

void onWsMessage( String msg ){
  println("client: got a message "+msg);
}

void onWsClose(){
}
