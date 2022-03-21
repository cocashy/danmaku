const width  = 1000;
const height = 1000;
let game;

function setup() {
  createCanvas(width, height);
  windowResized();
  game = new Game();
}

function draw() {
  background(0);
  game.update();
}

function windowResized() {
  const canvas = document.getElementById('defaultCanvas0');
  const shorter = Math.min(window.innerWidth, window.innerHeight);
  canvas.style.zoom = shorter / height;
}

class Bullet {
  constructor(args){
    this.position = createVector();
    this.velocity = createVector();
    this.angle = 0;
    this.color = args.color ? args.color : 255;
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

class Launcher {
  constructor(args) {
    this.position = createVector(args.x, args.y);
    this.velocity = createVector();
    this.bullets = [];
    this.bulletSpeed = args.bulletSpeed ? args.bulletSpeed : 3;
    this.bulletColor = args.bulletColor ? args.bulletColor : 255;
    this.angle = 0;
    this.anglarVelocity = args.anglarVelocity ? args.anglarVelocity : PI/180;
  }

  update() {
    this.updateBullets();
    this.rotate();
  }

  updateBullets() {
    this.bullets = this.bullets.filter(bullet => !bullet.update());
  }

  rotate() {
    this.angle += this.anglarVelocity;
  }
}

class Game {
  constructor() {
    this.player = new Player();
    this.enemies = [];

    this.enemies.push(new SquareEnemy({ x: 500, y: 100 }));
  }

  update() {
    this.updatePlayer();
    this.updateEnemies();
  }

  updatePlayer() {
    this.player.update();
  }

  updateEnemies() {
    this.enemies = this.enemies.filter(enemy => !enemy.update());
  }
}
