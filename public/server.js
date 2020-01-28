class Server {
	//creates a new character for each new player
	newPlayer(data1) {

		let TLC = thing;

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
	newMove(data) {
		let found = false;

		let TLC = thing;

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
	playerMoved(xy, PM) {
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
	playerDisconnect(data2) {
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
	newAttack(data) {
		let TLC = thing;

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
	lowerHealth(data) {
		if (data.id == socket.id) {
			player.HP -= data.dmg;
			if (player.HP <= 0) {
				menu = 'dead';
				socket.disconnect();
			}
		}
	}
}
