

var pxwidth = 1776;
var pxheight = 999;

var config = {
    type: Phaser.CANVAS,
    width: pxwidth,
    height: pxheight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH        
    },
    audio: {
        disableWebAudio: true
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
var endGameText = ""; 
const LEFTWIN = "Left Side has Won"; 
const RIGHTWIN = "Right Side has Won";
var timer = 0; 
var interval; 
var balls;
var paddles;
var numbBalls = 0; 
var leftSideScore = 0; 
var rightSideScore = 0; 
var paddleSpeed = 450;
var ballsLeft = 0;
var gameover = false; 
var fence;
var counter = 0;

// DANGER ZONE variables
var MIN_X_DANGER_ZONE = 400
var MIN_Y_DANGER_ZONE = 50;
var MAX_X_DANGER_ZONE = pxwidth-MIN_X_DANGER_ZONE;
var MAX_Y_DANGER_ZONE = pxheight-MIN_Y_DANGER_ZONE;
// Min and max velocity variables
var MIN_BALL_SPEED = 100;
var MAX_BALL_SPEED = 400;

// Radius settings
var MIN_BALL_RAD = 10;
var MAX_BALL_RAD = 50;

// Random number generation between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function preload ()
{
    this.load.image('whiteBall', 'images/ball1.png'); // ball
    this.load.image('whiteSquare', 'images/paddle.jpg'); // paddle
    this.load.image('fence', 'images/dashed line.png'); // middle line
    this.load.audio('paddleHit', 'sounds/mixkit-quick-jump-arcade-game-239.wav');
    this.load.audio('ballHit', 'sounds/mixkit-explainer-video-game-alert-sweep-236.wav');
    this.load.audio('background', 'sounds/mixkit-game-level-music-689.wav')
}

function create ()
{

    // Create instance of socket?
    //this.socket = io();

    var self = this;
    this.socket = io();
    this.socket.on('currentPlayers', (players) => {
        Object.keys(players).forEach( (id) => {
            if (players[id].playerId === self.socket.id) {
                addPlayer(self, players[id]);
            }
        });
    });

    

    this.socket.on('newPlayer', (playerInfo) => {
        // add that player
        // addOtherPlayers(self, playerInfo);
    });

    this.socket.on('disconnect', (playerId) => {
        self.otherPlayers.getChildren().forEach((otherPlayer) => {
            if (playerId == otherPlayer.playerId) {
                otherPlayer.destroy();
            }
        });
    });

    fence = this.add.image(pxwidth/2, pxheight/2, 'fence');
    paddleHit = this.sound.add('paddleHit', {volume: 0.8});
    ballHit = this.sound.add('ballHit', {volume: 0.2});
    background = this.sound.add('background', {volume: 0.05, loop: true});
    background.play();


    timerText = this.add.text(pxwidth/2, 28, '0', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5,0);
    rightScoreText = this.add.text(pxwidth-30, 28, '0', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5,0);
    leftScoreText = this.add.text(30, 28, '0', {fontSize: '32px', fill: '#fff'}).setOrigin(0.5,0);

    balls = this.physics.add.group();

    createBall(numbBalls);


    paddles = this.physics.add.group();

    createPaddle(false, 1);
    createPaddle(true, 1);


    this.physics.add.collider(balls, paddles, function () {
        paddleHit.play();
    });
    this.physics.add.collider(balls, balls, function () {
        ballHit.play();
    });

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

    if(gameover)
    {
        var textDisplay; 

        if(leftSideScore > rightSideScore)
        {
            textDisplay = LEFTWIN;
        }
    
        else
        {
            textDisplay = RIGHTWIN;
        }
        
    
        paddles.clear(true);
        endGameText = this.add.text(pxwidth/2, 500, textDisplay, {fontSize: '100px', fill: '#fff'}).setOrigin(0.5,0);
        // menuButton = this.add.text(pxwidth/2, pxheight/2, 'Back to Menu', {fontSize: '50px', fill: '#fff'})
        // .setOrigin(0.5)
        // .setInteractive()
        // .on('pointerdown', game.destroy(true, false))
        // .on('pointerover', () => menuButton.setStyle({ fill: '#f39c12' }))
        // .on('pointerout', () => menuButton.setStyle({ fill: '#fff' }));

        return; 

    } //else {

        
        
        cursors = this.input.keyboard.createCursorKeys();
        

        paddles.getChildren().forEach(paddle => paddle.setVelocityY(0));

        let paddle;

        if (cursors.up.isDown) {
            paddle = paddles.getChildren().find(v => v.name === "rightpaddle1");
            paddle.setVelocityY(-paddleSpeed);
        }
        else if (cursors.down.isDown) {
            paddle = paddles.getChildren().find(v => v.name === "rightpaddle1");
            paddle.setVelocityY(paddleSpeed);
        } else {
            //paddles.setVelocityY(0);
        }
        if (cursors.left.isDown) {
            paddle = paddles.getChildren().find(v => v.name === "leftpaddle1");
            paddle.setVelocityY(-paddleSpeed);
        }
        else if (cursors.right.isDown) {
            paddle = paddles.getChildren().find(v => v.name === "leftpaddle1");
            paddle.setVelocityY(paddleSpeed);
        } else {
            //paddles.setVelocityY(0);
        }

        // figure out a way to have it so that paddles stop when the button isn't being pressed.
        //add a function that will do the same stuff but for different paddle names and different keys (takes 3 parameters)

        
        balls.getChildren().forEach(ball => {
            if(ball.x <= 75 || ball.x >= pxwidth-75)
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
                ballsLeft--;
            }
        });

        if(ballsLeft <= 0) 
        {
            gameover = true; 
            endGame();
        }
    //}
}

