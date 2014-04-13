import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import wsp5.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class SimpleServer extends PApplet {



WsServer server;

public void setup(){
  // you need to wrap this in a try/catch for now...
  try {
    server = new WsServer( this, 8080);
  } catch ( Exception e ){
  }
}

public void draw(){
}

public void mousePressed(){
  server.sendToAll("hey");
}

public void onWsOpen(WebSocket connection){
  println("got a new connection");
}

public void onWsMessage( WebSocket connection, String message ){
  println("server: got a message "+message);
  connection.send(message);
}

public void onWsClose( WebSocket connection){
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "SimpleServer" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
