const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

class Ball {
  color: string;
  ctx: CanvasRenderingContext2D;
  speedX: number;
  speedY: number;
  x: number;
  y: number;
  size: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    speedX: number,
    speedY: number,
    color: string,
    size: number
  ) {
    this.ctx = ctx;
    this.x = x; //horizontal position
    this.y = y; //vertical position
    this.speedX = [speedX, -speedX][Math.floor(Math.random() * 2)];
    this.speedY = [speedY, -speedY][Math.floor(Math.random() * 2)];
    this.color = color;
    this.size = size;
  }

  draw() {
    this.ctx.beginPath();

    this.ctx.fillStyle = this.color;
    //this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.rect(this.x, this.y, this.size * 2, this.size);
    this.ctx.fill();
  }

  update(width: number, height: number) {
    //change orientation if necessary
    this.x + this.size >= width && (this.speedX = -this.speedX);
    this.x - this.size <= 0 && (this.speedX = -this.speedX);
    this.y + this.size >= height && (this.speedY = -this.speedY);
    this.y - this.size <= 0 && (this.speedY = -this.speedY);

    //update position
    this.x += this.speedX;
    this.y += this.speedY;
  }

  //   collisionDetect(balls: any) {
  //     for (let j = 0; j < balls.length; j++) {
  //       if (this !== balls[j]) {
  //         const dx = this.x - balls[j].x;
  //         const dy = this.y - balls[j].y;
  //         const distance = Math.sqrt(dx * dx + dy * dy);

  //         if (distance < this.size + balls[j].size) {
  //           const red = this.random(0, 255);
  //           const green = this.random(0, 255);
  //           const blue = this.random(0, 255);

  //           balls[j].color = this.color =
  //             "rgb(" + red + "," + green + "," + blue + ")";
  //         }
  //       }
  //     }
  //   }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Ball;