function createBall(num) {

    var x = getRandomInt(MIN_X_DANGER_ZONE, MAX_X_DANGER_ZONE);
    var y = getRandomInt(MIN_Y_DANGER_ZONE, MAX_Y_DANGER_ZONE);
    ballsLeft++;

    var ball = balls.create(x, y, 'whiteBall');
    ball.setScale(0.2);
    ball.refreshBody();
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);

    //ball.setMaxVelocityX(MAX_BALL_SPEED);
    //ball.setMaxVelocityY(MAX_BALL_SPEED);

    var xLR = getRandomInt(1, 3);
    if (xLR === 2) {
        xLR = -1;
    }
    ball.setVelocityX(xLR*getRandomInt(MIN_BALL_SPEED, MAX_BALL_SPEED));

    var yLR = getRandomInt(1, 3);
    if (yLR === 2) {
        yLR = -1;
    }
    ball.setVelocityY(yLR*getRandomInt(MIN_BALL_SPEED, MAX_BALL_SPEED));

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
        x = pxwidth-100;
        namet = "rightpaddle"+num;
    }
    
    var y = 600;

    var paddle = paddles.create(x, y, 'whiteSquare');
    paddle.setScale(0.05, 0.3);
    paddle.setBounce(0);
    paddle.setImmovable(true);
    paddle.setCollideWorldBounds(true);
    paddle.name = namet;
    paddle.refreshBody();
}

function endGame()
{      
    timerText.setText('');
    clearInterval(interval);
    fence.destroy();
    
    backButton();
}

function backButton()
{
    // menuButton = this.add.text(pxwidth/2, pxheight/2, 'Back to Menu', {fontSize: '50px', fill: '#fff'})
    // .setOrigin(0.5)
    // .setInteractive()
    // .on('pointerdown', game.destroy(true, false))
    // .on('pointerover', () => menuButton.setStyle({ fill: '#f39c12' }))
    // .on('pointerout', () => menuButton.setStyle({ fill: '#fff' })); 

    let btn = document.createElement("button");
    btn.innerHTML = "Back to Menu";
    btn.id = "backButton";
    btn.classList.add("btn-primary", "btn-lg", "fixed-top", "btn-light", "px-5", "py-2");
    btn.style.top = "70%";
    btn.style.left = "43%";
    btn.onclick = function () {
        location.href = "/";
    };
    document.body.appendChild(btn);
}

///game.destroy(true, false); to exit script
