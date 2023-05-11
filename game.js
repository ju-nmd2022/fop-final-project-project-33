
// Game State constants for the switch statement
const STATE_START = 0;
const STATE_PLAYING = 1;
const STATE_GAME_OVER = 2;

//Submarine variables
let submarineX = 240;
let submarineY = 200;
let submarineSize = 100;
let submarineAngle = 0;

let propellerAngle = 0;

//Variable for timer
let timeLeft = 60;

let barrels = [];
let mines = [];
let occupiedPositions = [];

let submarineVisible = true;

// Explosion variables
let explosionSize = 0;
let explosionAlpha = 255;
let startExplosion = false;
let explosionTriggered = false;
let explosionX, explosionY;
let gameOver = false;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function explosion(x, y, start) {
  if (start) {
    startExplosion = true;
  }

  if (startExplosion && explosionAlpha > 0) {
    push();
    fill(255, 0, 0, explosionAlpha);
    noStroke();
    ellipse(x, y, explosionSize, explosionSize);
    pop();
    
    explosionSize += 1;
    explosionAlpha -= 2;
  } else if (explosionAlpha <= 0) {
    startExplosion = false;
    explosionSize = 0;
    explosionAlpha = 255;
  }
}

function preload() {
  myImage = loadImage("/img/background2.png");
}

function checkOverlap(x, y, minDist) {
  for (let pos of occupiedPositions) {
    let d = dist(x, y, pos.x, pos.y);
    if (d < minDist) {
      return true;
    }
  }
  return false;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //The following 18 lines were adapted from ChatGPT
  // Creating max 20 random toxic barrels
  for (let i = 0; i < 20; i++) {
    let x, y, scaleFactor;
    do {
      scaleFactor = random(0.5, 0.7);
      x = random(45 * scaleFactor, width - 45 * scaleFactor);
      y = random(45 * scaleFactor, height - 45 * scaleFactor);
    } while (checkOverlap(x, y, 100 * scaleFactor));
    barrels.push({ x: x, y: y, scaleFactor: scaleFactor });
    occupiedPositions.push({ x: x, y: y });
  }

  // Creating max 10 random underwater mines
  for (let i = 0; i < 10; i++) {
    let x, y, scaleFactor, offsetX;
    do {
      scaleFactor = random(0.5, 0.9);
      x = random(50 * scaleFactor, width - 50 * scaleFactor);
      y = random(50 * scaleFactor, height - 50 * scaleFactor);
    } while (checkOverlap(x, y, 100 * scaleFactor));
    offsetX = random(TWO_PI);
    mines.push({ x: x, y: y, scaleFactor: scaleFactor, offsetX: offsetX });
    occupiedPositions.push({ x: x, y: y });
  }
}

function drawBase() {
  push();

  // Base shape
  fill(100, 100, 100);
  beginShape();
  vertex(0, 150);
  vertex(150, 150);
  vertex(150, 50);
  vertex(120, 0);
  vertex(30, 0);
  vertex(0, 50);
  endShape(CLOSE);

  // bottom
  fill(100, 100, 100);
  beginShape();
  vertex(0, 150);
  vertex(150, 150);
  vertex(100, 200);
  vertex(50, 200);
  endShape(CLOSE);

  // Roof
  fill(50, 50, 50);
  beginShape();
  vertex(0, 50);
  vertex(30, 0);
  vertex(120, 0);
  vertex(150, 50);
  vertex(0, 50);
  endShape(CLOSE);

  // Opening at the right
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(120, 60, 30, 80);

  // Base label
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("BASE", 75, 100);
  pop();
}

