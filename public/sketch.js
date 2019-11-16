let socket;

let weapons = {
	lunarshot: {
		Hytex: {
			dmg: 27,
			energy: 25,
			max_charge: 60,
			range: 4.5,
			type: 'charger',
		},
		Lunarian: {
			dmg: 25,
			energy: 20,
			max_charge: 70,
			range: 5,
			type: 'charger',
		},
		Hurricane: {
			dmg: 22,
			energy: 20,
			max_charge: 70,
			range: 6,
			type: 'charger',
		}
	},
	atlas: {
		Hytex: {
			dmg: 20,
			energy: 15,
			max_charge: 85,
			range: 3.5,
			type: 'charger',
		},
		Hurricane: {
			dmg: 17,
			energy: 20,
			max_charge: 95,
			range: 5,
			type: 'charger',
		},
		Lunthorium: {
			dmg: 17,
			energy: 20,
			max_charge: 85,
			range: 6.5,
			type: 'charger',
		},
	},
	exo: {
		Hytex: {
			dmg: 30,
			energy: 35,
			max_charge: 65,
			range: 6,
			type: 'charger',
		},
		Linthorium: {
			dmg: 37,
			energy: 35,
			max_charge: 60,
			range: 7,
			type: 'charger',
		},
	},
}

var player = {
	type: 'player',
	pos: { x: 7, y: 7 },
	color: 'blue',
	direction: 'UP', //UP, DOWN, RIGHT, or LEFT
	PM: 'P',
	xy: 'x',
	HP: 300,
	weapon: weapons.exo.Linthorium,
	energy: 5000,
}

