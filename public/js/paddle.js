class Paddle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, isLeft) {
        super(scene, x, y, isLeft, "paddle");
        scene.add.existing(this);

        scene.physics.add.existing(this);
        // this.player_depth = 600;
        // this.depth = 5;

        var namet;

        if (isLeft) {
            this.x = 100;
            namet = "leftpaddle";
        } else {
            this.x = pxwidth-100;
            namet = "rightpaddle";
        }

        this.scene = scene;
        this.setScale(0.05, 0.3);
        this.setBounce(0);
        this.setImmovable(true);
        this.setCollideWorldBounds(true);
        this.name = namet;
        this.paddleSpeed = 450;
        this.refreshBody();

        self = this;

        // input key handlers?

        if (isLeft) {
            this.keyUp = scene.input.keyboard.addKey('W');
            this.keyDown = scene.input.keyboard.addKey('S');
        } else {
            this.keyUp = scene.input.keyboard.addKey('up');
            this.keyDown = scene.input.keyboard.addKey('down');
        }

        // Colliders
        scene.physics.add.collider(scene.balls, this, function () {
            scene.paddleHit.play();
        });

    }

    update() {

        // Reset Y velocity
        this.setVelocityY(0);

        if (this.keyUp.isDown) {
            paddle.setVelocityY(-paddleSpeed);
        } else if (this.keyDown.isDown) {
            paddle.setVelocityY(paddleSpeed);
        }

        // send socket event to server
        this.scene.io.emit('paddle_moved', {x: this.x, y: this.y});
    }
}