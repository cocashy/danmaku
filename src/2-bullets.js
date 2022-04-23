class Bullet extends Particle {
  constructor(hitPoint=1){
    super();
    this.hitPoint = hitPoint;
  }

  update() {
    return super.update() || !(this.hitPoint > 0);
  }

  hit() {
    this.hitPoint--;
  }
}

class LinearBullet extends Bullet {
  constructor(color) {
    super();
    this.color = color;
    this.radius = 10;
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

class AccelBullet extends LinearBullet {
  constructor(color) {
    super(color);
    this.accel = createVector();
  }

  update() {
    this.velocity.add(this.accel);
    return super.update();
  }

  setAccel(accel) {
    this.accel = accel;
  }
}

class HomingBullet extends LinearBullet {
  constructor(color) {
    super(color);
  }

  update() {
    this.setVelocity(
      this.velocity.add(
        this.target.position.copy()
        .sub(this.position)
        .normalize()
        .mult(0.1)
      )
      .normalize()
      .mult(this.speed)
    )
    return super.update();
  }

  setTarget(target) {
    this.target = target;
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}
