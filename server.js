// Require express and create an instance of it
var express = require('express');
var app = express();
var http = require('http');
const path = require('path');

// For multiplayer, use sockets
var sockets = require('socket.io');

// Global variables for reuse
var PORT = process.env.port || 3000;

// Use public directory as source folder
app.use('', express.static(path.join(__dirname, 'public')));

// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// start the server in the port 3000 !
app.listen(PORT, () => {
    console.log('Example app listening on port', PORT);
});








/* // server.js
const express = require('express');

// Define Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Serve Static Assets
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
}); */