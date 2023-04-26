let backgroundImg;

function preload() {
  backgroundImg = loadImage("/lake.jpg");
}

function setup() {
  createCanvas(800, 600);
}

let myImage;

function preload() {
  myImage = loadImage("lake.jpg");
}

function setup() {
  createCanvas(800, 600);
}

//bezierCurves -> vertex(x1,y1)
//      bezierVertex(x2,y2)

function draw() {
  background(255);
  image(myImage, 0, 0, 800, 600);
  //Draw the body of the submarine
  noStroke();
  fill(100, 150, 200);
  beginShape();
  vertex(100, 200);
  bezierVertex(120, 100, 280, 140, 380, 200);
  bezierVertex(300, 260, 120, 300, 100, 200);
  endShape(CLOSE);
  //Draw the windows of the submarine
  push();
  fill(33);
  ellipse(145, 200, 25);
  ellipse(195, 200, 25);
  ellipse(245, 200, 25);
  ellipse(295, 200, 25);
  pop();
  //rect(x,y,w,[h],[topleft],[topright],[bottomright],[bottomleft])
  fill(33);
  rect(165, 95, 65, 50, 20, 59, 0);
}
