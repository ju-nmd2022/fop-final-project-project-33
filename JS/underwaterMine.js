
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

export default UnderwaterMine;