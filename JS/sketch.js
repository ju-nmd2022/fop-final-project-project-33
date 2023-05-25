import Explosion from "./explosion.js";
import UnderwaterMine from "./underwaterMine.js";
import ToxicBarrel from "./toxicBarrel.js";
import SubmarineClass from "./submarine.js";

// Game State constants for the switch statement
const STATE_START = 0;
const STATE_PLAYING = 1;
const STATE_GAME_OVER = 2;

let gameState = STATE_START; // Start the game at the start screen

let submarine; // variable used to create the submarine
let attachedBarrel = null;
let isAttached = false;
let explosion;
let timer = 60;
let winState = false; // Variable to check if all the barrels are collected
let button1, button2; // Buttons for choosing the levels

let LogoImg; // Variable used to load the logo of the game.
let backgroundImage; // variable for the background
let VictoryImg;// Win screen
let submarineImage; //Submarine image variable
let containerImage; // Variable for the collection point image
let explosionImage; // losing screen
let underwaterMineImg; // Mine image variable
let toxicBarrelImg; // Toxic barrel variable

let underwaterMines = []; // Array used to store the mines
let toxicBarrels = []; //Array used to store the barrels

let explosionSound; 
let backgroundSound;

function preload() {
  backgroundImage = loadImage("./img/background2.png");
  submarineImage = loadImage("./img/submarine-graphic.png");
  toxicBarrelImg = loadImage("./img/toxic-barrel.png");
  containerImage = loadImage("./img/container2.png");
  underwaterMineImg = loadImage("./img/underwater-mine.png");
  LogoImg = loadImage("./img/Logo.png");
  explosionImage = loadImage("./img/explosion.jpeg");
  VictoryImg = loadImage("./img/VictoryScreen.png");
  backgroundSound = loadSound("./img/backgroundMusic.mp3");
  explosionSound = loadSound("./img/explosion.mp3");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  backgroundSound.setVolume(0.1);
  explosionSound.setVolume(0.5);
  button1 = createButton("Level 1");
  button2 = createButton("Level 2");
  button1.position(width / 2 - 100, height / 2 + 50);
  button2.position(width / 2 + 70, height / 2 + 50);

  button1.addClass("button-style");
  button2.addClass("button-style");
  button1.mousePressed(startLevel1);
  button2.mousePressed(startLevel2);
}
//Statements for import/export
window.setup = setup;
window.preload = preload;

//Initializing the functions according to their levels of difficulty
function startLevel1() {
  gameState = STATE_PLAYING;
  submarine = new SubmarineClass(150, 150, 6, submarineImage); //Submarine position and speed
  initToxicBarrels(7);
  initUnderwaterMines(13);
  hideButtons();
  backgroundSound.play();
}

function startLevel2() {
  gameState = STATE_PLAYING;
  submarine = new SubmarineClass(150, 150, 8, submarineImage); //Submarine position and speed
  initToxicBarrels(10);
  initUnderwaterMines(20);
  backgroundSound.play();
  hideButtons();
}

//Function to hide the Level buttons once you choose a level.
function hideButtons() {
  button1.hide();
  button2.hide();
}

//Function to make the level buttons to reappear when you restart the game
function showButtons() {
  button1.show();
  button2.show();
}

//Function that creates a certain number of barrels at random locations using the getRandomPosition() function
function initToxicBarrels(count) {
  for (let i = 0; i < count; i++) {
    let position = getRandomPosition(150); //Distance between the barrels
    toxicBarrels.push(new ToxicBarrel(position.x, position.y, toxicBarrelImg));
  }
}

//Function that creates a certain number of mines at random locations using the getRandomPosition() function
function initUnderwaterMines(count) {
  for (let i = 0; i < count; i++) {
    let position = getRandomPosition(100); //Distance between the mines
    underwaterMines.push(
      new UnderwaterMine(position.x, position.y, underwaterMineImg)
    );
  }
}

//Generating random positions while checking for a certain distance between them.
function getRandomPosition(minDist) {
  let x, y;
  if (toxicBarrels.length > 0 || underwaterMines.length > 0) {
    do {
      x = random(width - 100);
      y = random(height - 100);
    } while (checkDistance(x, y, minDist) || checkExclusionZone(x, y));
  } else {
    x = random(width - 100);
    y = random(height - 100);
  }
  return createVector(x, y);
}

//Function to make sure the random positions avoid the collection point
function checkExclusionZone(x, y) {
  let containerWidth = 400;
  let containerHeight = 400;
  return (x < 200 && y < 200) || (x < containerWidth && y < containerHeight);
}

//Function used to condition the generation of random positions.
//If it returns false, the generated position is valid
function checkDistance(x, y, minDist) {
  for (let barrel of toxicBarrels) {
    let d = dist(x, y, barrel.x, barrel.y);
    if (d < minDist) {
      return true; // too close to a barrel
    }
  }
  for (let mine of underwaterMines) {
    let d = dist(x, y, mine.x, mine.y);
    if (d < minDist) {
      return true; // too close to a mine
    }
  }
  return false; // not too close to any barrel or mine
}

function displayTimerAndScore() {
  textSize(40);
  fill(0, 255, 0);

  // Display the timer
  text("Timer ⏱:", width - 200, 50);
  text(timer + " s", width - 70, 50);
}

function draw() {
  switch (gameState) {
    case STATE_START:
      drawStartScreen();
      break;
    case STATE_PLAYING:
      drawGame();
      break;
    case STATE_GAME_OVER:
      drawGameOverScreen();
      break;
  }
}
window.draw = draw;