function drawSubmarine(x, y) {
  push();
  translate(x, y);
  scale(0.3);
  rotate(submarineAngle);

  // the main body of the submarine
  noStroke();
  fill(80, 130, 180);
  beginShape();
  vertex(0, 0);
  bezierVertex(20, -100, 180, -60, 280, 0);
  bezierVertex(200, 60, 20, 100, 0, 0);
  endShape(CLOSE);

  // the top part of the submarine
  fill(50, 100, 150);
  arc(100, -55, 100, 50, PI, TWO_PI, OPEN);

  // the windows of the submarine
  fill(33);
  ellipse(45, 0, 25);
  ellipse(95, 0, 25);
  ellipse(145, 0, 25);
  ellipse(195, 0, 25);

  // the handle
  stroke(33);
  strokeWeight(10);
  line(0, 0, -50, 0);

  // the magnet
  push();
  scale(1.5);
  fill(200, 0, 0);
  ellipse(-60, 0, 40);
  fill(255);
  arc(-60, 0, 40, 40, PI, TWO_PI);
  pop();

  // the multi-blade propeller
  stroke(33);
  strokeWeight(4);
  let numBlades = 6;
  push();
  translate(280, 0);
  rotate(propellerAngle);
  for (let i = 0; i < numBlades; i++) {
    let angle = (TWO_PI / numBlades) * i;
    let startX = 0;
    let startY = 0;
    let endX = startX + cos(angle) * 30;
    let endY = startY + sin(angle) * 30;
    line(startX, startY, endX, endY);
  }
  pop();

  pop();
}

function keyPressed() {
  let moveAmount = 5; // The amount to move the submarine for each key press

  if (keyCode === LEFT_ARROW) {
    submarineX -= moveAmount;
  } else if (keyCode === RIGHT_ARROW) {
    submarineX += moveAmount;
  } else if (keyCode === UP_ARROW) {
    submarineY -= moveAmount;
  } else if (keyCode === DOWN_ARROW) {
    submarineY += moveAmount;
  }
}

function UnderwaterMine(x, y) {
  let scaleFactor = 0.4; 

  fill(128, 128, 128);
  stroke(0);
  strokeWeight(2);

  // the main body of the mine
  ellipse(x, y, 100 * scaleFactor, 100 * scaleFactor);
  ellipse(x, y, 3, 3);

  // the spikes
  let numSpikes = 16;
  let spikeLength = 30 * scaleFactor;
  strokeWeight(8 * scaleFactor);
  for (let i = 0; i < numSpikes; i++) {
    let angle = (TWO_PI / numSpikes) * i;
    let startX = x + cos(angle) * 50 * scaleFactor;
    let startY = y + sin(angle) * 50 * scaleFactor;
    let endX = x + cos(angle) * (50 * scaleFactor + spikeLength / 2); // Shorter spikes on the inside
    let endY = y + sin(angle) * (50 * scaleFactor + spikeLength / 2);

    line(startX, startY, endX, endY);
  }

  // the chain
  strokeWeight(2 * scaleFactor);
  noFill();
  let chainLength = 70 * scaleFactor;
  let numLinks = 10;
  let linkSize = 10 * scaleFactor;
  let swayAmount = 5;
  for (let i = 0; i < numLinks; i++) {
    let linkY = y + 50 * scaleFactor + (chainLength / numLinks) * i;
    let swayX = x + swayAmount * sin(frameCount * 0.05 + i); // Calculate sway based on frameCount and link index
    ellipse(swayX, linkY, linkSize, linkSize);
  }
}

