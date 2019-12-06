const express = require('express');
const app = express();
const server = app.listen(4000);

app.use(express.static('public'));

console.log("My socket server is running!");

const socket = require('socket.io');
const io = socket(server);

console.clear();

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	socket.on('disconnecting', newDisconnect);

	let data2 = {
		id: socket.id, 
	}

	function newDisconnect() {
		console.log(`${data2.id} has disconnected`);
		socket.broadcast.emit('playerDisconnect', data2);
	}

	console.log("new connection: " + socket.id);
	data1 = {
		id: socket.id,
		x: 7,
		y: 7,
	}
	socket.broadcast.emit('newPlayer', data1);

	socket.on('move', moveMsg);

	function moveMsg(data) {
		socket.broadcast.emit('move', data);
	}

	socket.on('attack', Attack);

	function Attack(data){
		socket.broadcast.emit('attack', data);
	}

	socket.on('bulletHit', healthLower);

	function healthLower(data){
		socket.broadcast.emit('bulletHit', data);
	}
}