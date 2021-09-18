
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
var rightScoreText ="";
var leftScoreText = ""; 
var timer = 0; 
var interval; 
var balls;
var paddles;
var numbBalls = 0; 
var leftSideScore = 0; 
var rightSideScore = 0; 

// DANGER ZONE variables
var MIN_DANGER_ZONE = 300;
var MAX_DANGER_ZONE = 700;

// Min and max velocity variables
var MIN_BALL_SPEED = -300;
var MAX_BALL_SPEED = 300;

// Random number generation between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function preload ()
{
    this.load.image('whiteBall', 'images/ball1.png');
    this.load.image('whiteSquare', 'images/paddle.jpg');

}


function create ()
{
    timerText = this.add.text(500, 16, '0', {fontSize: '32px', fill: '#fff'});
    rightScoreText = this.add.text(960, 16, '0', {fontSize: '32px', fill: '#fff'});
    leftScoreText = this.add.text(25, 16, '0', {fontSize: '32px', fill: '#fff'});

    balls = this.physics.add.group();

    createBall(numbBalls);


    paddles = this.physics.add.group();

    createPaddle(false, 1);
    createPaddle(true, 1);


    this.physics.add.collider(balls, paddles);
    this.physics.add.collider(balls, balls);

    interval = setInterval(function(){
        timer += 1; 
        timerText.setText(timer);
        if(timer % 5 === 0)
        {
            numbBalls++;
            createBall(numbBalls);
        };
    }, 1000)

    

}

function update ()
{
    
    
    cursors = this.input.keyboard.createCursorKeys();
    

    paddles.getChildren().forEach(paddle => paddle.setVelocityY(0));

    //balls.getChildren().forEach(ball => {
        
    //})
    let paddle;

    if (cursors.up.isDown) {
        paddle = paddles.getChildren().find(v => v.name === "rightpaddle1");
        paddle.setVelocityY(-200);
    }
    else if (cursors.down.isDown) {
        paddle = paddles.getChildren().find(v => v.name === "rightpaddle1");
        paddle.setVelocityY(200);
    } else {
        //paddles.setVelocityY(0);
    }
    if (cursors.left.isDown) {
        paddle = paddles.getChildren().find(v => v.name === "leftpaddle1");
        paddle.setVelocityY(-200);
    }
    else if (cursors.right.isDown) {
        paddle = paddles.getChildren().find(v => v.name === "leftpaddle1");
        paddle.setVelocityY(200);
    } else {
        //paddles.setVelocityY(0);
    }

    // figure out a way to have it so that paddles stop when the button isn't being pressed.
    //add a function that will do the same stuff but for different paddle names and different keys (takes 3 parameters)

    
    balls.getChildren().forEach(ball => {
        if(ball.x <= 75 || ball.x >= 925)
        {
            if(ball.x <= 75)
            {
                rightSideScore++;
                rightScoreText.setText(rightSideScore);
            }

            else
            {
                leftSideScore++;
                leftScoreText.setText(leftSideScore);
            }

            ball.destroy();
        }
    });
}

function createBall(num) {

    var x = getRandomInt(MIN_DANGER_ZONE, MAX_DANGER_ZONE);
    var y = getRandomInt(MIN_DANGER_ZONE, MAX_DANGER_ZONE);

    var ball = balls.create(x, y, 'whiteBall');
    ball.setScale(0.2);
    ball.refreshBody();
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);

    //ball.setMaxVelocityX(MAX_BALL_SPEED);
    //ball.setMaxVelocityY(MAX_BALL_SPEED);

    ball.setVelocityX(getRandomInt(MIN_BALL_SPEED, MAX_BALL_SPEED));
    ball.setVelocityY(getRandomInt(MIN_BALL_SPEED, MAX_BALL_SPEED));
    ball.setCircle(256);
    ball.name = "ball"+num;
    ball.allowRotation = false;
    ball.refreshBody();
}


function createPaddle(isLeft, num) {

    var x;
    var namet;

    if (isLeft) {
        x = 100;
        namet = "leftpaddle"+num;
    } else {
        x = 900;
        namet = "rightpaddle"+num;
    }
    
    var y = 600;

    var paddle = paddles.create(x, y, 'whiteSquare');
    paddle.setScale(0.1, 0.5);
    paddle.setBounce(0);
    paddle.setImmovable(true);
    paddle.setCollideWorldBounds(true);
    paddle.name = namet;
    paddle.refreshBody();
}