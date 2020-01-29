const express = require('express');
const app = express();
const server = app.listen(4000);

const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;

const Channel = process.env.THATONE_CHANNEL;

app.use(express.static('public'));

const socket = require('socket.io');
const io = socket(server);

let playerList = [];

io.sockets.on('connection', newConnection);

function ArrayRemove(arr, value) {
	return arr.filter(function(ele) {
		return ele != value;
	});
	//Array = ArrayRemove(Array, "food");
}

function newConnection(socket) {
	socket.on('disconnecting', newDisconnect);

	let data2 = {
		id: socket.id,
	}

	function newDisconnect() {
		console.log(`${data2.id} has disconnected`);
		socket.broadcast.emit('playerDisconnect', data2);

		//client.channels.get(Channel).send(`>>> ${socket.id} has disconnected \n**players**: ${playerList.length}`);

		playerList = ArrayRemove(playerList, socket.id);
		console.log(`list: ${playerList}`);
	}

	console.log("new connection: " + socket.id);
	playerList.push(socket.id);
	//console.log(`list: ${playerList}`);

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

	function Attack(data) {
		socket.broadcast.emit('attack', data);
	}

	socket.on('bulletHit', healthLower);

	function healthLower(data) {
		socket.broadcast.emit('bulletHit', data);
	}
}

console.clear();

console.log("server is online");



client.on('ready', () => {
	console.log(`${client.user.username} is online`);

	client.channels.get(Channel).send(`${client.user.username} is online`);
});

client.on('message', msg => {
	if (msg.author.id == process.env.THATONE_ID) {
		if (msg.content.includes('HY.')) {

			let message = msg.toString().split('.');

			if (message[1] == 'player') {
				//console.log(message);
				if (message[2] == 'list') {
					msg.channel.send(`>>> ${playerList.toString()}`);

				} else if (message[2] == 'num') {
					msg.channel.send(`>>> ${playerList.length}`);

				}
			}
		}
	}
});

//client.login(token);