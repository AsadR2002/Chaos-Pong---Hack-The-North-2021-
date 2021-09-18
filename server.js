// Require express and create an instance of it
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

// For multiplayer, use sockets
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server);

// Global variables for port usage
var PORT = process.env.PORT || 3000;

// Use public directory as source folder
var pub_dir = path.join(__dirname, 'public')
app.use('', express.static(pub_dir));

// Test socket connection
io.on('connection', (socket) => {
    console.log('a user connected: ');
    socket.on('disconnect', () => {
      console.log('user disconnected');
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

app.get('/multi', function (req, res) {
    res.sendFile(path.join(pub_dir, 'multiplayer.html'));
});

app.get('/test', function (req, res) {
    res.sendFile(path.join(pub_dir, 'test.html'));
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