// all levels go in here
let levels = {
	test: {
		name: 'test', 
		UNIT: 32,
		HEIGHT: 16,
		WIDTH: 16,
		BOXH: 2,
		BOXW: 2,
		walls: [
			{
				name: "Chris's office",
				type: 'door',
				pos: {
					x: 7,
					y: 1,
				},
				color: 'green',
			},
		],
		back: 220,
	},
	prologue: {
		hall: {
			name: 'hall', 
			UNIT: 32,
			HEIGHT: 16,
			WIDTH: 10,
			walls: [],
			back: 300,
		},
	},
	chapter1: {
		tutorial: {
			lv1: {
				UNIT: 32,
				HEIGHT: 16,
				WIDTH: 16,
				walls: [
					{
						name: 'NPC0-BR',
						id: 'NPC0',
						type: 'NPC',
						pos: { x: 7, y: 5 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'NPC0-BL',
						id: 'NPC0',
						type: 'NPC',
						pos: { x: 6, y: 5 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'NPC0-TR',
						id: 'NPC0',
						type: 'NPC',
						pos: { x: 7, y: 4 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'NPC0-TL',
						id: 'NPC0',
						type: 'NPC',
						pos: { x: 6, y: 4 },
						color: 'red',
						HP: 300,
					},
				],
				back: 230,
			},
		},
	},
}

function Random(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function ArrayRemove(arr, value) {
	return arr.filter(function(ele) {
		return ele != value;
	});
	//Array = ArrayRemove(Array, "food");
}

let screenWidth = 480;
let screenHeight = 480;

let menu = false; //default: 'main'
let devTools = false
let currentStage = levels.test;
let entities;

UNIT = currentStage.UNIT;
let WIDTH = currentStage.WIDTH;
let HEIGHT = currentStage.HEIGHT;
const BOXW = 2;
const BOXH = 2;
let X = player.pos.x;
let Y = player.pos.y;

let stageChanged = true;

const online = true; //default: true
var playerList = [];
var chat = [];
var WASD = true;
var arrowKeys = false;
var keys = [];

let messages = {
	test: {
		message: "this is a test",
	},
	chapter1: {
		tutorial: {
			msg1: {
				author: 'Chris',
				message: "Really Adom? This is the best you could find?",
			},
			msg2: {
				author: 'Adom',
				message: "",
			},
		},
	},
}
let textBox = undefined;

//var chatX = 10;
//var chatY = 10;

let buttons = {
	text_test: {
		x: 100,
		y: 10,
		width: 75,
		height: 75,
		text_size: 20,
	},
	devTools: {
		x: 10,
		y: 10,
		width: 75,
		height: 75,
		text_size: 18,
	},
	moveInput: {
		x: 190,
		y: 10,
		width: 75,
		height: 75,
		text_size: 15,
	},
	play: {
		x: 176,
		y: 110,
		width: 124,
		height: 50,
		text_size: 30,
	},
	quest: {
		x: 445,
		y: 35,
		width: 60,
		height: 60,
	},
};

let doors = [
	chris_office = {
		x: 7,
		y: 2,
		room: levels.test,
		target: levels.prologue.hall,
	},
];

let charge = 0;


var thing = {
	pos: { x: player.pos.x - 7, y: player.pos.y - 7 },
}


function Teleport() {
	doors.forEach(function(ele) {
		if (currentStage == ele.room) {
			if(player.pos.x == ele.x){
				if(player.pos.y == ele.y){
					currentStage = ele.target;
					stageChanged = true;
				}
			}
		}
	});
}


function setup() {
	//createCanvas(15 * UNIT, 15 * UNIT);
	noCursor();

	entities = currentStage.walls;
	/*
		//south boundaries
		for (let i = 0; i < currentStage.WIDTH + 1; i++) {
			entities.push({
				type: 'wall',
				pos: { x: i, y: HEIGHT },
				color: 'grey',
			});
		}
		//east boundaries
		for (let i = 0; i < currentStage.HEIGHT; i++) {
			entities.push({
				type: 'wall',
				pos: { x: WIDTH, y: i },
				color: 'grey',
			});
		}
		//north boundaries
		for (let i = 0; i < currentStage.WIDTH; i++) {
			entities.push({
				type: 'wall',
				pos: { x: i, y: 0 },
				color: 'grey',
			});
		}
		//west boundaries
		for (let i = 0; i < currentStage.HEIGHT; i++) {
			entities.push({
				type: 'wall',
				pos: { x: 0, y: i },
				color: 'grey',
			});
		}*/

	socket = io();

	//if online mode is on, then check for server events
	if (online == true) {
		socket.on('newPlayer', newPlayer);
		socket.on('move', newMove);
		socket.on('playerDisconnect', playerDisconnect);
		socket.on('attack', newAttack);
		socket.on('bulletHit', lowerHealth);
	}
}

//creates a new character for each new player
function newPlayer(data1) {

	var TLC = thing;

	if (online == true) {
		let RC = Random(255);
		let player0 = {
			type: 'player',
			pos: {
				x: TLC.pos.x + data1.x,
				y: TLC.pos.y + data1.y,
			},
			id: data1.id,
			color: 'red',
			direction: 'UP',
			HP: 300,
		}
		let player0BR = {
			name: 'BR',
			type: 'player',
			pos: {
				x: TLC.pos.x + data1.x,
				y: TLC.pos.y + data1.y,
			},
			id: data1.id,
			color: 'red',
		}
		let player0BL = {
			name: 'BL',
			type: 'player',
			pos: {
				x: TLC.pos.x + data1.x - 1,
				y: TLC.pos.y + data1.y,
			},
			id: data1.id,
			color: 'red',
		}
		let player0TR = {
			name: 'TR',
			type: 'player',
			pos: {
				x: TLC.pos.x + data1.x,
				y: TLC.pos.y + data1.y - 1,
			},
			id: data1.id,
			color: 'red',
		}
		let player0TL = {
			name: 'TL',
			type: 'player',
			pos: {
				x: TLC.pos.x + data1.x - 1,
				y: TLC.pos.y + data1.y - 1,
			},
			id: data1.id,
			color: 'red',
		}
		playerList.push(player0);
		entities.push(player0BR);
		entities.push(player0BL);
		entities.push(player0TR);
		entities.push(player0TL);
	}
}

//handles other player's movement data
function newMove(data) {
	let found = false;

	var TLC = thing;

	function moveP(element, data) {
		if (data.xy == 'x') {
			if (data.PM == 'P') {
				element.pos.x++;
			} else if (data.PM == 'M') {
				element.pos.x--;
			}
		} else if (data.xy == 'y') {
			if (data.PM == 'P') {
				element.pos.y++;
			} else if (data.PM == 'M') {
				element.pos.y--;
			}
		} else if (data.xy == undefined) {
			element.pos.x = element.pos.x;
			element.pos.y = element.pos.y;
		}
		//console.log(element);
	}

	//checks playerList for the id of incoming player data
	playerList.forEach(function(ele) {
		if (ele.id == data.id) {
			entities.forEach(function(element) {
				if (element.id == data.id) {
					moveP(element, data);
				}
			});
			found = true;
			moveP(ele, data);
			ele.direction = data.direction;
		}
		if (ele.id == undefined) {
			playerList = ArrayRemove(playerList, ele);
		}
	});

	//if no player with the id is found then it creates one
	if (found == false) {
		//console.log(`socket ${data.id} not found`);
		//console.log(`adding ${data.id} to player list`);
		let player1 = {
			type: 'player',
			pos: {
				x: TLC.pos.x + data.x,
				y: TLC.pos.y + data.y,
			},
			id: data.id,
			color: 'red',
			HP: 300,
		}
		let player1BR = {
			name: 'BR',
			type: 'player',
			pos: {
				x: TLC.pos.x + data.x,
				y: TLC.pos.y + data.y,
			},
			id: data.id,
			color: 'red',
		}
		let player1BL = {
			name: 'BL',
			type: 'player',
			pos: {
				x: TLC.pos.x + data.x - 1,
				y: TLC.pos.y + data.y,
			},
			id: data.id,
			color: 'red',
		}
		let player1TR = {
			name: 'TR',
			type: 'player',
			pos: {
				x: TLC.pos.x + data.x,
				y: TLC.pos.y + data.y - 1,
			},
			id: data.id,
			color: 'red',
		}
		let player1TL = {
			name: 'TL',
			type: 'player',
			pos: {
				x: TLC.pos.x + data.x - 1,
				y: TLC.pos.y + data.y - 1,
			},
			id: data.id,
			color: 'red',
		}
		playerList.push(player1);
		entities.push(player1BR);
		entities.push(player1BL);
		entities.push(player1TR);
		entities.push(player1TL);
		//console.log(playerList);
	}
}

//sends out this player's movement data
function playerMoved(xy, PM) {
	let data = {
		PM: PM,
		xy: xy,
		id: socket.id,
		direction: player.direction,
		x: player.pos.x,
		y: player.pos.y,
	}

	socket.emit('move', data);
}

//handles player disconnections
function playerDisconnect(data2) {
	playerList.forEach(function(ele) {
		if (ele.id == data2.id) {
			//console.log(playerList);
			//console.log(data2.id);
			playerList = ArrayRemove(playerList, ele);
			//console.log(playerList);
		}
	});
	entities.forEach(function(ele) {
		if (ele.id == data2.id) {
			entities = ArrayRemove(entities, ele);
		}
	});
	//console.log(entities);
	//console.log(playerList);
}

//handles new attacks from other players
function newAttack(data) {
	var TLC = thing;

	let x;
	let y;

	entities.forEach(function(ele) {
		if (ele.id == data.id) {
			x = TLC.pos.x + ele.pos.x;
			y = TLC.pos.y + ele.pos.y;
		}
	});

	switch (data.direction) {
		case 'UP':
			y -= 2;
			break;
		case 'DOWN':
			x -= 1;
			y += 1;
			break;
		case 'RIGHT':
			x += 1;
			break;
		case 'LEFT':
			x -= 2;
			y -= 1;
	}

	let Data = {
		dmg: data.dmg,
		id: data.id,
		direction: data.direction,
		pos: {
			x: x,
			y: y,
		},
		type: data.type,
	}
	entities.push(Data);
}

//lowers player's HP if attack matches id
function lowerHealth(data) {
	if (data.id == socket.id) {
		player.HP -= data.dmg;
		if (player.HP <= 0) {
			menu = 'dead';
			socket.disconnect();
		}
	}
}


function draw() {
	clear();
	createCanvas(screenWidth, screenHeight);
	background(currentStage.back);
	if (stageChanged == true) {
		entities = currentStage.walls;

		//bottom boundaries
		for (let i = 0; i <= currentStage.WIDTH; i++) {
			entities.push({
				type: 'wall',
				pos: { x: i, y: currentStage.HEIGHT },
				color: 'grey',
			});
		}
		//right boundaries
		for (let i = 0; i <= currentStage.HEIGHT; i++) {
			entities.push({
				type: 'wall',
				pos: { x: currentStage.WIDTH, y: i },
				color: 'grey',
			});
		}
		//top boundaries
		for (let i = 0; i <= currentStage.WIDTH; i++) {
			entities.push({
				type: 'wall',
				pos: { x: i, y: 0 },
				color: 'grey',
			});
		}
		//left boundaries
		for (let i = 0; i <= currentStage.HEIGHT; i++) {
			entities.push({
				type: 'wall',
				pos: { x: 0, y: i },
				color: 'grey',
			});
		}

		stageChanged = false;
	}

	var TLC = thing;

	//quest menu
	if (menu == 'quest') {
		background(100);
	}

	//shows death screen
	if (menu == 'dead') {
		background(0);
		fill(250);
		textSize(60);
		text('You dead', 110, 200);
	}

	//draws the main menu
	if (menu == 'main') {
		background('#700CE8');
		fill('#FF2200');
		rect(15 * UNIT / 3, 0, 15 * UNIT / 3, 500);
		fill(75);
		rect(0, 100, 15 * UNIT, 75);
		rect(0, 225, 15 * UNIT, 75);
		rect(0, 350, 15 * UNIT, 75);

		//title
		fill(250);
		textSize(50);
		stroke(0);
		strokeWeight(4);
		text("Hythendar", 120, 60);
		strokeWeight(1);

		//play button
		fill('#EBB400');
		rect(buttons.play.x, buttons.play.y, buttons.play.width, buttons.play.height);
		fill(0);
		textSize(buttons.play.text_size);
		strokeWeight(0);
		text('Play', buttons.play.x + buttons.play.width - 90, buttons.play.y + buttons.play.height - 15);
		strokeWeight(1);
	}

	//pause menu
	if (menu == 'pause') {
		background('#55DEFF');

		//devTools buttons
		if (devTools == true) {
			fill('green');
		} else {
			fill('red');
		}
		rect(buttons.devTools.x, buttons.devTools.y, buttons.devTools.width, buttons.devTools.height);
		fill(0);
		textSize(buttons.devTools.text_size);
		strokeWeight(0);
		text("devTools", buttons.devTools.x + buttons.devTools.width - 72, buttons.devTools.y + buttons.devTools.height - 50);
		text("are:", buttons.devTools.x + buttons.devTools.width - 50, buttons.devTools.y + buttons.devTools.height - 30);
		if (devTools == true) {
			text('on', buttons.devTools.x + buttons.devTools.width / 3, buttons.devTools.y + buttons.devTools.height - 10);
		} else {
			text('off', buttons.devTools.x + buttons.devTools.width / 3, buttons.devTools.y + buttons.devTools.height - 10);
		}

		//test text button
		if (textBox != messages.text) {
			fill('green');
		} else {
			fill('red');
		}
		strokeWeight(1);
		rect(buttons.text_test.x, buttons.text_test.y, buttons.text_test.width, buttons.text_test.height);
		fill(0);
		textSize(buttons.text_test.text_size);
		strokeWeight(0);
		text('test', buttons.text_test.x + buttons.text_test.width - 55, buttons.text_test.y + buttons.text_test.height / 3);
		text('text is:', buttons.text_test.x + buttons.text_test.width - 60, buttons.text_test.y + buttons.text_test.height - 30);
		if (textBox != messages.text) {
			text('on', buttons.text_test.x + buttons.text_test.width / 3, buttons.text_test.y + buttons.text_test.height - 10);
		} else {
			text('off', buttons.text_test.x + buttons.text_test.width / 3, buttons.text_test.y + buttons.text_test.height - 10);
		}

		//movement button
		if (arrowKeys == true) {
			fill('red');
		} else {
			fill('green');
		}
		strokeWeight(1);
		rect(buttons.moveInput.x, buttons.moveInput.y, buttons.moveInput.width, buttons.moveInput.height);
		fill(0);
		textSize(buttons.moveInput.text_size);
		strokeWeight(0);
		text('move input', buttons.moveInput.x + buttons.moveInput.width - 74, buttons.moveInput.y + buttons.moveInput.height / 3);
		text('is set to:', buttons.moveInput.x + buttons.moveInput.width - 65, buttons.moveInput.y + buttons.moveInput.height - 30);
		if (arrowKeys == true) {
			text('arrowKeys', buttons.moveInput.x + buttons.moveInput.width - 72, buttons.moveInput.y + buttons.moveInput.height - 10);
		} else if (WASD == true) {
			text('WASD', buttons.moveInput.x + buttons.moveInput.width - 60, buttons.moveInput.y + buttons.moveInput.height - 10);
		}
	}
	strokeWeight(1);

	//draws walls and other entities
	if (menu == false) {
		entities.forEach(function(ele) {
			if (ele.id != undefined && ele.type == 'player') {
				if (ele.pos.x != undefined && ele.pos.x != null && ele.pos.x != 'NaN') {
					if (ele.pos.y != undefined && ele.pos.y != null && ele.pos.y != 'NaN') {
						var offsetX = TLC.pos.x - ele.pos.x;
						var offsetY = TLC.pos.y - ele.pos.y;

						fill(0);
						textSize(20);
						//text(`${offsetX}, ${offsetY}`, 10, 30);

						if (ele.color == undefined) {
							ele.color = 'red';
						}

						fill(ele.color);
						rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);
					} else {
						console.log(`ERROR: y ${ele.pos.y} is not a valid position`);
						console.log(ele);
					}
				} else {
					console.log(`ERROR: x ${ele.pos.x} is not a valid position`);
				}
			} else if (ele.type == 'wall') {
				var offsetX = TLC.pos.x - ele.pos.x;
				var offsetY = TLC.pos.y - ele.pos.y;

				fill(ele.color);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);

			} else if (ele.type == 'bullet') {
				let offsetX = TLC.pos.x - ele.pos.x;
				let offsetY = TLC.pos.y - ele.pos.y;

				fill(0);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);

			} else if (ele.type == 'NPC') {
				var offsetX = TLC.pos.x - ele.pos.x;
				var offsetY = TLC.pos.y - ele.pos.y;

				fill(ele.color);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);

			} else if (ele.type == 'door') {
				var offsetX = TLC.pos.x - ele.pos.x;
				var offsetY = TLC.pos.y - ele.pos.y;

				fill(ele.color);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT * 2, UNIT * 2);

			} else {
				console.log(`deleted ${ele}`);
				entities = ArrayRemove(entities, ele);
			}
		});
	}

	//other player creator
	if (online != false && menu == false) {
		playerList.forEach(function(ele) {
			fill('red');
			rect(ele.pos.x * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
			rect((ele.pos.x - 1) * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
			rect((ele.pos.x - 1) * UNIT, (ele.pos.y - 1) * UNIT, UNIT, UNIT);
			rect(ele.pos.x * UNIT, (ele.pos.y - 1) * UNIT, UNIT, UNIT);

			//how the player looks
			rect((ele.pos.x - 1) * UNIT, (ele.pos.y - 1) * UNIT, UNIT * 2, UNIT * 2);
			playerTurn(ele.pos.x, ele.pos.y, ele);
		});
	}

	//player creator
	if (player != undefined && menu == false) {
		fill(player.color);
		rect(X * UNIT, Y * UNIT, UNIT, UNIT);
		rect((X - 1) * UNIT, Y * UNIT, UNIT, UNIT);
		rect((X - 1) * UNIT, (Y - 1) * UNIT, UNIT, UNIT);
		rect(X * UNIT, (Y - 1) * UNIT, UNIT, UNIT);

		//how the player looks
		rect((X - 1) * UNIT, (Y - 1) * UNIT, UNIT * 2, UNIT * 2);
		playerTurn(X, Y, player);
	}

	//creates a text box for all text
	if (textBox != undefined) {
		fill('#FFFF70');
		rect(0, 12 * UNIT, 15 * UNIT, 100);
		fill(0);
		textSize(20);
		strokeWeight(0);
		text(textBox.message, 10, 13 * UNIT);
		strokeWeight(1);
	}

	//battle interface
	if (menu == false) {
		//weapon charger
		fill('blue');
		rect(0, 50, UNIT, 15 * UNIT - player.weapon.max_charge * 5);
		fill('yellow');
		rect(0, 50, UNIT, 15 * UNIT - player.weapon.max_charge * 5 - charge);

		//health bar
		fill(0);
		textSize(30);
		//text(player.HP, 300, 25);
		fill(250);
		rect(0, 0, 300, 50);
		fill('red');
		rect(0, 0, player.HP, 50);

		fill(200);
		circle(buttons.quest.x, buttons.quest.y, buttons.quest.width);
		fill(0);
		circle(buttons.quest.x, buttons.quest.y + 20, buttons.quest.width - 50);
		triangle(buttons.quest.x + 10, buttons.quest.y - 15, buttons.quest.x - 10, buttons.quest.y - 15, buttons.quest.x + 0, buttons.quest.y + 10);
	}

	//draws mouse crosshairs
	if (menu != undefined) {
		if (menu == 'dead') {
			fill(300);
		} else {
			fill(0);
		}
		rect(mouseX - 1, mouseY - UNIT / 2, 2, UNIT);//vertical
		rect(mouseX - UNIT / 2, mouseY - 1, UNIT, 2);//horizontal
	}

	//shows grid for development
	if (devTools == true && menu == false) {
		for (y = 0; y < screenHeight; y++) {
			line(0, UNIT * y, screenWidth * UNIT, UNIT * y);
		}
		for (x = 0; x < screenWidth; x++) {
			line(UNIT * x, 0, UNIT * x, screenHeight * UNIT);
		}
		line(0, 0, 15 * UNIT, 15 * UNIT);
		line(15 * UNIT, 0, 0, 15 * UNIT);

		fill(0);
		textSize(20);
		text(`${charge / 5}, ${player.energy}`, 20, 20);
	}

	//weapon charger
	if (mouseIsPressed == true && menu == false && player.weapon.type == 'charger') {
		if (charge < 15 * UNIT - player.weapon.max_charge * 5) {
			charge += 10;
		}
	}

	mouseTurn();
	Teleport();

	//checks for if a player is turning and then changes it's graphics
	function playerTurn(x, y, object) {
		if (object.direction == 'UP') {
			fill(0);
			rect((x * UNIT) - 20, (y * UNIT) - 20, 10, 10);
			rect((x * UNIT) + 10, (y * UNIT) - 20, 10, 10);
		} else if (object.direction == 'DOWN') {
			fill(0);
			rect((x * UNIT) - 20, (y * UNIT) + 10, 10, 10);
			rect((x * UNIT) + 10, (y * UNIT) + 10, 10, 10);
		} else if (object.direction == 'RIGHT') {
			fill(0);
			rect((x * UNIT) + 10, (y * UNIT) + 10, 10, 10);
			rect((x * UNIT) + 10, (y * UNIT) - 20, 10, 10);
		} else if (object.direction == 'LEFT') {
			fill(0);
			rect((x * UNIT) - 20, (y * UNIT) + 10, 10, 10);
			rect((x * UNIT) - 20, (y * UNIT) - 20, 10, 10);
		}
	}

	//turns the player's direction with movement of the mouse
	function mouseTurn() {
		let z = UNIT * 15 - mouseX;
		let w = UNIT * 15 - mouseY;
		//let y;
		//let x;
		if (mouseY > z) {
			if (mouseY <= mouseX && mouseX > (UNIT * 15) / 2) {
				player.direction = 'RIGHT';
			}
		}
		if (mouseY < z) {
			if (mouseY >= mouseX && mouseX < (UNIT * 15) / 2) {
				player.direction = 'LEFT';
			}
		}
		if (mouseX < w) {
			if (mouseX >= mouseY && mouseY < (UNIT * 15) / 2) {
				player.direction = 'UP';
			}
		}
		if (mouseX > w) {
			if (mouseX <= mouseY && mouseY > (UNIT * 15) / 2) {
				player.direction = 'DOWN';
			}
		}
	}

	//checks for collisions with objects in  the entities array
	function Colide(dir) {
		for (let i of entities) {
			if (i.type == 'wall' || i.type == 'player' || i.type == 'NPC') {
				if (dir == "RIGHT" && X + 1 == i.pos.x && Y >= i.pos.y && Y - BOXH < i.pos.y) return true;
				if (dir == "DOWN" && Y + 1 == i.pos.y && X >= i.pos.x && X - BOXW < i.pos.x) return true;
				if (dir == "UP" && Y - BOXH == i.pos.y && X >= i.pos.x && X - BOXW < i.pos.x) return true;
				if (dir == "LEFT" && X - BOXW == i.pos.x && Y >= i.pos.y && Y - BOXH < i.pos.y) return true;
			}
		}
		return false
	}

	//controls the projectiles
	function bulletsMove() {
		entities.forEach(function(ele) {
			if (ele.type == 'bullet') {
				switch (ele.direction) {
					case 'UP':
						ele.pos.y--;
						entities.forEach(function(elem) {
							if (ele.pos.y == elem.pos.y && ele.pos.x == elem.pos.x) {
								if (elem.type == 'player') {
									playerList.forEach(function(element) {
										if (element.id == elem.id) {
											element.HP -= ele.dmg;
											console.log(`hit ${element.id}, ${element.HP}`);
											let data = {
												id: element.id,
												dmg: ele.dmg,
											}
											socket.emit('bulletHit', data);
										}
									});
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'wall') {
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'NPC') {
									elem.HP -= ele.dmg;
									if (elem.HP <= 0) {
										entities.forEach(function(eleme) {
											if (eleme.id == elem.id) {
												entities = ArrayRemove(entities, eleme);
											}
										});
									}
									console.log(`hit dummy ${elem.HP}`);
									entities = ArrayRemove(entities, ele);
								}
							}
						});
						break;
					case 'DOWN':
						ele.pos.y++;
						entities.forEach(function(elem) {
							if (ele.pos.y == elem.pos.y && ele.pos.x == elem.pos.x) {
								if (elem.type == 'player') {
									playerList.forEach(function(element) {
										if (element.id == elem.id) {
											element.HP -= ele.dmg;
											console.log(`hit ${element.id}, ${element.HP}`);
											let data = {
												id: element.id,
												dmg: ele.dmg,
											}
											socket.emit('bulletHit', data);
										}
									});
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'wall') {
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'NPC') {
									elem.HP -= ele.dmg;
									if (elem.HP <= 0) {
										entities.forEach(function(eleme) {
											if (eleme.id == elem.id) {
												entities = ArrayRemove(entities, eleme);
											}
										});
									}
									console.log(`hit dummy ${elem.HP}`);
									entities = ArrayRemove(entities, ele);
								}
							}
						});
						break;
					case 'RIGHT':
						ele.pos.x++;
						entities.forEach(function(elem) {
							if (ele.pos.x == elem.pos.x && ele.pos.y == elem.pos.y) {
								if (elem.type == 'player') {
									playerList.forEach(function(element) {
										if (element.id == elem.id) {
											element.HP -= ele.dmg;
											console.log(`hit ${element.id}, ${element.HP}`);
											let data = {
												id: element.id,
												dmg: ele.dmg,
											}
											socket.emit('bulletHit', data);
										}
									});
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'wall') {
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'NPC') {
									elem.HP -= ele.dmg;
									if (elem.HP <= 0) {
										entities.forEach(function(eleme) {
											if (eleme.id == elem.id) {
												entities = ArrayRemove(entities, eleme);
											}
										});
									}
									console.log(`hit dummy ${elem.HP}`);
									entities = ArrayRemove(entities, ele);
								}
							}
						});
						break;
					case 'LEFT':
						ele.pos.x--;
						entities.forEach(function(elem) {
							if (ele.pos.x == elem.pos.x && ele.pos.y == elem.pos.y) {
								if (elem.type == 'player') {
									playerList.forEach(function(element) {
										if (element.id == elem.id) {
											element.HP -= ele.dmg;
											console.log(`hit ${element.id}, ${element.HP}`);
											let data = {
												id: element.id,
												dmg: ele.dmg,
											}
											socket.emit('bulletHit', data);
										}
									});
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'wall') {
									entities = ArrayRemove(entities, ele);
								} else if (elem.type == 'NPC') {
									elem.HP -= ele.dmg;
									if (elem.HP <= 0) {
										entities.forEach(function(eleme) {
											if (eleme.id == elem.id) {
												entities = ArrayRemove(entities, eleme);
											}
										});
									}
									console.log(`hit dummy ${elem.HP}`);
									entities = ArrayRemove(entities, ele);
								}
							}
						});
						break;
				}
			}
		});
	}

	//moves entities when the player moves
	function entitiesMove(pos, PM) {
		entities.forEach(function(ele) {
			if (pos == 'x') {
				if (PM == 'P') {
					ele.pos.x -= 1;
				} else if (PM == 'M') {
					ele.pos.x += 1;
				}
			} else if (pos == 'y') {
				if (PM == 'P') {
					ele.pos.y -= 1;
				} else if (PM == 'M') {
					ele.pos.y += 1;
				}
			}
		});
		playerList.forEach(function(ele) {
			if (pos == 'x') {
				if (PM == 'P') {
					ele.pos.x -= 1;
				} else if (PM == 'M') {
					ele.pos.x += 1;
				}
			} else if (pos == 'y') {
				if (PM == 'P') {
					ele.pos.y -= 1;
				} else if (PM == 'M') {
					ele.pos.y += 1;
				}
			}
		});
	}

	//player movement
	if (menu == false) {
		if (arrowKeys == true) {
			if (keyIsDown(LEFT_ARROW)) {
				let l = Colide('LEFT');
				if (X != (BOXW - 1) && !l) {
					entitiesMove('x', 'M');
					player.pos.x--;
					playerMoved('x', 'M');
					TLC.pos.x++;
				}
			}
			if (keyIsDown(RIGHT_ARROW)) {
				let r = Colide('RIGHT');
				if (X != WIDTH - 1 && r != true) {
					entitiesMove('x', 'P');
					player.pos.x++;
					playerMoved('x', 'P');
					TLC.pos.x--;
				}
			}
			if (keyIsDown(UP_ARROW)) {
				let u = Colide('UP');
				if (Y != (BOXH - 1) && u != true) {
					entitiesMove('y', 'M');
					player.pos.y--;
					playerMoved('y', 'M');
					TLC.pos.y++;
				}
			}
			if (keyIsDown(DOWN_ARROW)) {
				let d = Colide('DOWN');
				if (Y != HEIGHT - 1 && d != true) {
					entitiesMove('y', 'P');
					player.pos.y++;
					playerMoved('y', 'P');
					TLC.pos.y--;
				}
			}
		}

		if (WASD == true) {
			if (keys['d'] == true) {
				let r = Colide('RIGHT');
				if (X != WIDTH - 1 && !r) {
					entitiesMove('x', 'P');
					player.pos.x++;
					playerMoved('x', 'P');
					TLC.pos.x--;
				}
			}
			if (keys['a'] == true) {
				let l = Colide('LEFT');
				if (X != (BOXW - 1) && !l) {
					entitiesMove('x', 'M');
					player.pos.x--;
					playerMoved('x', 'M');
					TLC.pos.x++;
				}
			}
			if (keys['s'] == true) {
				let d = Colide('DOWN');
				if (Y != HEIGHT - 1 && !d) {
					entitiesMove('y', 'P');
					player.pos.y++;
					playerMoved('y', 'P');
					TLC.pos.y--;
				}
			}
			if (keys['w'] == true) {
				let u = Colide('UP');
				if (Y != (BOXH - 1) && !u) {
					entitiesMove('y', 'M');
					player.pos.y--;
					playerMoved('y', 'M');
					TLC.pos.y++;
				}
			}
		}
	}

	thing = TLC;

	bulletsMove();
	playerMoved();
}


function mousePressed() {
	//text test button
	if (mouseX > buttons.text_test.x + buttons.text_test.width - 64 && mouseX < buttons.text_test.x + buttons.text_test.width && mouseY > buttons.text_test.y - buttons.text_test.height + 64 && mouseY < buttons.text_test.y + buttons.text_test.height && menu == 'pause') {
		if (textBox == undefined) {
			textBox = messages.test;
		} else if (textBox == messages.test) {
			textBox = undefined;
		}
	}

	//ability to click away text boxes
	if (mouseY >= 12 * UNIT) {
		textBox = undefined;
	}

	//devTools button
	if (mouseX > buttons.devTools.x + buttons.devTools.width - 64 && mouseX < buttons.devTools.x + buttons.devTools.width && mouseY > buttons.devTools.y - buttons.devTools.height + 64 && mouseY < buttons.devTools.y + buttons.devTools.height && menu == 'pause') {
		if (devTools == true) {
			devTools = false;
		} else if (devTools == false) {
			devTools = true;
		}
	}

	//move input button
	if (mouseX > buttons.moveInput.x + buttons.moveInput.width - 64 && mouseX < buttons.moveInput.x + buttons.moveInput.width && mouseY > buttons.moveInput.y - buttons.moveInput.height + 64 && mouseY < buttons.moveInput.y + buttons.moveInput.height && menu == 'pause') {
		if (arrowKeys == true) {
			arrowKeys = false;
			WASD = true;
		} else if (WASD == true) {
			WASD = false;
			arrowKeys = true;
		}
	}

	//quest button
	if (mouseX > buttons.quest.x + buttons.quest.width - 128 && mouseX < buttons.quest.x + buttons.quest.width && mouseY > buttons.quest.y - buttons.quest.height - 128 && mouseY < buttons.quest.y + buttons.quest.height && menu == false) {
		menu = 'quest';
	}
}

function mouseReleased() {
	let TLC = thing;

	if (menu == false) {
		let xx = TLC.pos.x + player.pos.x;
		let yy = TLC.pos.y + player.pos.y;

		let x;
		let y;
		if (player.direction == 'UP') {
			x = xx;
			y = yy - 2;
		} else if (player.direction == 'DOWN') {
			x = xx - 1;
			y = yy + 1;
		} else if (player.direction == 'RIGHT') {
			x = xx + 1;
			y = yy;
		} else if (player.direction == 'LEFT') {
			x = xx - 2;
			y = yy - 1;
		}

		let data = {
			dmg: (charge / 5) + player.weapon.dmg,
			id: socket.id,
			direction: player.direction,
			pos: {
				x: x,
				y: y,
			},
			type: 'bullet',
		}

		if (player.energy >= player.weapon.energy) {
			entities.push(data);
			socket.emit('attack', data);
			player.energy -= player.weapon.energy;
		}
		charge = 0;
	}
}

function keyReleased() {
	//pause menu
	if (key === 'p' && menu != 'main' && menu != 'quest') {
		if (menu == false) {
			menu = 'pause';
		} else {
			menu = false;
		}
	}

	//quest menu
	if (key == 'q' && menu != 'main' && menu != 'pause') {
		if (menu == false) {
			menu = 'quest';
		} else {
			menu = false;
		}
	}

	//devtools toggle
	if (key == 'z') {
		if (devTools == false) {
			devTools = true;
		} else {
			devTools = false;
		}
	}

	if (key == 'o') {
		screenHeight = 600;
		screenWidth = 750;
	}

	keys[key] = false;

	return false;
}

function keyPressed() {
	keys[key] = true;
}