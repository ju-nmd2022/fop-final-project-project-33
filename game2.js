//Importing the necessary classes
// import SubmarineClass from "./submarine.js";
// import Mine from "./mine";
// import ToxicBarrel from "./ToxicBarrel";

// Game State constants for the switch statement
const STATE_START = 0;
const STATE_PLAYING = 1;
const STATE_GAME_OVER = 2;

let gameState; // Variable used to switch and compare the states of the game

let submarineImage;
let submarine;

function preload() {
  backgroundImage = loadImage("/img/background2.png");
  submarineImage = loadImage("/img/submarine-graphic.png");
}
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  submarine = new SubmarineClass(width / 2, height / 2, 4, submarineImage);
}

function draw() {
  background(255);
  image(backgroundImage, 0, 0, windowWidth, windowHeight);

  submarine.display();
  submarine.move();
}
class SubmarineClass {
  constructor(x, y, speed, img) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.img = img;
    //In order to keep the aspect ratio of the image we calculate the height based on the aspect ratio and desired width
    this.width = 100; // desired width
    this.height = this.img.height * (this.width / this.img.width);
    this.speed = speed;
  }
  display() {
    // Draw the image at the origin, scaled to the correct width and height
    image(this.img, this.x, this.y, this.width, this.height);
  }
  move() {
    // Move the object if arrow keys are pressed
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    // Keep the object within the canvas
    this.x = constrain(this.x, 0, width - this.width); // constrain by this.width and this.height
    this.y = constrain(this.y, 0, height - this.height);
  }
}
