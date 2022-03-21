class Player extends Launcher {
  constructor() {
    super({
      x: width / 2,
      y: height / 2,
      anglarVelocity: PI / 20
    });
    this.maxVelocity = 20;
    this.launch = spiralLaunch;
  }

  update() {
    super.update();
    this.launch(this);
    this.move();
    this.draw();
  }

  move() {
    if (mouseIsPressed || touches.length) {
      let pointX, pointY;
      if (mouseIsPressed) {
        pointX = mouseX / canvas.style.zoom;
        pointY = mouseY / canvas.style.zoom;
      } else {
        pointX = touches[0].x;
        pointY = touches[0].y;
      }

      this.velocity = createVector(
        pointX - this.position.x,
        pointY - this.position.y
      );
      this.position.add(this.velocity.limit(this.maxVelocity));
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
        const r = 60;
        triangle(
          r * cos(this.angle + QUARTER_PI),
          r * sin(this.angle + QUARTER_PI),
          r * cos(this.angle + QUARTER_PI + 2/3*PI),
          r * sin(this.angle + QUARTER_PI + 2/3*PI),
          r * cos(this.angle + QUARTER_PI - 2/3*PI),
          r * sin(this.angle + QUARTER_PI - 2/3*PI)
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

class SquareEnemy extends Launcher {
  constructor(args) {
    super({
      x: args.x,
      y: args.y,
      bulletColor: color(255, 0, 0)
    });
    this.launch = circleLaunch;
  }

  update() {
    super.update();
    this.launch(this);
    this.draw();
  }

  draw() {
    push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      push();
        noFill();
        stroke(color(255, 0, 0, 128));
        strokeWeight(2);
        rectMode(CENTER);
        square(0, 0, 50);
        circle(0, 0, 50);
      pop();
      push();
        fill(color(255, 0, 0));
        noStroke();
        circle(0, 0, 10);
      pop();
    pop();
  }
}
