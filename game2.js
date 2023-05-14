//Importing the necessary classes
import Submarine from "./submarine";
import Mine from "./mine";
import ToxicBarrel from "./ToxicBarrel";

// Game State constants for the switch statement
const STATE_START = 0;
const STATE_PLAYING = 1;
const STATE_GAME_OVER = 2;

let gameState; // Variable used to switch and compare the states of the game

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function preload() {
  myImage = loadImage("/img/background2.png");
}

function draw() {
  background(255);
  image(myImage, 0, 0, windowWidth, windowHeight);
  let submarine = new Submarine();
  submarine.display();
}
