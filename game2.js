//Importing the necessary classes
import SubmarineClass from "./submarine.js";
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