// Draw the start screen
function drawStartScreen() {
  background(0);
  image(backgroundImage, 0, 0, windowWidth, windowHeight);
  image(LogoImg, width / 2 - 265, height / 2 - 350);

  //game description
  push();
  fill(100, 100, 200);
  rect(20, height / 2 - 275, 360, 200, 20);
  fill(255);
  textSize(16);
  textLeading(25);
  text(
    "Hello, Captain! Your job? Simple! Pilot your trusty submarine, and pick up the toxic waste that sank in the lake after the train crash and drop 'em off in the container.           No pressure!",
    30,
    height / 2 - 245,
    340
  );
  pop();

  // Controls description
  push();
  fill(100, 100, 200);
  rect(width - 380, height / 2 - 275, 360, 200, 20);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  textLeading(25);
  text(
    "Use the arrow keys ➡️ ⬅️ ⬆️ ⬇️ to navigate your submarine. Press the SPACE bar to engage the submarine's magnet when near a barrel. Transport it to the container and press the SPACE bar again to safely deposit the waste.",
    width - 370,
    height / 2 - 245,
    340
  );

  pop();

  fill(255);
  textSize(40);
  textStyle(BOLD);
  textAlign(CENTER);
  text("Choose Level:", windowWidth / 2 + 20, windowHeight / 2 + 15);
  push();
  fill(0, 255, 0);
  textAlign(CENTER);
  textSize(20);
  text("Easy", width / 2 - 60, height / 2 + 120);
  fill(255, 0, 0);
  text("Hard", width / 2 + 115, height / 2 + 120);
  pop();
}

function drawGame() {
  background(255);

  image(backgroundImage, 0, 0, windowWidth, windowHeight);
  submarine.display();
  submarine.move();

  //Displaying the barrels
  for (let barrel of toxicBarrels) {
    barrel.display();
  }

  //Displaying the mines + Checking collisions + removing mine and submarine if a collision is detected
  for (let i = underwaterMines.length - 1; i >= 0; i--) {
    let mine = underwaterMines[i];
    mine.move();
    mine.display();

    if (
      submarine &&
      !submarine.destroyed &&
      submarine.checkCollisionMine(mine)
    ) {
      explosion = new Explosion(
        mine.x + mine.width / 2,
        mine.y + mine.height / 2
      );
      underwaterMines.splice(i, 1); // remove the mine
      submarine.destroyed = true; // mark the submarine as destroyed
      explosionSound.play();
      break;
    }
  }

  if (explosion) {
    explosion.display();

    if (explosion.finished) {
      explosion = null;
      backgroundSound.stop();
      explosionSound.stop();
      gameState = STATE_GAME_OVER;
    }
  }

  //Creating the timer
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }

  for (let i = 0; i < toxicBarrels.length; i++) {
    if (!isAttached) {
      if (submarine.checkCollision(toxicBarrels[i])) {
        if (keyIsPressed === true && keyCode == 32) {
          attachedBarrel = toxicBarrels.splice(i, 1)[0]; // attach the barrel and remove it from the array
          isAttached = true;
          break;
        }
      }
    }
  }
  
  if (toxicBarrels.length == 0 && !isAttached && timer > 0) {
    winState = true;
    backgroundSound.stop();
    gameState = STATE_GAME_OVER;
  } else if (timer == 0) {
    backgroundSound.stop();
    gameState = STATE_GAME_OVER;
  }

  // display attached barrel
  if (attachedBarrel) {
    if (submarine.mirror) {
      attachedBarrel.x = submarine.x - attachedBarrel.width;
    } else {
      attachedBarrel.x = submarine.x + submarine.width;
    }
    attachedBarrel.y = submarine.y + 20;
    attachedBarrel.display();
  }

  //removing the barrel when the submarine is inside the container
  let nearContainer = dist(submarine.x, submarine.y, 150, -20) < 120;

  if (keyIsPressed === true && keyCode == 32 && isAttached && nearContainer) {
    attachedBarrel.x = 0;
    attachedBarrel.y = 0;
    attachedBarrel = null; // removing the barrel once is collected
    isAttached = false;
  }

  image(containerImage, -20, -150, 280, 280);
  displayTimerAndScore();
}

function drawGameOverScreen() {
  if (winState) {
    image(VictoryImg, 0, 0, windowWidth, windowHeight);
    fill(0);
    textAlign(CENTER);
    textStyle(BOLD);
    text("Press R to Restart", width / 2, height / 2 + 50);
  } else {
    background(0);
    image(explosionImage, 0, 0, windowWidth, windowHeight);
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(100);
    text("GAME OVER", width / 2, height / 2);
    textSize(40);
    text("Press R to Restart", width / 2, height / 2 + 100);
  }
}

function keyPressed() {
  if ((gameState === STATE_GAME_OVER && key === "r") || key === "R") {
    resetGame();
    gameState = STATE_START;
  }
}
window.keyPressed = keyPressed;

//function to reset the game once it ends
function resetGame() {
  toxicBarrels = [];
  underwaterMines = [];
  submarine.x = 150;
  submarine.y = 150;
  attachedBarrel = null;
  isAttached = false;
  submarine.destroyed = false;
  timer = 60;
  winState = false;
  showButtons();
}

//Resizing the canvas and repositioning the buttons
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button1.position(width / 2 - 100, height / 2 + 50);
  button2.position(width / 2 + 70, height / 2 + 50);
}
