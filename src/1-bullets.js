class StraitBullet extends Bullet {
  constructor(color) {
    super();
    this.color = color;
    this.radius = 5;
  }

  draw() {
    push();
      fill(this.color);
      noStroke();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      ellipseMode(RADIUS);
      ellipse(0, 0, this.radius*2, this.radius)
    pop();
  }
}
