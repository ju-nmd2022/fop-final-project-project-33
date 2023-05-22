// Importing the necessary classes
// import SubmarineClass from "./submarine.js";
// import Mine from "./mine";
// import ToxicBarrel from "./ToxicBarrel";

// Game State constants for the switch statement
const STATE_START = 0;
const STATE_PLAYING = 1;
const STATE_GAME_OVER = 2;

let gameState = STATE_START; // Start the game at the start screen

let submarineImage; //Submarine image variable
let submarine; // variable used to create the submarine
let toxicBarrelImg; // Toxic barrel variable
let toxicBarrels = []; //Array used to store the barrels
let backgroundImage; // variable for the background
let attachedBarrel = null;
let isAttached = false;
let underwaterMineImg; // Mine image variable
let containerImage; // Variable for the collection point image
let underwaterMines = []; // Array used to store the mines

let LogoImg; // Variable used to load the logo of the game.
let VictoryImg;
let backgroundSound;

let timer = 60;
let score = 100;

let explosion = null;
let winState = false;
let button1, button2;

let explosionSound;

function preload() {
  backgroundImage = loadImage("../img/background2.png");
  submarineImage = loadImage("/img/submarine-graphic.png");
  toxicBarrelImg = loadImage("/img/toxic-barrel.png");
  containerImage = loadImage("/img/container2.png");
  underwaterMineImg = loadImage("/img/underwater-mine.png");
  LogoImg = loadImage("/img/Logo.png");
  explosionImage = loadImage("/img/explosion.jpeg");
  VictoryImg = loadImage("/img/VictoryScreen.png");
  backgroundSound = loadSound("/img/backgroundMusic.mp3");
  explosionSound = loadSound("/img/explosion.mp3");
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

function startLevel1() {
  gameState = STATE_PLAYING;
  submarine = new SubmarineClass(150, 150, 7, submarineImage);
  initToxicBarrels(7);
  initUnderwaterMines(13);
  hideButtons();
  backgroundSound.play();
}

function startLevel2() {
  gameState = STATE_PLAYING;
  submarine = new SubmarineClass(150, 150, 9, submarineImage);
  initToxicBarrels(12);
  initUnderwaterMines(20);
  backgroundSound.play();
  hideButtons();
}

function hideButtons() {
  button1.hide();
  button2.hide();
}

function showButtons() {
  button1.show();
  button2.show();
}

function initToxicBarrels(count) {
  for (let i = 0; i < count; i++) {
    let position = getRandomPosition(150);
    toxicBarrels.push(new ToxicBarrel(position.x, position.y, toxicBarrelImg));
  }
}

function initUnderwaterMines(count) {
  for (let i = 0; i < count; i++) {
    let position = getRandomPosition(100); // make sure there is a distance between the mines
    underwaterMines.push(
      new UnderwaterMine(position.x, position.y, underwaterMineImg)
    );
  }
}

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

function checkExclusionZone(x, y) {
  let containerWidth = 400;
  let containerHeight = 400;
  return (x < 200 && y < 200) || (x < containerWidth && y < containerHeight);
}

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
  textSize(30);
  fill(0, 255, 0);

  // Display the timer
  text("Timer:", width - 200, 50);
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

function drawStartScreen() {
  background(0);
  image(backgroundImage, 0, 0, windowWidth, windowHeight);
  image(LogoImg, width / 2 - 265, height / 2 - 350);

  //game description
  push();
  fill(100, 100, 200);
  rect(20, height / 2 - 250, 360, 200);
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text(
    "Hello, Captain! Your job? Simple! Pilot your trusty sub, scoop up some nasty toxic barrels lurking in the depths, and drop 'em off in the container. Easy peasy, lemon squeezy! Just remember, the fishies are counting on you. No pressure!",
    30,
    height / 2 - 230,
    340
  );
  pop();

  // Controls description
  push();
  fill(100, 100, 200);
  rect(width - 380, height / 2 - 250, 360, 200);
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text(
    "Use the arrow keys to navigate your submarine through the watery depths. Press the space bar to engage the submarine's collection mechanism when near a barrel. Once you've secured a barrel, transport it to the container and press the space bar again to safely deposit the waste.",
    width - 370,
    height / 2 - 230,
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

  for (let barrel of toxicBarrels) {
    barrel.display();
  }

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
  let nearContainer = dist(submarine.x, submarine.y, 150, -20) < 100;

  if (keyIsPressed === true && keyCode == 32 && isAttached && nearContainer) {
    attachedBarrel.x = 0;
    attachedBarrel.y = 0;
    // toxicBarrels.push(attachedBarrel);
    attachedBarrel = null;
    isAttached = false;
  }

  for (let barrel of toxicBarrels) {
    barrel.display();
  }
  image(containerImage, -20, -150, 280, 280);
  // collectionPointText();
  displayTimerAndScore();
}

function drawGameOverScreen() {
  if (winState) {
    image(VictoryImg, 0, 0, windowWidth, windowHeight);
    fill(0);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Press R to Restart", width / 2, height / 2 + 50);
  } else {
    background(0);
    image(explosionImage, 0, 0, windowWidth, windowHeight);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("GAME OVER", width / 2, height / 2);
    textSize(40);
    text("Press R to Restart", width / 2, height / 2 + 100);
  }
}

function keyPressed() {
  if (gameState === STATE_START && keyCode === ENTER) {
    gameState = STATE_PLAYING;
  } else if (gameState === STATE_GAME_OVER && key === "r") {
    resetGame();
    gameState = STATE_START;
  }
}

function resetGame() {
  toxicBarrels = [];
  underwaterMines = [];
  submarine.x = 150;
  submarine.y = 150;
  attachedBarrel = null;
  isAttached = false;
  submarine.destroyed = false;
  timer = 60;
  score = 100;
  winState = false;

  showButtons();
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
    this.mirror = false;
    this.destroyed = false;
  }
  display() {
    if (!this) return;
    if (this.destroyed) return;
    push();

    // Calculate the translation based on mirroring
    let imageX = this.x;
    if (this.mirror) {
      translate(this.x + this.width, this.y);
      scale(-1, 1);
    } else {
      translate(this.x, this.y);
    }

    image(this.img, 0, 0, this.width, this.height);

    pop();
  }
  checkCollision(barrel) {
    // Calculate the front of the submarine
    //Using ternary operator to determine which way the submarine is facing
    //So if this.mirror is true then submarineFront = this.x and if its false submarineFront = this.x+this.width
    let submarineFront = this.mirror ? this.x : this.x + this.width;

    // Check for collision on the x-axis
    let collisionOnX =
      submarineFront >= barrel.x && submarineFront <= barrel.x + barrel.width;

    // Check for collision on the y-axis
    let collisionOnY =
      this.y + this.height - 3 >= barrel.y &&
      this.y <= barrel.y + barrel.height - 35;

    // Return true if collision on both axes, false otherwise
    return collisionOnX && collisionOnY;
  }

  // the following checkCollision is from ChatGPT
  checkCollisionMine(object) {
    return (
      this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    );
  }
  move() {
    if (this.destroyed) return;
    // Move the object if arrow keys are pressed

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
      this.mirror = true;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
      this.mirror = false;
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

class ToxicBarrel {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.size = 50;
    //In order to keep the aspect ratio of the image we calculate the height based on the aspect ratio and desired width
    this.width = 25; // desired width
    this.height = img.height * (this.width / img.width);
    this.img = img;
  }
  display() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

class UnderwaterMine {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.width = 35;
    this.height = img.height * (this.width / img.width);
    this.img = img;
    this.speed = 1; // decrease speed for slower movement
  }
  display() {
    image(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += random(-this.speed, this.speed);
    // removed this.y random movement

    // Keep the mine within the canvas
    this.x = constrain(this.x, 0, width - this.width);
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.alpha = 255;
    this.finished = false;
  }

  display() {
    if (this.alpha > 0) {
      push();
      fill(255, 0, 0, this.alpha);
      noStroke();
      ellipse(this.x, this.y, this.size, this.size);
      pop();

      this.size += 10;
      this.alpha -= 4;
    } else {
      this.finished = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button1.position(width / 2 - 100, height / 2 + 50);
  button2.position(width / 2 + 70, height / 2 + 50);
}
