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
let toxicBarrelImg;
let toxicBarrels = [];
let backgroundImage;
let attachedBarrel = null;
let isAttached = false;

let containerImage;

let timer = 60;
let score = 100;


function preload() {
  backgroundImage = loadImage("/img/background2.png");
  submarineImage = loadImage("/img/submarine-graphic.png");
  toxicBarrelImg = loadImage("/img/toxic-barrel.png");
  containerImage = loadImage("/img/container.png");
}
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  submarine = new SubmarineClass(width / 2, height / 2, 4, submarineImage);
  initToxicBarrels(10); // initialize 10 barrels
}

function initToxicBarrels(count) {
  for (let i = 0; i < count; i++) {
    let position = getRandomPosition();
    toxicBarrels.push(new ToxicBarrel(position.x, position.y, toxicBarrelImg));
  }
}

function getRandomPosition() {
  let x, y;
  if (toxicBarrels.length > 0) {
    do {
      x = random(width - 100);
      y = random(height - 100);
    } while (checkDistance(x, y) || checkExclusionZone(x, y));
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


function checkDistance(x, y) {
  for (let barrel of toxicBarrels) {
    let d = dist(x, y, barrel.x, barrel.y);
    if (d < 150) {
      return true;
    }
  }
  return false;
}

function collectionPointText(){
  fill(0, 0, 139); 
  noStroke(); 
  rect(30, 75, 190, 30);
  
  textAlign(LEFT, TOP); 
  textSize(25); 
  fill(255); 
  text('Collection point', 40, 80);
}

function displayTimerAndScore() {
  textSize(30); 
  fill(0, 255, 0); 

  // Display the timer
  text('Timer:', width - 200, 50);
  text(timer + ' s', width - 70, 50);

// Display the score
  fill(0, 0, 255);
  text('Score:', width - 200, 90);
  text(score, width - 70, 90);
}


function draw() {
  background(255);
  image(backgroundImage, 0, 0, windowWidth, windowHeight);
  submarine.display();
  submarine.move();

  for (let barrel of toxicBarrels) {
    barrel.display();
  }
  // if (frameCount % 60 == 0 && timer > 0) {
  //   timer--;
  // }

  for (let i = 0; i < toxicBarrels.length; i++) {
    if (!isAttached) {
      if (submarine.checkCollision(toxicBarrels[i])) {
        if (keyIsPressed === true && keyCode == "32") {
          // 32 is the keyCode for Spacebar, change it as per your needs
          attachedBarrel = toxicBarrels.splice(i, 1)[0]; // attach the barrel and remove it from the array
          isAttached = true;
          break; 
        }
      }
    }
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

  for (let barrel of toxicBarrels) {
    barrel.display();
  }
  image(containerImage, -80, -140, 400, 400);
  collectionPointText();
  displayTimerAndScore();
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
  }
  display() {
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
    let d = dist(this.x, this.y, barrel.x, barrel.y);
    return d < this.width + barrel.width / 2;
  }
  move() {
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

class UnderwaterMine{
  constructor(){}
}