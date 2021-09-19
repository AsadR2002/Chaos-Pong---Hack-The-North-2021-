// Require express and create an instance of it
const express = require('express');
const app = express();
const http = require('http');
const { SocketAddress } = require('net');
const path = require('path');

// For multiplayer, use sockets
const server = http.createServer(app);
const { Server } = require("socket.io");
const { createSecureContext } = require('tls');
const io = new Server(server);
var num_players = 0;
var players = {};
var balls = {};
var ball_id = 0;
var bar = true;
// Global variables for port usage
var PORT = process.env.PORT || 3000;

// Use public directory as source folder
var pub_dir = path.join(__dirname, 'public')
app.use('', express.static(pub_dir));

// Test socket connection
/*io.on('connection', (socket) => {
    console.log('a user connected: ');
    players[socket.id] = {
        y: 600,
        left: bar,
        playerId: socket.id
    };
    console.log(players)
    bar = !bar;
    socket.emit('currentPlayers', players);
    
    socket.broadcast.emit('newPlayer', players[socket.id]);
    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('bye', socket.id);
    });
  });*/

  io.on('connection', (socket) => {
    console.log("A user has connected.");
    
    if (num_players < 2){
        players[socket.id] = {
            player_id: socket.id,
            y: 600,
            left: bar
          };
        bar = !bar
        num_players += 1;

    } else {
      // No one can connect anymore, message saying this?
      console.log("Current lobby is full, please wait for your turn to join");
    }
    console.log(num_players)
    
    // Create a paddle here
    socket.emit('actualPlayers', players);
    socket.broadcast.emit('new_player', players[socket.id]);

    // When a player moves send the data to the other one
  socket.on('player_moved', (movement_data) => {
    player[socket.id].x = movement_data.x;
    player[socket.id].y = movement_data.y;
    socket.broadcast.emit('paddle_moved', players[socket.id]);
  });

  socket.on('new_ball', (ball_data) => {
    console.log("New ball has been generated");
    balls[ball_id] = {
      id: ball_id,
      x: 0,
      y: 0,
      cur_speed: 0
    };

    ball_id++;
    
    socket.emit('new_ball', ball_data);
    socket.broadcast.emit('new_ball', ball_data);
  });

  socket.on('ball_moved', (ball_data) => {
    balls[ball_data.id].x = ball_data.x;
    balls[ball_data.id].y = ball_data.y;
    balls[ball_data.id].speed = ball_data.speed;

    socket.broadcast.emit('ball_moved', balls[ball_data.id]);
  });

  socket.on('disconnect', () => {
    console.log("A user has disconnected");
    delete players[socket.id];
    socket.broadcast.emit('player_disconnect', socket.id);
    num_players--;
  });
  });

  // 
  io.on("connection", (socket) => {
    socket.on("join-room", (arg) => {
      socket.join(arg);
      socket.to(arg).emit("joined-room", socket.id.toString());
    });
  });

// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Test path to serve secondary page
app.get('/single', function (req, res) {
    res.sendFile(path.join(pub_dir, '/single.html'));
});

// If there are less than 2 players, allow them to connect to the lobby
// else keep them waiting
app.get('/multi', function (req, res) {
    if (num_players < 2) {
      res.sendFile(path.join(pub_dir, 'multiplayer.html'));
    } else {
        console.log("went full")
      res.sendFile(path.join(pub_dir, 'too-many-players.html'));
    }
});

app.get('/chat', function (req, res) {
    res.sendFile(path.join(pub_dir, 'test.html'));
});

app.get('/room', function (req, res) {
    res.sendFile(path.join(pub_dir, 'room-landing.html'));
});

// start the server in the port 3000 !
server.listen(PORT, () => {
    console.log('Example app listening on port', PORT);
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });