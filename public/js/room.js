var socket = io();
socket.on('connect', () => {
    console.log(socket.id)
    document.getElementById("roomid").innerText = (socket.id.toString())
});

socket.on('joined-room', (args) => {
    document.getElementById("friend-id").innerText = ("Your friend with id: " + args + " has joined the room!")
});
