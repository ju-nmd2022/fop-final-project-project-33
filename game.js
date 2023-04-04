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

function draw() {
  background(255);
  image(myImage, 0, 0, 800, 600);
}
