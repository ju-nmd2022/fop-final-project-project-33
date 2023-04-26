function setup() {
  createCanvas(800, 600);
}

<<<<<<< Updated upstream
let myImage;
=======
function drawToxicBarrel(x, y) {
  fill(255, 255, 0); // Yellow color
  stroke(0); // Black outline
  strokeWeight(2);

  // Draw the rounded barrel
  let barrelWidth = 60; // Reduced width
  let barrelHeight = 90; // Reduced height
  let curveAmount = 18; // Reduced curve amount
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
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



function draw() {
  background(255);
  drawToxicBarrel(100, 300);

  smallerUnderwaterMine(300, 200);
  let mineX = width / 2 + 20 * sin(frameCount * 0.02); // Calculate mine's x position with a slight horizontal movement
  underwaterMine(mineX, height / 2);
>>>>>>> Stashed changes
}
