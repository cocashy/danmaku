class Particle {
  constructor() {
    this.position = createVector();
    this.velocity = createVector();
    this.angle = 0;
  }

  update() {
    this.position.add(this.velocity);
    this.draw();
    return this.collisionField();
  }

  draw() {

  }

  collisionField() {
    return !(this.position.x > 0 &&
      this.position.x < width &&
      this.position.y > 0 &&
      this.position.y < height);
  }

  setPosition(position) {
    this.position = createVector(position.x, position.y);
  }

  setVelocity(velocity) {
    this.velocity = velocity;
    this.angle = this.velocity.heading();
  }
}

class LinearParticle extends Particle {
  constructor(color) {
    super();
    this.color = color;
    this.radius = 10;
    this.startTime = millis();
    this.limitTime = 500;
  }

  update() {
    return super.update() || (millis() - this.startTime > this.limitTime);
  }

  draw() {
    push();
      noFill();
      stroke(this.color);
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      circle(0, 0, this.radius);
    pop();
  }
}
