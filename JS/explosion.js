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

export default Explosion;