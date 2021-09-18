
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

var timerText = ""; 
var timer = 0; 
var interval; 
var balls;
var paddles;
var numbBalls = 0; 

function preload ()
{
    this.load.image('whiteBall', 'images/ball1.png');
    this.load.image('whiteSquare', 'images/paddle.jpg');

}


function create ()
{
    timerText = this.add.text(600, 16, 'timer: 0', {fontSize: '32px', fill: '#fff'});

    

    balls = this.physics.add.group();

    createBall(numbBalls);


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
        if(timer % 30 === 0)
        {
            numbBalls++;
            createBall(numbBalls);
        };
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

function createBall(num) {
    let ball = balls.create(300, 300, 'whiteBall');
    ball.setScale(0.2);
    ball.refreshBody();
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocityX(200);
    ball.setVelocityY(100);
    ball.setCircle(256);
    ball.name = "ball"+num;
    ball.allowRotation = false;
    ball.refreshBody();
}