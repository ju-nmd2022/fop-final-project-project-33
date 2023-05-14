export default class Submarine {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 50;
    this.propellerAngle = 0;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(0.3);
    // rotate(submarineAngle);

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
    rotate(this.propellerAngle);
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
}
