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
  
export default ToxicBarrel;