function drawToxicBarrel(x, y, scaleFactor) {
  push();
  translate(x, y);
  scale(scaleFactor * 0.8);
  fill(255, 255, 0);
  stroke(0);
  strokeWeight(2);

  // the rounded barrel
  let barrelWidth = 50;
  let barrelHeight = 85;
  let curveAmount = 17;

  beginShape();
  vertex(x - barrelWidth / 2, y - barrelHeight / 2 + curveAmount);
  bezierVertex(
    x - barrelWidth / 2,
    y - barrelHeight / 2,
    x - barrelWidth / 2 + curveAmount,
    y - barrelHeight / 2,
    x,
    y - barrelHeight / 2
  );
  bezierVertex(
    x + barrelWidth / 2 - curveAmount,
    y - barrelHeight / 2,
    x + barrelWidth / 2,
    y - barrelHeight / 2,
    x + barrelWidth / 2,
    y - barrelHeight / 2 + curveAmount
  );
  vertex(x + barrelWidth / 2, y + barrelHeight / 2 - curveAmount);
  bezierVertex(
    x + barrelWidth / 2,
    y + barrelHeight / 2,
    x + barrelWidth / 2 - curveAmount,
    y + barrelHeight / 2,
    x,
    y + barrelHeight / 2
  );
  bezierVertex(
    x - barrelWidth / 2 + curveAmount,
    y + barrelHeight / 2,
    x - barrelWidth / 2,
    y + barrelHeight / 2,
    x - barrelWidth / 2,
    y + barrelHeight / 2 - curveAmount
  );
  endShape(CLOSE);

  // the rounded top
  fill(255, 255, 0);
  arc(x, y - 59 * 0.6, barrelWidth, curveAmount, PI, 3, OPEN);
  arc(x, y + 59 * 0.6, barrelWidth, curveAmount, PI, 3, OPEN); 

  // the toxic symbol
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("☣", x, y);
  pop();
}

function checkCollision() {
  for (let mine of mines) {
    let d = dist(submarineX, submarineY, mine.x, mine.y);
    if (d < 10 + submarineSize / 2) {
      return true;
    }
  }
  return false;
  
}

function draw() {
  background(255);
  image(myImage, 0, 0, windowWidth, windowHeight); // background image

  //timer
  push();
  textSize(32);
  if (timeLeft > 0) {
    text("Time Left: " + timeLeft, 10, 30);
    if (frameCount % 60 == 0 && timeLeft > 0) timeLeft--;
  }
  pop();
  //end timer

  // toxic barrels
  for (let barrel of barrels) {
    push();
    scale(barrel.scaleFactor);
    drawToxicBarrel(
      barrel.x / barrel.scaleFactor,
      barrel.y / barrel.scaleFactor
    );
    pop();
  }

// underwater mines
for (let mine of mines) {
  let mineX = mine.x / mine.scaleFactor + 20 * sin(frameCount * 0.02 + mine.offsetX);
  let mineY = mine.y / mine.scaleFactor;
  
  if (mineX > 300 && mineY > 300) {
    push();
    scale(mine.scaleFactor);
    UnderwaterMine(mineX, mineY);
    pop();
  }
}

  // the submarine
  if (submarineVisible) {
    drawSubmarine(submarineX, submarineY);
    propellerAngle += 0.05;
  }

  // Moving the base down by 60 pixels
  push();
  translate(0, 60);
  drawBase();
  pop();

  let moveAmount = 5;

  if (keyIsDown(LEFT_ARROW)) {
    submarineX -= moveAmount;
    submarineAngle = 0;
    if (submarineX < 0) {
      submarineX = 0;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    submarineX += moveAmount;
    submarineAngle = PI;
    if (submarineX > windowWidth) submarineX = windowWidth;
  }
  if (keyIsDown(UP_ARROW)) {
    submarineY -= moveAmount;
    submarineAngle = PI / 2;
    if (submarineY < 0) submarineY = 0;
  }
  if (keyIsDown(DOWN_ARROW)) {
    submarineY += moveAmount;
    submarineAngle = -PI / 2;
    if (submarineY > windowHeight) submarineY = windowHeight;
  }

  if (checkCollision() && !explosionTriggered) {
    explosionX = submarineX;
    explosionY = submarineY;
    explosionTriggered = true;
    submarineVisible = false;
    gameOver = true;
  }

  // explosion
  if (explosionTriggered) {
    explosion(explosionX, explosionY, true);
    textSize(62);
    fill(0);
    text('Game Over', width / 2 - 100, height / 2);
  } else {
    explosion(0, 0, false);
  }
}
