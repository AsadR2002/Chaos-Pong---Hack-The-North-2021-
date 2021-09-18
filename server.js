// Require express and create an instance of it
var express = require('express');
var app = express();
var http = require('http');
const path = require('path');

// For multiplayer, use sockets
var sockets = require('socket.io');

// Global variables for port usage
var PORT = process.env.port || 3000;

// Use public directory as source folder
var pub_dir = path.join(__dirname, 'public')
app.use('', express.static(pub_dir));

// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Test path to serve secondary page
app.get('/single', function (req, res) {
    res.sendFile(path.join(pub_dir, '/single.html'));
});

// start the server in the port 3000 !
app.listen(PORT, () => {
    console.log('Example app listening on port', PORT);
});







