
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

// DANGER ZONE variables
var MIN_DANGER_ZONE = 300;
var MAX_DANGER_ZONE = 700;

// Min and max velocity variables
var MIN_BALL_SPEED = 50;
var MAX_BALL_SPEED = 400;

var game = new Phaser.Game(config);

let timerText = ""; 
let timer = 0; 
let interval; 

function preload ()
{
    this.load.image('whiteBall', 'images/ball1.png');
    

}

// Random number generation
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function create ()
{
    timerText = this.add.text(600, 16, 'timer: 0', {fontSize: '32px', fill: '#fff'});

    balls = this.physics.add.group();

    let ball = balls.create(300, 300, 'whiteBall');
    ball.setScale(0.2);
    ball.refreshBody();
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocityX(200);
    ball.setVelocityY(100);
    ball.setCircle(256);
    ball.name = "ball1";
    ball.allowRotation = false;
    ball.refreshBody();

    paddles = this.physics.add.group();

    let paddle = paddles.create(600, 600, 'whiteSquare');
    paddle.setScale(0.1, 0.5);
    paddle.setBounce(0);
    paddle.setImmovable(true);
    paddle.setCollideWorldBounds(true);
    paddle.name = "rightpaddle1";
    paddle.refreshBody();

    this.physics.add.collider(balls, paddles);

    interval = setInterval(function(){
        timer += 1; 
        timerText.setText('timer: ' + timer);
    }, 1000)

}

function update ()
{
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
        let paddle = paddles.getChildren().find(v => v.name === "rightpaddle1");
        paddle.setVelocityY(-200);
    }
    else if (cursors.down.isDown) {
        let paddle = paddles.getChildren().find(v => v.name === "rightpaddle1");
        paddle.setVelocityY(200);
    } else {
        paddles.setVelocityY(0);
    }
}

function createBall() {

    // Find random coordinates within danger zone
    var x = getRandomInt(MIN_DANGER_ZONE, MAX_DANGER_ZONE);
    var y = getRandomInt(MIN_DANGER_ZONE, MAX_DANGER_ZONE);

    var ball = balls.create(x, y, 'whiteBall');
    ball.setScale(0.2);
    ball.refreshBody();
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);

    ball.setVelocityX(get);
    ball.setVelocityY(100);
    ball.setCircle(256);
    ball.name = "ball1";
    ball.allowRotation = false;
    ball.refreshBody();
}