let game;

function setup() {
  game = new Game();
}

function draw() {
  game.update();
}

function windowResized() {
  game.resize();
}

class Game {
  constructor() {
    createCanvas(1000, 1000);
    frameRate(60);

    this.player = new Player();
    this.enemies = [];
    this.resize();

    rectMode(CENTER);
    ellipseMode(RADIUS);
    strokeWeight(3);

    this.enemies.push(new CircleEnemy(200, 300));
    this.enemies.push(new CircleEnemy(700, 300));
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
    const shorter = Math.min(windowWidth, windowHeight);
    resizeCanvas(shorter, shorter);
    scale(1000/shorter);
  }
}
