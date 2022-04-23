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
    createCanvas(1, 1);
    frameRate(60);
    this.resize();

    this.player = new Player();
    this.enemies = [];
    this.particles = [];
    this.killNum = 0;
    this.maxEnemyNum = 1;

    rectMode(CENTER);
    ellipseMode(RADIUS);
    strokeWeight(3);
  }

  update() {
    background(0);
    this.updatePlayer();
    this.updateEnemies();
    this.updateParticles();
  }

  updatePlayer() {
    this.player.update();
  }

  updateEnemies() {
    this.enemies = this.enemies.filter(enemy => !enemy.update());

    if (this.enemies.length < this.maxEnemyNum) {
      const newEnemy = new CircleEnemy(width*random(), height/4)
      this.enemies.push(newEnemy);

      this.killNum++;
      if (this.killNum % 3 === 0) {
        this.maxEnemyNum++;
      }
    }
  }

  updateParticles() {
    this.particles = this.particles.filter(particle => !particle.update());
  }

  resize() {
    const shorter = Math.min(windowWidth, windowHeight);
    resizeCanvas(shorter, shorter);
  }
}
