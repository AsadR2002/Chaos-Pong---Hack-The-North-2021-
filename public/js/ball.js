class Ball extends Phaser.Physics.Arcade.Sprite{
constructor (scene, x, y){
    

    super(scene, x, y, "whiteBall");
    this.MIN_BALL_SPEED = 100;
    this.MAX_BALL_SPEED = 400;
    // render
    scene.add.existing(this);
    
    // physics rendering
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.allowRotation = false;
    this.setBounce(1);
    this.setCircle(256);
    
    // Colliders
    this.physics.add.collider(this, scene.goals, scene.ballDelete);
    this.physics.add.collider(this, scene.balls, () => {
        scene.ballHit.play();
    });

    scene.bullets.add(this);
    this.setScale(0.2);
    this.xLR = getRandomInt(1, 3);
    if (xLR === 2) {
        xLR = -1;
    }
    this.yLR = getRandomInt(1, 3);
    if (yLR === 2) {
        yLR = -1;
    }
    this.setVelocityX(xLR*getRandomInt(MIN_BALL_SPEED, MAX_BALL_SPEED));
    this.setVelocityY(yLR*getRandomInt(MIN_BALL_SPEED, MAX_BALL_SPEED));
    
}
}