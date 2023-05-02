let submarineX = 240;
let submarineY = 200;

let barrels = [];
let mines = [];
let occupiedPositions = [];


function preload() {
  myImage = loadImage('/img/background-svg.svg');
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
  
  // Create 10 random toxic barrels
  for (let i = 0; i < 10; i++) {
    let x, y, scaleFactor;
    do {
      x = random(width);
      y = random(height);
      scaleFactor = random(0.5, 1.0);
    } while (checkOverlap(x, y, 100 * scaleFactor));
    barrels.push({ x: x, y: y, scaleFactor: scaleFactor });
    occupiedPositions.push({ x: x, y: y });
  }

  // Create 10 random underwater mines
  for (let i = 0; i < 10; i++) {
    let x, y, scaleFactor;
    do {
      x = random(width);
      y = random(height);
      scaleFactor = random(0.5, 1.0);
    } while (checkOverlap(x, y, 100 * scaleFactor));
    mines.push({ x: x, y: y, scaleFactor: scaleFactor });
    occupiedPositions.push({ x: x, y: y });
  }
}

let propellerAngle = 0;

function drawSubmarine(x, y) {
  push();
  translate(x, y);
  scale(0.5); // Apply a 50% scale transformation

  // Draw the main body of the submarine
  noStroke();
  fill(80, 130, 180);
  beginShape();
  vertex(0, 0);
  bezierVertex(20, -100, 180, -60, 280, 0);
  bezierVertex(200, 60, 20, 100, 0, 0);
  endShape(CLOSE);

  // Draw the top part of the submarine
  fill(50, 100, 150);
  arc(110, -70, 100, 50, PI, TWO_PI, OPEN);

  // Draw the windows of the submarine
  fill(33);
  ellipse(45, 0, 25);
  ellipse(95, 0, 25);
  ellipse(145, 0, 25);
  ellipse(195, 0, 25);

  // Draw the handle
  stroke(33);
  strokeWeight(10);
  line(0, 0, -40, 0);

  // Draw the magnet
  fill(200, 0, 0);
  ellipse(-80, 0, 40);
  fill(255);
  arc(-80, 0, 40, 40, PI, TWO_PI);

  // Draw the multi-blade propeller
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

function smallerUnderwaterMine(x, y) {
  let scaleFactor = 0.4; // 40% smaller

  fill(128, 128, 128); // Gray color
  stroke(0); // Black outline
  strokeWeight(2);

  // Draw the main body of the mine
  ellipse(x, y, 100 * scaleFactor, 100 * scaleFactor);
  ellipse(x, y, 3, 3);

  // Draw the spikes
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

  // Draw the chain
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
  scale(scaleFactor);
  fill(255, 255, 0); // Yellow color
  stroke(0); // Black outline
  strokeWeight(2);

  // Draw the rounded barrel
  let barrelWidth = 60; // Reduced width
  let barrelHeight = 90; // Reduced height
  let curveAmount = 18; // Reduced curve amount

  beginShape();
  vertex(x - barrelWidth / 2, y - barrelHeight / 2 + curveAmount);
  bezierVertex(x - barrelWidth / 2, y - barrelHeight / 2, x - barrelWidth / 2 + curveAmount, y - barrelHeight / 2, x, y - barrelHeight / 2);
  bezierVertex(x + barrelWidth / 2 - curveAmount, y - barrelHeight / 2, x + barrelWidth / 2, y - barrelHeight / 2, x + barrelWidth / 2, y - barrelHeight / 2 + curveAmount);
  vertex(x + barrelWidth / 2, y + barrelHeight / 2 - curveAmount);
  bezierVertex(x + barrelWidth / 2, y + barrelHeight / 2, x + barrelWidth / 2 - curveAmount, y + barrelHeight / 2, x, y + barrelHeight / 2);
  bezierVertex(x - barrelWidth / 2 + curveAmount, y + barrelHeight / 2, x - barrelWidth / 2, y + barrelHeight / 2, x - barrelWidth / 2, y + barrelHeight / 2 - curveAmount);
  endShape(CLOSE);

  // Draw the rounded top
  fill(255, 255, 0);
  arc(x, y - 59 * 0.6, barrelWidth, curveAmount, PI, 3, OPEN); // Reduced y-coordinate
  arc(x, y + 59 * 0.6, barrelWidth, curveAmount, PI, 3, OPEN); // Reduced y-coordinate

  // Draw the toxic symbol
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30); // Reduced text size
  text("☣", x, y);
  pop();
}

