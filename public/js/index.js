
var config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('whiteBall', 'images/ball.png');

}

function create ()
{
    balls = this.physics.add.group();

    balls.create(300, 300, 'whiteBall').setScale(0.5).refreshBody().setBounce(1).setCollideWorldBounds(true).setVelocityX(100).setVelocityY(50);
}

function update ()
{
}