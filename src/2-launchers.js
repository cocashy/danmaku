class Launcher {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.bullets = [];
    this.angle = 0;
  }

  update() {
    this.updateBullets();
  }

  updateBullets() {
    this.bullets = this.bullets.filter(bullet => !bullet.update());
  }

  detectCollision(target, self=this) {
    return dist(
      self.position.x,
      self.position.y,
      target.position.x,
      target.position.y
    ) < self.radius + target.radius;
  }
}

class Player extends Launcher {
  constructor() {
    super(width/2, height/2);
    this.color = color(255);
    this.alphaColor = color(255, 128);
    this.radius = 30;
    this.maxVelocity = 20;
    this.anglarVelocity = PI/180;
    this.bulletSpeed = 20;
    this.bulletInterval = 10;
    this.coolTime = 0;
  }

  update() {
    super.update();
    this.launch();
    this.move();
    this.draw();
    this.updateDamage();
  }

  launch() {
    if (frameCount % this.bulletInterval === 0) {
      const times = 3;
      const range = PI/9;
      for (let i = 0; i < times; i++) {
        const bullet = new LinearBullet(this.color);
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
    this.coolTime -= (this.coolTime > 0) ? 1 : 0
  }

  hit() {
    this.coolTime = !(this.coolTime > 0) ? 50 : this.coolTime;
  }

  move() {
    if (mouseIsPressed) {
      this.velocity = createVector(
        mouseX - this.position.x,
        mouseY - this.position.y
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
        stroke(this.alphaColor);
        const scalar = 2 * this.radius;
        scale(scalar);
        strokeWeight(2 / scalar);
        rotate(this.angle + PI/6);
        triangle(
          cos(0), sin(0),
          cos(2/3*PI), sin(2/3*PI),
          cos(4/3*PI), sin(4/3*PI)
        );
      pop();
      push();
        fill(this.color);
        noStroke();
        if (this.coolTime % 3 === 0) {
          circle(0, 0, this.radius);
        }
      pop();
    pop();
  }
}

class Enemy extends Launcher {
  constructor(x, y, args) {
    super(x, y, args);
    this.color = color(255, 0, 0);
    this.alphaColor = color(255, 0, 0, 128);
    this.hitPoint = 100;
  }

  update() {
    super.update();
    this.collisionBullets();
    this.collisionBody();
    return !(this.hitPoint > 0);
  }

  hit() {
    this.hitPoint--;
  }

  collisionBullets() {
    this.bullets.map(ownBullet => {
      game.player.bullets.filter(playerBullet => {
        return this.detectCollision(ownBullet, playerBullet);
      }).map(playerBullet => {
        ownBullet.hit();
        playerBullet.hit();
        return;
      });
      if (this.detectCollision(game.player, ownBullet)) {
        ownBullet.hit();
        game.player.hit();
      }
    });
  }

  collisionBody() {
    game.player.bullets.filter(playerBullet => {
      return this.detectCollision(playerBullet);
    }).map(playerBullet => {
      this.hit();
    });
    if (this.detectCollision(game.player)) {
      game.player.hit();
    }
  }
}

class CircleEnemy extends Enemy {
  constructor(x, y, args) {
    super(x, y, args);
    this.anglarVelocity = PI/160;
    this.bulletSpeed = 4;
    this.bulletAccel = -0.1;
    this.radius = 50;
  }

  update() {
    this.rotate();
    this.launch();
    this.draw();
    return super.update();
  }

  rotate() {
    this.angle += this.anglarVelocity;
  }

  launch() {
    if (frameCount % 30 === 1) {
      const div = 6;
      for (let i = 0; i < div; i++) {
        const bullet = new HomingBullet(this.color);
        bullet.setPosition(this.position);
        bullet.setVelocity(
          createVector(1, 0)
          .rotate(TWO_PI / div * i + this.angle)
          .mult(this.bulletSpeed)
        );
        bullet.setTarget(game.player);
        bullet.setSpeed(this.bulletSpeed);
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