function underwaterMine(x, y) {
  fill(128, 128, 128); // Gray color
  stroke(0); // Black outline
  strokeWeight(2);

  // Draw the main body of the mine
  ellipse(x, y, 100, 100);
  fill(0);
  ellipse(x, y, 10, 10);

  // Draw the spikes
  let numSpikes = 12;
  let spikeLength = 15;
  strokeWeight(8); // Increased stroke weight for thicker spikes
  for (let i = 0; i < numSpikes; i++) {
    let angle = (TWO_PI / numSpikes) * i;
    let startX = x + cos(angle) * 50;
    let startY = y + sin(angle) * 50;
    let endX = x + cos(angle) * (50 + spikeLength);
    let endY = y + sin(angle) * (50 + spikeLength);

    line(startX, startY, endX, endY);
  }

// Draw the chain
strokeWeight(2);
noFill();
let chainLength = 100;
let numLinks = 7;
let linkSize = 15;
let swayAmount = 3; // Smaller sway amount for the larger mine
for (let i = 0; i < numLinks; i++) {
  let linkY = y + 50 + (chainLength / numLinks) * i;
  let swayX = x + swayAmount * sin(frameCount * 0.05 + i); // Calculate sway based on frameCount and link index
  ellipse(swayX, linkY, linkSize, linkSize);
  }
}

//bezierCurves -> vertex(x1,y1)
//      bezierVertex(x2,y2)

/*

function draw() {
  background(255);
  image(myImage,0, 0, windowWidth, windowHeight); // Draw the background image first
  drawToxicBarrel(100, 300);
  smallerUnderwaterMine(300, 200);
  let mineX = width / 2 + 20 * sin(frameCount * 0.02); // Calculate mine's x position with a slight horizontal movement
  underwaterMine(mineX, height / 2);

  /Draw the body of the submarine
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
  stroke(33);
  strokeWeight(10);
  line(100, 200, 60, 200);

  // Draw the magnet
  fill(200, 0, 0);
  ellipse(40, 200, 30);
  //rect(x,y,w,[h],[topleft],[topright],[bottomright],[bottomleft])
  fill(33);
  rect(165, 95, 65, 50, 20, 59, 0);


  drawSubmarine(submarineX, submarineY);
  propellerAngle += 0.05;

  propellerAngle += 0.05;
  let moveAmount = 5;
  if (keyIsDown(LEFT_ARROW)) {
    submarineX -= moveAmount;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    submarineX += moveAmount;
  }
  if (keyIsDown(UP_ARROW)) {
    submarineY -= moveAmount;
  }
  if (keyIsDown(DOWN_ARROW)) {
    submarineY += moveAmount;
  }
}
*/

function draw() {
  background(255);
  image(myImage,0, 0, windowWidth, windowHeight); // Draw the background image first

  // Draw toxic barrels
  for (let barrel of barrels) {
    push();
    scale(barrel.scaleFactor);
    drawToxicBarrel(barrel.x / barrel.scaleFactor, barrel.y / barrel.scaleFactor);
    pop();
  }

  // Draw underwater mines
  for (let mine of mines) {
    push();
    scale(mine.scaleFactor);
    let mineX = mine.x / mine.scaleFactor + 20 * sin(frameCount * 0.02 + mine.offsetX);
    smallerUnderwaterMine(mineX, mine.y / mine.scaleFactor); // Updated this line
    pop();
  }

  // Draw the submarine
  drawSubmarine(submarineX, submarineY);
  propellerAngle += 0.05;

  let moveAmount = 5;
  if (keyIsDown(LEFT_ARROW)) {
    submarineX -= moveAmount;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    submarineX += moveAmount;
  }
  if (keyIsDown(UP_ARROW)) {
    submarineY -= moveAmount;
  }
  if (keyIsDown(DOWN_ARROW)) {
    submarineY += moveAmount;
  }
}


