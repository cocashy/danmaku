function randomLaunch(launcher) {
  if (frameCount % 2 === 1) {
    const bullet = new StraitBullet({ color: launcher.bulletColor });
    bullet.setPosition(launcher.position);
    bullet.setVelocity(
      p5.Vector.random2D()
      .mult(launcher.bulletSpeed)
    );
    launcher.bullets.push(bullet);
  }
}

function circleLaunch(launcher) {
  if (frameCount % 30 === 1) {
    const div = 32;
    for (let i = 0; i < div; i++) {
      const bullet = new StraitBullet({ color: launcher.bulletColor });
      bullet.setPosition(launcher.position);
      bullet.setVelocity(
        createVector(1, 0)
        .rotate(TWO_PI / div * i + launcher.angle)
        .mult(launcher.bulletSpeed)
      );
      launcher.bullets.push(bullet);
    }
  }
}

function spiralLaunch(launcher) {
  if (frameCount % 2 === 1) {
    const bullet = new StraitBullet({ color: launcher.bulletColor });
    bullet.setPosition(launcher.position);
    bullet.setVelocity(
      createVector(1, 0)
      .rotate(launcher.angle)
      .mult(launcher.bulletSpeed)
    );
    launcher.bullets.push(bullet);
  }
}
