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
  
  export default SubmarineClass;