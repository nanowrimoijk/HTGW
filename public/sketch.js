let socket;

var player = {
	type: 'player',
	pos: { x: 7, y: 7 },
	color: 'blue',
	direction: 'UP', //UP, DOWN, RIGHT, or LEFT
	PM: 'P',
	xy: 'x',
};

// all levels go in here
let levels = {
	test: {
		UNIT: 32,
		HEIGHT: 21,
		WIDTH: 16,
		BOXH: 2,
		BOXW: 2,
		walls: [],
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

let devTools = true; //default: false
let menu = false;
let currentStage = levels.test;
let entities;

UNIT = currentStage.UNIT;
const WIDTH = currentStage.WIDTH;
const HEIGHT = currentStage.HEIGHT;
const BOXW = currentStage.BOXW;
const BOXH = currentStage.BOXH;
let X = player.pos.x;
let Y = player.pos.y;

const online = true; //default: true
var playerList = [];
var chat = [];
var WASD = false;
var arrowKeys = true;

var chatX = 10;
var chatY = 10;

let overBox = false;

var thing = {
	pos: { x: player.pos.x - 7, y: player.pos.y - 7 },
}

function setup() {
	createCanvas(15 * UNIT, 15 * UNIT);
	if(menu == false){
		noCursor();
	}

	levels.test.walls.push({
		type: 'wall',
		pos: { x: 5, y: 5 },
		color: 'grey',
	});

	entities = levels.test.walls;

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
	}

	//if grid is false then delete the lines inside of player(s)
	if (devTools == false) {
		noStroke();
	}

	socket = io();

	//if online mode is on, then check for other players
	if (online == true) {
		socket.on('newPlayer', newPlayer);
		socket.on('move', newMove);
		socket.on('playerDisconnect', playerDisconnect);
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
				x: data1.x,
				y: data1.y,
			},
			id: data1.id,
			color: 'red',
			direction: 'UP',
		}
		let player0BR = {
			name: 'BR',
			type: 'player',
			pos: {
				x: data1.x,
				y: data1.y,
			},
			id: data1.id,
			color: 'red',
		}
		let player0BL = {
			name: 'BL',
			type: 'player',
			pos: {
				x: data1.x - 1,
				y: data1.y,
			},
			id: data1.id,
			color: 'red',
		}
		let player0TR = {
			name: 'TR',
			type: 'player',
			pos: {
				x: data1.x,
				y: data1.y - 1,
			},
			id: data1.id,
			color: 'red',
		}
		let player0TL = {
			name: 'TL',
			type: 'player',
			pos: {
				x: data1.x - 1,
				y: data1.y - 1,
			},
			id: data1.id,
			color: 'red',
		}
		playerList.push(player0);
		entities.push(player0BR);
		entities.push(player0BL);
		entities.push(player0TR);
		entities.push(player0TL);
		//console.log(playerList);

		//chat.push(`${data1.id} has joined the game`);
	}
}

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
				x: 7,
				y: 7,
			},
			id: data.id,
			color: 'red',
		}
		let player1BR = {
			name: 'BR',
			type: 'player',
			pos: {
				x: 7,
				y: 7,
			},
			id: data.id,
			color: 'red',
		}
		let player1BL = {
			name: 'BL',
			type: 'player',
			pos: {
				x: 7 - 1,
				y: 7,
			},
			id: data.id,
			color: 'red',
		}
		let player1TR = {
			name: 'TR',
			type: 'player',
			pos: {
				x: 7,
				y: 7 - 1,
			},
			id: data.id,
			color: 'red',
		}
		let player1TL = {
			name: 'TL',
			type: 'player',
			pos: {
				x: 7 - 1,
				y: 7 - 1,
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

function playerMoved(xy, PM) {
	let data = {
		PM: PM,
		xy: xy,
		id: socket.id,
		direction: player.direction,
	}

	socket.emit('move', data);
}

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

function draw() {
	clear();

	var TLC = thing;

	//draws walls and other non-player entities
	if(menu == false){
		entities.forEach(function(ele) {
		if (ele.id != undefined && ele.type == 'player') {
			if (ele.pos.x != undefined && ele.pos.x != null && ele.pos.x != 'NaN') {
				if (ele.pos.y != undefined && ele.pos.y != null && ele.pos.y != 'NaN') {
					var offsetX = TLC.pos.x - ele.pos.x;
					var offsetY = TLC.pos.y - ele.pos.y;
					//ele.pos is going NaN and undefined

					fill(0);
					textSize(20);
					text(`${offsetX}, ${offsetY}`, 10, 30);

					if (ele.color == undefined) {
						ele.color = 'red';
					}

					fill(ele.color);
					rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);
				} else {
					//console.log(`ERROR: y ${ele.pos.y} is not a valid position`);
					//console.log(ele);
				}
			} else {
				//console.log(`ERROR: x ${ele.pos.x} is not a valid position`);
			}
		} else if (ele.type == 'wall') {
			var offsetX = TLC.pos.x - ele.pos.x;
			var offsetY = TLC.pos.y - ele.pos.y;

			fill(ele.color);
			rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);
		} else {
			entities = ArrayRemove(entities, ele);
		}
	});
	}

	//draws walls and other non-player entities
	/*entities.forEach(function(ele) {
		if (ele.id != undefined && ele.type != 'player') {
			if (ele.color == undefined) {
				ele.color = 'red';
			}
			fill(ele.color);
			rect(ele.pos.x * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
		} else if (ele.type == 'wall') {
			fill(ele.color);
			rect(ele.pos.x * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
		} else if (ele.type != 'player') {
			entities = ArrayRemove(entities, ele);
		}
	});*/

	//other player creator
	if (online != false && menu == false) {
		playerList.forEach(function(ele) {
			fill('red');
			rect(ele.pos.x * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
			rect((ele.pos.x - 1) * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
			rect((ele.pos.x - 1) * UNIT, (ele.pos.y - 1) * UNIT, UNIT, UNIT);
			rect(ele.pos.x * UNIT, (ele.pos.y - 1) * UNIT, UNIT, UNIT);

			//how the player looks
			rect((ele.pos.x - 1) * UNIT, (ele.pos.y - 1) * UNIT, UNIT, UNIT);
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

	//draws mouse crosshairs
	if (menu == false) {
		fill(0);
		rect(mouseX - 1, mouseY - UNIT / 2, 2, UNIT);//vertical
		rect(mouseX - UNIT / 2, mouseY - 1, UNIT, 2);//horizontal
	}

	//shows grid for development
	if (devTools == true && menu == false) {
		for (y = 0; y < HEIGHT; y++) {
			line(0, UNIT * y, WIDTH * UNIT, UNIT * y);
		}
		for (x = 0; x < WIDTH; x++) {
			line(UNIT * x, 0, UNIT * x, HEIGHT * UNIT);
		}
		line(0, 0, 15 * UNIT, 15 * UNIT);
		line(15 * UNIT, 0, 0, 15 * UNIT);

		fill(0);
		textSize(20);
		text(`${mouseX}, ${mouseY}`, 10, 15);
	}

	if(menu == true){
		//background('yellow');
		fill(0);
		textSize(20);
		text(`${key}`, 111, 111);
	}

	mouseTurn();

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
		let y;
		let x;
		if (mouseY > z) {
			if (y <= mouseX && mouseX > (UNIT * 15) / 2) {
				player.direction = 'RIGHT';
				console.log(y);
			}
		}
		if (mouseY < z) {
			if (y <= mouseX && mouseX < (UNIT * 15) / 2) {
				player.direction = 'LEFT';
			}
		}
		if (mouseX < w) {
			if (x <= mouseY && mouseY < (UNIT * 15) / 2) {
				player.direction = 'UP';
			}
		}
		if (mouseX > w) {
			if (x <= mouseY && mouseY > (UNIT * 15) / 2) {
				player.direction = 'DOWN';
			}
		}
	}

	//checks for collisions with objects in  the entities array
	function Colide(dir) {
		for (let i of entities) {
			if (dir == "LEFT" && X - BOXW == i.pos.x && Y >= i.pos.y && Y - BOXH < i.pos.y) return true;
			if (dir == "RIGHT" && X + 1 == i.pos.x && Y >= i.pos.y && Y - BOXH < i.pos.y) return true;
			if (dir == "UP" && Y - BOXH == i.pos.y && X >= i.pos.x && X - BOXW < i.pos.x) return true;
			if (dir == "DOWN" && Y + 1 == i.pos.y && X >= i.pos.x && X - BOXW < i.pos.x) return true;
		}
		return false
	}

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
				//player.direction = 'LEFT';
			}
			if (keyIsDown(RIGHT_ARROW)) {
				let r = Colide('RIGHT');
				if (X != WIDTH - 1 && r != true) {
					entitiesMove('x', 'P');
					player.pos.x++;
					playerMoved('x', 'P');
					TLC.pos.x--;
				}
				//	player.direction = 'RIGHT';
			}
			if (keyIsDown(UP_ARROW)) {
				let u = Colide('UP');
				if (Y != (BOXH - 1) && u != true) {
					entitiesMove('y', 'M');
					player.pos.y--;
					playerMoved('y', 'M');
					TLC.pos.y++;
				}
				//player.direction = 'UP';
			}
			if (keyIsDown(DOWN_ARROW)) {
				let d = Colide('DOWN');
				if (Y != HEIGHT - 1 && d != true) {
					entitiesMove('y', 'P');
					player.pos.y++;
					playerMoved('y', 'P');
					TLC.pos.y--;
				}
				//player.direction = 'DOWN';
			}
		}

		if (WASD == true) {
			if ((keyIsPressed == true) && (key == 'w')) {
				let u = Colide('UP');
				if (Y != (BOXH - 1) && u != true) {
					Y--;
				}
				player.direction = 'UP';
			}
			if ((keyIsPressed == true) && (key == 's')) {
				let d = Colide('DOWN');
				if (Y != HEIGHT - 1 && d != true) {
					Y++;
				}
				player.direction = 'DOWN';
			}
			if ((keyIsPressed == true) && (key == 'a')) {
				let l = Colide('LEFT');
				if (X != (BOXW - 1) && !l) {
					X--;
				}
				player.direction = 'LEFT';
			}
			if ((keyIsPressed == true) && (key == 'd')) {
				let r = Colide('RIGHT');
				if (X != WIDTH - 1 && r != true) {
					X++;
				}
				player.direction = 'RIGHT';
			}
		}
	}

	//button
	rect(bx, by, boxSize, boxSize);

	thing = TLC;

	playerMoved();
}

let bx = 100;
let by = 100;
let boxSize = 75;

function mousePressed() {
	if (mouseX > bx + boxSize - 64 && mouseX < bx + boxSize && mouseY > by - boxSize + 64 && mouseY < by + boxSize) {
		console.log('hello');
	}
}

function keyReleased(){
	if(key === 'p'){
		if(menu == false){
			menu = true;
		}else{
			menu = false;
		}
	}
	return false;
}