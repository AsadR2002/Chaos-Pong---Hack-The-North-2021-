var socket = io();

function joinRoom() {
    socket.emit("join-room", document.getElementById("join-id").value.toString());
}

socket.on("joined-room", () => {
    // start game
});