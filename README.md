# Chaos-Pong---Hack-The-North-2021

##Chaos Pong - Hack the North 2021##
Introducing Chaos Pong! The very chaotic variant of the first game ever to be launched worldwide! 
To start the game, head over to our amazingly named domain, chaospong.tech! 
The game is a local 2 player game, the paddles are controlled using W, S or the up and down arrow keys. 
The goal is to get the ball past your opponents paddle and not let it go past your own. 
The twist on this game is that every 5 seconds, a new ball spawns in. This ball is a random size and speed! 
The game ends when there are no balls remaining, at which point the winner is announced. 

Now, a little about how we created the game. We used a Javascript game library called Phaser.js to create the game itself, 
with Node JS and Express JS as the backend and implemented Bootstrap 4 for styling. The backend is hosted via Nginx 
server in an N2D compute instance on Google Cloud. We had planned to create a full online multiplayer version of the 
game using websockets, where we planned to be able to create game rooms and connect multiple people on to different matches all at once. 
Though we made a lot of progress, in the end we were unable to finish. What’s next for ChaosPong? 
We plan to continue working on the game, working to add a full multiplayer mode, as well as add more customizability to the game. 
