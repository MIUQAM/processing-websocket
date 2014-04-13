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

public class SimpleClient extends PApplet {



WsClient client;

public void setup(){
  // you need to wrap this in a try/catch for now...
  try {
    client = new WsClient( this, "ws://localhost:8080");
    client.connect();
  } catch ( Exception e ){
  	e.toString();
  }
}

public void draw(){
}

public void mousePressed(){
	try {
    client.send("hey?");
  } catch ( Exception e ){
  	println(e);
  }
  
}

public void onWsOpen(){
}

public void onWsMessage( String msg ){
  println("client: got a message "+msg);
}

public void onWsClose(){
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "SimpleClient" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
