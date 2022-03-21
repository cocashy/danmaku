class StraitBullet extends Bullet {
  constructor(args) {
    super({
      color: args.color ? args.color : 255
    });
    this.width  = 5;
    this.height = 10;
  }

  draw() {
    push();
      fill(this.color);
      noStroke();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      rect(-this.height/2, -this.width/2, this.height, this.width);
    pop();
  }
}
