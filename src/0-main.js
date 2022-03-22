const width  = 1000;
const height = 1000;
let game;

function setup() {
  createCanvas(width, height);
  game = new Game();
}

function draw() {
  game.update();
}

function windowResized() {
  game.resize();
}

class Bullet {
  constructor(){
    this.position = createVector();
    this.velocity = createVector();
    this.angle = 0;
  }

  update() {
    this.position.add(this.velocity);
    this.draw();
    return this.collisionField() || this.collisionPlayer();
  }

  draw() {
  }

  collisionField() {
    return !(this.position.x > 0 &&
      this.position.x < width &&
      this.position.y > 0 &&
      this.position.y < height);
  }

  collisionPlayer() {
    return false;
    return detectCollision(this, game.player);
  }

  setPosition(position) {
    this.position = createVector(position.x, position.y);
  }

  setVelocity(velocity) {
    this.velocity = velocity;
    this.angle = this.velocity.heading();
  }
}

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
}

function detectCollision(self, target) {
  const dist0 = dist(
    self.position.x,
    self.position.y,
    target.position.x,
    target.position.y
  );
  const radiusSum = self.radius + target.radius;
  return dist0 < radiusSum;
}

class Game {
  constructor() {
    this.width  = 1000;
    this.height = 1000;
    this.player = new Player();
    this.enemies = [];
    this.resize();

    rectMode(CENTER);
    ellipseMode(RADIUS);

    this.enemies.push(new CircleEnemy(900, 100));
    this.enemies.push(new CircleEnemy(800, 100));
  }

  update() {
    background(0);
    this.updatePlayer();
    this.updateEnemies();
  }

  updatePlayer() {
    this.player.update();
  }

  updateEnemies() {
    this.enemies = this.enemies.filter(enemy => !enemy.update());
  }

  resize() {
    const canvas = select("canvas").elt;
    this.widthScale  = window.innerWidth  / width;
    this.heightScale = window.innerHeight / height;
    canvas.style.zoom = Math.min(window.innerWidth, window.innerHeight) / width;
    if (window.innerWidth < window.innerHeight) {
      this.heightScale *= canvas.style.zoom;
    } else {
      this.widthScale  *= canvas.style.zoom;
    }
  }
}
