class Player extends Launcher {
  constructor() {
    super(width/2, height/2);
    this.anglarVelocity = PI/180;
    this.bulletSpeed = 20;
    this.bulletInterval = 10;
    this.bulletNumber = 6;
    this.radius = 10;
    this.maxVelocity = 20;
    this.coolTime = 0;
    this.color = 255;
  }

  update() {
    super.update();
    this.launch();
    this.move();
    this.draw();
    if (false) {
      this.updateDamage();
    }
  }

  launch() {
    if (frameCount % this.bulletInterval === 0) {
      const times = this.bulletNumber;
      const range = PI/8;
      for (let i = 0; i < times; i++) {
        const bullet = new StraitBullet(this.color);
        const angle = times-1 ? i / (times-1) * range - range/2 : 0;
        bullet.setPosition(this.position);
        bullet.setVelocity(
          createVector(0, -1)
          .rotate(angle)
          .mult(this.bulletSpeed)
        );
        this.bullets.push(bullet);
      }
    }
  }

  updateDamage() {
    if (this.coolTime > 0) {
      this.coolTime--;
    } else {
      this.coolTime += 50;
    }
  }

  move() {
    if (mouseIsPressed) {
      let pointX = winMouseX / game.widthScale;
      let pointY = winMouseY / game.heightScale;
      if (window.innerWidth < window.innerHeight) {
        pointY -= window.innerHeight - window.innerWidth;
      } else {
        pointX;
      }

      this.velocity = createVector(
        pointX - this.position.x,
        pointY - this.position.y
      )
      .limit(this.maxVelocity);
      this.position.add(this.velocity);
    }

    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x > width) {
      this.position.x = width;
    } else if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y > height) {
      this.position.y = height;
    }
  }

  draw() {
    push();
      translate(this.position.x, this.position.y);
      push();
        noFill();
        stroke(255, 128);
        strokeWeight(2);
        rotate(PI/6);
        triangle(
          5 * this.radius * cos(this.angle),
          5 * this.radius * sin(this.angle),
          5 * this.radius * cos(this.angle + 2/3*PI),
          5 * this.radius * sin(this.angle + 2/3*PI),
          5 * this.radius * cos(this.angle - 2/3*PI),
          5 * this.radius * sin(this.angle - 2/3*PI)
        );
      pop();
      push();
        fill(255);
        noStroke();
        circle(0, 0, 10);
      pop();
    pop();
  }
}

class Enemy extends Launcher {
  constructor(x, y, args) {
    super(x, y, args);
    this.color = color(255, 0, 0);
    this.alphaColor = color(255, 0, 0, 128);
  }
}

class CircleEnemy extends Enemy {
  constructor(x, y, args) {
    super(x, y, args);
    this.anglarVelocity = PI/180;
    this.bulletSpeed = 5;
    this.radius = 50;
  }

  update() {
    super.update();
    this.rotate();
    this.launch();
    this.draw();
  }

  rotate() {
    this.angle += this.anglarVelocity;
  }

  launch() {
    if (frameCount % 30 === 1) {
      const div = 18;
      for (let i = 0; i < div; i++) {
        const bullet = new StraitBullet(this.color);
        bullet.setPosition(this.position);
        bullet.setVelocity(
          createVector(1, 0)
          .rotate(TWO_PI / div * i + this.angle)
          .mult(this.bulletSpeed)
        );
        this.bullets.push(bullet);
      }
    }
  }

  draw() {
    push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      push();
        noFill();
        strokeWeight(2);
        push();
          stroke(this.alphaColor);
          square(0, 0, this.radius * Math.sqrt(2));
        pop();
        push();
          stroke(this.color);
          circle(0, 0, this.radius);
        pop();
      pop();
      push();
        fill(this.color);
        noStroke();
        circle(0, 0, 10);
      pop();
    pop();
  }
}
