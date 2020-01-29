let socket;

let online = true; //default: false
const server = new Server;
const game = new Game;

let player = {
	type: 'player',
	pos: { x: 2, y: 8 },
	color: 'blue',
	direction: 'UP', //UP, DOWN, RIGHT, or LEFT
	PM: 'P',
	xy: 'x',
	HP: Infinity,//300
	weapon: game.weapons.tiger.Hytex,
	energy: 5000,
}

// all levels go in here
let levels = {
	test2: {
		name: "test 2",
		type: '2',
		back: '230',
		Sx: -2,
		Sy: -2,
		map: [
			['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
			['w', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
			['w', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
			['w', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
			['w', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
			['w', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
			['w', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
			["w", "w", 'w', 'w', 'w', 'w', 'w', 'w'],
		],
	},
	prologue2: {
		hall: {
			name: "Hallway",
			type: '2',
			back: '230',
			Sx: 1,
			Sy: 0,
			map: [
				['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', 'A', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
			],
		},
		office: {
			name: "Chris's office",
			type: '2',
			back: '230',
			Sx: 1,
			Sy: 3,
			map: [
				['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'C', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', 'T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 't', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'w'],
				['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
			]
		}
	},
	prologue: {
		hall: {
			name: 'hall',
			HEIGHT: 16,
			WIDTH: 11,
			walls: [
				{
					name: "Chris's office",
					type: 'door',
					pos: {
						x: 5,
						y: 1,
					},
					color: 'green',
				},
				{
					name: "Adom",
					type: 'NPC',
					id: 'AdomBR',
					pos: {
						x: 5,
						y: 7,
					},
					color: 'blue',
				},
				{
					name: "Adom",
					type: 'NPC',
					id: 'AdomBL',
					pos: {
						x: 4,
						y: 7,
					},
					color: 'blue',
				},
				{
					name: "Adom",
					type: 'NPC',
					id: 'AdomTR',
					pos: {
						x: 5,
						y: 6,
					},
					color: 'blue',
				},
				{
					name: "Adom",
					type: 'NPC',
					id: 'AdomTL',
					pos: {
						x: 4,
						y: 6,
					},
					color: 'blue',
				},
			],
			back: 300,
			Sx: 2,
			Sy: 0,
		},
		office: {
			name: "Chris's office",
			HEIGHT: 16,
			WIDTH: 16,
			walls: [
				//top table side
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 5,
						y: 6,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 6,
						y: 6,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 7,
						y: 6,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 8,
						y: 6,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 9,
						y: 6,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 10,
						y: 6,
					},
					color: 'brown',
				},
				//left table side
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 5,
						y: 7,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 5,
						y: 8,
					},
					color: 'brown',
				},
				//right table side
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 10,
						y: 7,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 10,
						y: 8,
					},
					color: 'brown',
				},
				//bottom table side
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 6,
						y: 8,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 7,
						y: 8,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 8,
						y: 8,
					},
					color: 'brown',
				},
				{
					name: "table",
					type: 'wall',
					pos: {
						x: 9,
						y: 8,
					},
					color: 'brown',
				},
				//table top
				{
					name: "table",
					type: 'flat',
					pos: {
						x: 5,
						y: 6,
					},
					width: 6,
					height: 3,
					color: 'brown',
				},
				//Chris
				{
					name: "Chris",
					type: 'NPC',
					id: 'ChrisBR',
					pos: {
						x: 8,
						y: 5,
					},
					color: 'green',
				},
				{
					name: "Chris",
					type: 'NPC',
					id: 'ChrisBL',
					pos: {
						x: 7,
						y: 5,
					},
					color: 'green',
				},
				{
					name: "Chris",
					type: 'NPC',
					id: 'ChrisTR',
					pos: {
						x: 8,
						y: 4,
					},
					color: 'green',
				},
				{
					name: "Chris",
					type: 'NPC',
					id: 'ChrisTL',
					pos: {
						x: 7,
						y: 4,
					},
					color: 'green',
				},
			],
			back: 300,
			Sx: 1,
			Sy: 3,
		},
	},
	chapter1: {
		tutorial: {
			lv1: {
				name: "Tutorial level 1",
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
				Sx: 3,
				Sy: 3,
			},
			lv2: {
				name: "Tutorial level 2",
				HEIGHT: 19,
				WIDTH: 19,
				walls: [
					//enemy
					{
						name: 'enemy0-BR',
						id: 'enemy0',
						type: 'enemy',
						pos: { x: 10, y: 10 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'enemy0-BL',
						id: 'enemy0',
						type: 'enemy',
						pos: { x: 9, y: 10 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'enemy0-TR',
						id: 'enemy0',
						type: 'enemy',
						pos: { x: 10, y: 9 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'enemy0-TL',
						id: 'enemy0',
						type: 'enemy',
						pos: { x: 9, y: 9 },
						color: 'red',
						HP: 300,
					},
					//walls
					{
						type: 'wall',
						pos: { x: 12, y: 14 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 7, y: 14 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 6, y: 14 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 5, y: 14 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 5, y: 13 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 5, y: 12 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 5, y: 7 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 5, y: 6 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 5, y: 5 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 6, y: 5 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 7, y: 5 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 12, y: 5 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 13, y: 5 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 14, y: 5 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 14, y: 6 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 14, y: 7 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 14, y: 12 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 14, y: 13 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 14, y: 14 },
						color: 'grey',
						HP: 300,
					},
					{
						type: 'wall',
						pos: { x: 13, y: 14 },
						color: 'grey',
						HP: 300,
					},
				],
				enemies: [
					{
						name: 'enemy0',
						id: 'enemy0',
						type: 'enemy',
						moveAI: 'stationary',
						attackAI: 'calm',
						weapon: game.weapons.lunarshot.Lunarian,
						charge: 0,
						cooldown: 100,
						preset: undefined,
						timer: 100,
						pos: { x: 10, y: 10 },
						direction: 'DOWN',
						color: 'red',
						HP: 300,
					},
				],
				back: 230,
				Sx: 0,
				Sy: 10,
			},
		},
		FS: {
			R1: {
				name: "Faster Blaster Station Room 1",
				HEIGHT: 15,
				WIDTH: 15,
				walls: [
					{
						name: "R1 - R2",
						type: 'door',
						pos: {
							x: 13,
							y: 7,
						},
						color: 'beige',
					},
				],
				enemies: [],
				back: 230,
				Sx: 0,
				Sy: 1,
			},
			R2: {
				name: "Faster Blaster Station Room 2",
				HEIGHT: 30,
				WIDTH: 30,
				walls: [
					//doors
					{
						name: "R2 - R1",
						type: 'door',
						pos: {
							x: 1,
							y: 14,
						},
						color: 'beige',
					},
					{
						name: "R2 - R3",
						type: 'door',
						pos: {
							x: 28,
							y: 14,
						},
						color: 'beige',
					},
					{
						name: "R2 - R4",
						type: 'door',
						pos: {
							x: 15,
							y: 28,
						},
						color: 'beige',
					},
					//walls
					//	center
					{
						type: 'wall',
						pos: {
							x: 15,
							y: 15,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 16,
							y: 15,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 15,
							y: 14,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 16,
							y: 14,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 16,
							y: 13,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 15,
							y: 13,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 16,
							y: 16,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 15,
							y: 16,
						},
						color: 'grey',
					},
					//	bottom left
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 20,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 20,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 21,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 21,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 22,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 22,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 23,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 23,
						},
						color: 'grey',
					},
					//	bottom right
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 23,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 23,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 22,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 22,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 21,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 21,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 20,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 20,
						},
						color: 'grey',
					},
					//	top right
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 9,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 9,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 8,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 8,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 7,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 7,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 22,
							y: 6,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 23,
							y: 6,
						},
						color: 'grey',
					},
					//	top left
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 9,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 9,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 8,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 8,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 7,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 7,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 8,
							y: 6,
						},
						color: 'grey',
					},
					{
						type: 'wall',
						pos: {
							x: 7,
							y: 6,
						},
						color: 'grey',
					},
					//enemy
					{
						name: 'enemy1-BR',
						id: 'enemy1',
						type: 'enemy',
						pos: { x: 25, y: 15 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'enemy1-BL',
						id: 'enemy1',
						type: 'enemy',
						pos: { x: 24, y: 15 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'enemy1-TR',
						id: 'enemy1',
						type: 'enemy',
						pos: { x: 25, y: 14 },
						color: 'red',
						HP: 300,
					},
					{
						name: 'enemy1-TL',
						id: 'enemy1',
						type: 'enemy',
						pos: { x: 24, y: 14 },
						color: 'red',
						HP: 300,
					},
				],
				enemies: [
					{
						name: 'enemy1',
						id: 'enemy1',
						type: 'enemy',
						moveAI: 'basic',
						attackAI: 'calm',
						MT: 0,
						max_MT: 15,
						weapon: game.weapons.lunarshot.Lunarian,
						charge: 0,
						cooldown: 100,
						preset: undefined,
						timer: 100,
						pos: { x: 25, y: 15 },
						direction: 'DOWN',
						color: 'red',
						HP: 150,
					},
				],
				back: 230,
				Sx: -4,
				Sy: 0, // 9
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

let thing = {
	pos: { x: player.pos.x - 7, y: player.pos.y - 7 },
}

let screenWidth = 600; //default: 480
let screenHeight = 550; //default: 480

let event = "start1"; //default: 'start1'
let menu = false; //default: 'main'
let devTools = false; //default: false
let currentStage = levels.prologue2.hall; //default: levels.prologue.hall
let entities;

UNIT = 32; //default: 32
let WIDTH = 20;
let HEIGHT = 20;
const BOXW = 2;
const BOXH = 2;
let X = 7;
let Y = 7;
let moveTimer = 2;
let MT = 2;

let charge = 0;

let stageChanged = true; //default: true

let playerList = [
	Adom = {
		type: 'player',
		pos: {
			x: 4,
			y: 7,
		},
		id: 'Adom',
		color: 'blue',
		direction: 'RIGHT',
		room: levels.prologue2.hall,
		HP: 300,
	},
	Chris = {
		type: 'player',
		pos: {
			x: 7,
			y: 2,
		},
		id: 'Chris',
		color: 'green',
		direction: 'DOWN',
		room: levels.prologue2.office,
		HP: 300,
	},
	Spencer = {
		type: 'player',
		pos: {
			x: -2,
			y: -2,
		},
		id: 'Spencer',
		color: 'yellow',
		direction: 'RIGHT',
		room: undefined,
		HP: 300,
	},
	Ray = {
		type: 'player',
		pos: {
			x: -2,
			y: 0,
		},
		id: 'Ray',
		color: 'orange',
		direction: 'RIGHT',
		room: undefined,
		HP: 300,
	},
];

let chat = [];
let movement = true;
let WASD = true; //default: true
let arrowKeys = false; //default: false
let keys = [];

let messages = {
	test: {
		author: "Nanowrimoijk",
		message: "It would be cool if somebody went out of their way to \nfind this!",
	},
	prologue: {
		//hall
		msg1: {
			author: 'Adom',
			message: "Now, she may seem intimidating or rude, but I \npromise you she won't hurt you."
		},
		//office
		msg3: {
			author: 'Chris',
			message: "Adom, are you sure there isn't a better match than \nthis?",
		},
		msg4: {
			author: 'Adom',
			message: "I'm sorry Chris but no, this is the only recruit that \nmatched all requirements and recruitment is over \nnow.",
		},
		msg5: {
			author: 'Chris',
			message: "Whatever, they'll have to do. Now, are you familiar \nwith the current war? Nevermind, I'll give you a \nrefresher anyways.",
		},
		msg6: {
			author: 'Chris',
			message: "Twenty years ago two men fought for leadership of \nthe civilization, eventually breaking into two different \ngroups.",
		},
		msg7: {
			author: 'Chris',
			message: "The Lunarians: taking most of the military force. And \nthe Hythendarians: all of the rest. The Lunarians \nthan attacked trying to get full control, but failed.",
		},
		msg8: {
			author: 'Chris',
			message: "And that just about sums up to the present day, the \nLunarians attack daily and we are getting weaker by \nthe hour, and that is where you come in.",
		},
		msg9: {
			author: 'Chris',
			message: "This is my team: Spencer is in the yellow, he will be \nhelping you with data on outside missions.",
		},
		msg10: {
			author: 'Chris',
			message: "Next is Ray in the orange, He will be hooking you up \nwith some gear.",
		},
		msg11: {
			author: 'Chris',
			message: "And last is Adom you should recignize him as the \nperson who brought you here, he will be helping you \nwith training and other tasks.",
		},
		msg12: {
			author: 'Chris',
			message: "You are the newest member of the secret \nHythendarian team. Adom will now take you to the \ntraining area.",
		},
	},
	chapter1: {
		tutorial: {
			//level 1
			msg1: {
				author: 'Adom',
				message: "OK, Spencer has supplied you with a Lunarshot, so \nyou should see a yellow bar up top, that is your \ncharge meter, and the blue one is it's energy.",
			},
			msg2: {
				author: 'Adom',
				message: "Hold down the left mouse button to charge your \nweapon and release it to fire.",
			},
			msg3: {
				author: 'Adom',
				message: "The longer you charge, the more powerful your \nshots will be, but be aware all weapons have a max \ncharge that they will not go over.",
			},
			msg4: {
				author: 'Adom',
				message: "Try destroying the dummy in front of you.",
			},
			msg5: {
				author: 'Adom',
				message: "That was good, for a start. Next let's test how you do \nagainst an opponent that will fight back.",
			},
			//level 2
			msg6: {
				author: 'Adom',
				message: "OK, so here we have an enemy that will turn all \ndirections and fires when it sees you, try defeating it.",
			},
			msg7: {
				author: 'Adom',
				message: "Good job on defeating that enemy, but I just \nreceived word that one of our areas is under \nattack.",
			},
			msg8: {
				author: 'Adom',
				message: "Chris has ordered that you be sent even though you \nhaven't finished training. I believe in you!"
			},
		},
	},
}

let textBox = undefined;//default: undefined

let variables = {
	prologue: {
		text1: false,
		text2: false,
		text3: false,
		text4: false,
		text5: false,
		text6: false,
		text7: false,
		text8: false,
		text9: false,
		text10: false,
		text11: false,
		text12: false,
	},
	chapter1: {
		tutorial: {
			//level 1
			text1: false,
			text2: false,
			text3: false,
			text4: false,
			text5: false,
			//level 2
			text6: false,
			text7: false,
			text8: false,
		},
	},
	levels: {
		FBS: false,
		RS: false,
		C1: false,
		C2: false,
		C3: false,
		DS: false,
		CS: false,
		MS: false,
		BS: false,
		GS: false,
		CAS: false,
		LHQ: false,
		EC2: false,
		EC3: false,
		EMS: false,
		ELHQ: false,
	},
}

let x;
let y;

//let chatX = 10;
//let chatY = 10;

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

//runs the different ai for the enemies
function RunAI(enemy) {
	//attack AI
	if (enemy.attackAI == 'calm') {
		if (enemy.weapon.type == 'charger' && menu == false) {
			if (enemy.charge < enemy.weapon.max_charge) {
				enemy.charge += 0.5;
			}

			enemy.cooldown -= 1;
			//console.log(enemy.cooldown);

			if ((enemy.direction == 'DOWN' && (X == enemy.pos.x || X == enemy.pos.x - 1) && Y >= enemy.pos.y) || (enemy.direction == 'LEFT' && (Y == enemy.pos.y || Y == enemy.pos.y - 1) && X <= enemy.pos.x) || (enemy.direction == 'UP' && (X == enemy.pos.x || enemy.pos.x + 1) && Y <= enemy.pos.y) || (enemy.direction == 'RIGHT' && (Y == enemy.pos.y || Y == enemy.pos.y + 1) && X >= enemy.pos.x)) {
				if (menu == false && textBox == undefined && enemy.weapon != undefined && enemy.cooldown <= 0) {
					let xx = enemy.pos.x;
					let yy = enemy.pos.y;

					let x;
					let y;
					if (enemy.direction == 'UP') {
						x = xx;
						y = yy - 2;
					} else if (enemy.direction == 'DOWN') {
						x = xx - 1;
						y = yy;
					} else if (enemy.direction == 'RIGHT') {
						x = xx + 1;
						y = yy;
					} else if (enemy.direction == 'LEFT') {
						x = xx - 2;
						y = yy - 1;
					}

					let data = {
						dmg: enemy.charge + enemy.weapon.dmg,
						id: enemy.id,
						direction: enemy.direction,
						pos: {
							x: x,
							y: y,
						},
						type: 'bullet',
					}

					entities.push(data);
					//socket.emit('attack', data);
					charge = 0;
					enemy.cooldown = 100;
				}
			}
		}
	}

	//movement AI
	if (enemy.moveAI == 'stationary') {
		if (enemy.timer <= 0) {
			let num = Random(4);
			if ((num == 0 && enemy.preset == undefined) || enemy.preset == 'LEFT') {
				enemy.direction = 'LEFT';
				enemy.timer = 100;
				if ((Y == enemy.pos.y || Y == enemy.pos.y - 1 || Y == enemy.pos.y + 1) && X <= enemy.pos.x) {
					enemy.preset = 'LEFT';
				} else {
					enemy.preset = undefined;
				}

			} else if ((num == 1 && enemy.preset == undefined) || enemy.preset == 'DOWN') {
				enemy.direction = 'DOWN';
				enemy.timer = 100;
				if ((X == enemy.pos.x || X == enemy.pos.x - 1 || X == enemy.pos.x + 1) && Y >= enemy.pos.y) {
					enemy.preset = 'DOWN';
				} else {
					enemy.preset = undefined;
				}

			} else if ((num == 2 && enemy.preset == undefined) || enemy.preset == 'RIGHT') {
				enemy.direction = 'RIGHT';
				enemy.timer = 100;
				if ((Y == enemy.pos.y || Y == enemy.pos.y - 1 || Y == enemy.pos.y + 1) && X >= enemy.pos.x) {
					enemy.preset = 'RIGHT';
				} else {
					enemy.preset = undefined;
				}

			} else if ((num == 3 && enemy.preset == undefined) || enemy.preset == 'UP') {
				enemy.direction = 'UP';
				enemy.timer = 100;
				if ((X == enemy.pos.x || X == enemy.pos.x - 1 || X == enemy.pos.x + 1) && Y <= enemy.pos.y) {
					enemy.preset = 'UP';
				} else {
					enemy.preset = undefined;
				}

			} else if (enemy.preset != undefined) {
				switch (enemy.preset) {
					case 'UP':
						enemy.direction = 'UP';
						break;
					case 'DOWN':
						enemy.direction = 'DOWN';
						break;
					case 'LEFT':
						enemy.direction = 'LEFT';
						break;
					case 'RIGHT':
						enemy.direction = 'RIGHT';
						break;
				}
				enemy.preset = undefined;
			}
			//console.log(num);
		}
		enemy.timer -= 1;
	}

	if (enemy.moveAI == 'basic') {
		x = enemy.pos.x + 2;
		y = enemy.pos.y + 2;

		let z = X;
		let w = Y;
		//console.log(`you: ${z}, ${w}`);
		//console.log(`them: ${x}, ${y}`);

		//turn system
		if (x < z) {
			if (y < w) {
				if (y + 8 > x) {
					enemy.direction = 'RIGHT';
				} else if (y < x) {
					enemy.direction = 'DOWN';
				}
			} else if (y > w) {
				if (y - 8 < x) {
					enemy.direction = 'RIGHT';
				} else if (y > x) {
					enemy.direction = 'UP';
				}
			}
		} else if (x > z) {
			if (y < w) {
				if (y > x) {
					enemy.direction = 'LEFT';
				} else if (y < x) {
					enemy.direction = 'DOWN';
				}
			} else if (y > w) {
				if (y < x) {
					enemy.direction = 'LEFT';
				} else if (y > x) {
					enemy.direction = 'UP';
				}
			}
		}

		let found = false;

		function enemyMove(poz, dir) {
			found = false;

			if (dir == 'UP') {
				entities.forEach(function(ele) {
					if (ele.pos.y == poz.y - 3 || poz.y - 3 == player.pos.y) {
						if (ele.pos.x == poz.x || poz.x == player.pos.x) {
							found = true;
						}
					}
				});

			} else if (dir == 'DOWN') {
				entities.forEach(function(ele) {
					if (ele.pos.y == poz.y + 2 || poz.y + 2 == player.pos.y) {
						if (ele.pos.x == poz.x || poz.x == player.pos.x) {
							found = true;
						}
					}
				});

			} else if (dir == 'LEFT') {
				entities.forEach(function(ele) {
					if (ele.pos.x == poz.x - 3 || poz.x - 3 == player.pos.x) {
						if (ele.pos.y == poz.y || poz.y == player.pos.y) {
							found = true;
						}
					}
				});

			} else if (dir == 'RIGHT') {
				entities.forEach(function(ele) {
					if (ele.pos.x == poz.x + 2 || poz.x + 2 == player.pos.x) {
						if (ele.pos.y == poz.y || poz.y == player.pos.y) {
							found = true;
						}
					}
				});
			}
		}

		//movement system
		if (enemy.MT == 0) {
			if (enemy.direction == 'UP') {
				enemyMove(enemy.pos, 'UP');

				if (found == false) { // go up
					enemy.pos.y -= 1;
					currentStage.walls.forEach(function(ele) {
						if (ele.id == enemy.id) {
							ele.pos.y -= 1;
						}
					});

				} else {
					enemyMove(enemy.pos, 'LEFT');

					if (found == false) {// if not then turn left
						enemy.pos.x -= 1;
						currentStage.walls.forEach(function(ele) {
							if (ele.id == enemy.id) {
								ele.pos.x -= 1;
							}
						});
					} else {
						enemyMove(enemy.pos, 'RIGHT');

						if (found == false) {
							enemy.pos.x += 1;
							currentStage.walls.forEach(function(ele) {
								if (ele.id == enemy.id) {
									ele.pos.x += 1;
								}
							});
						}
					}
				}
			} else if (enemy.direction == 'DOWN') {
				enemyMove(enemy.pos, 'DOWN');

				if (found == false) { // go down
					enemy.pos.y += 1;
					currentStage.walls.forEach(function(ele) {
						if (ele.id == enemy.id) {
							ele.pos.y += 1;
						}
					});

				} else {
					enemyMove(enemy.pos, 'LEFT');

					if (found == false) {// if not then turn left
						enemy.pos.x -= 1;
						currentStage.walls.forEach(function(ele) {
							if (ele.id == enemy.id) {
								ele.pos.x -= 1;
							}
						});
					} else {
						enemyMove(enemy.pos, 'RIGHT');

						if (found == false) {
							enemy.pos.x += 1;
							currentStage.walls.forEach(function(ele) {
								if (ele.id == enemy.id) {
									ele.pos.x += 1;
								}
							});
						}
					}
				}
			} else if (enemy.direction == 'LEFT') {
				enemyMove(enemy.pos, 'LEFT');

				if (found == false) { // go left
					enemy.pos.x -= 1;
					currentStage.walls.forEach(function(ele) {
						if (ele.id == enemy.id) {
							ele.pos.x -= 1;
						}
					});

				} else {
					enemyMove(enemy.pos, 'UP');

					if (found == false) {// if not then go up
						enemy.pos.y -= 1;
						currentStage.walls.forEach(function(ele) {
							if (ele.id == enemy.id) {
								ele.pos.y -= 1;
							}
						});
					} else {
						enemyMove(enemy.pos, 'DOWN');

						if (found == false) {
							enemy.pos.y += 1;
							currentStage.walls.forEach(function(ele) {
								if (ele.id == enemy.id) {
									ele.pos.y += 1;
								}
							});
						}
					}
				}
			} else if (enemy.direction == 'RIGHT') {
				enemyMove(enemy.pos, 'RIGHT');

				if (found == false) { // go right
					enemy.pos.x += 1;
					currentStage.walls.forEach(function(ele) {
						if (ele.id == enemy.id) {
							ele.pos.x += 1;
						}
					});

				} else {
					enemyMove(enemy.pos, 'UP');

					if (found == false) {// if not then go up
						enemy.pos.y -= 1;
						currentStage.walls.forEach(function(ele) {
							if (ele.id == enemy.id) {
								ele.pos.y -= 1;
							}
						});
					} else {
						enemyMove(enemy.pos, 'DOWN');

						if (found == false) {
							enemy.pos.y += 1;
							currentStage.walls.forEach(function(ele) {
								if (ele.id == enemy.id) {
									ele.pos.y += 1;
								}
							});
						}
					}
				}
			}
			enemy.MT = enemy.max_MT;
		} else {
			enemy.MT -= 1;
		}
	}
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
	if (currentStage.enemies != undefined) {
		currentStage.enemies.forEach(function(ele) {
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
}

//starts the game with the prologue
function start() {
	if (event == 'start1') {
		player.direction = 'LEFT';
		if (variables.prologue.text1 == false) {
			textBox = messages.prologue.msg1;
			variables.prologue.text1 = true;
		}
		if (textBox == undefined) {
			if (variables.prologue.text1 == true) {
				textBox = undefined;
				event = 'start2';
				currentStage = levels.prologue2.office;
				stageChanged = true;
			}
		}
	} else if (event == 'start2') {
		if (currentStage == levels.prologue2.office) {
			//Adom
			entities.push({
				name: "Adom",
				type: 'NPC',
				id: 'AdomBR',
				pos: {
					x: 1,
					y: 7,
				},
				color: 'blue',
			});
			entities.push({
				name: "Adom",
				type: 'NPC',
				id: 'AdomBL',
				pos: {
					x: 0,
					y: 7,
				},
				color: 'blue',
			});
			entities.push({
				name: "Adom",
				type: 'NPC',
				id: 'AdomTR',
				pos: {
					x: 1,
					y: 6,
				},
				color: 'blue',
			});
			entities.push({
				name: "Adom",
				type: 'NPC',
				id: 'AdomTL',
				pos: {
					x: 0,
					y: 6,
				},
				color: 'blue',
			});
			playerList.forEach(function(ele) {
				if (ele.id == 'Adom') {
					ele.room = levels.prologue2.office;
					ele.pos.x = 1;
					ele.pos.y = 7;
				}
			});
			player.direction = 'UP';
			if (variables.prologue.text3 == false) {
				textBox = messages.prologue.msg3;
				variables.prologue.text3 = true;
			}
			if (textBox == undefined) {
				if (variables.prologue.text3 == true && variables.prologue.text4 == false) {
					textBox = messages.prologue.msg4;
					variables.prologue.text4 = true;

				} else if (variables.prologue.text3 == true && variables.prologue.text4 == true && variables.prologue.text5 == false) {
					textBox = messages.prologue.msg5;
					variables.prologue.text5 = true;

				} else if (variables.prologue.text3 == true && variables.prologue.text4 == true && variables.prologue.text5 == true && variables.prologue.text6 == false) {
					textBox = messages.prologue.msg6;
					variables.prologue.text6 = true;

				} else if (variables.prologue.text3 == true && variables.prologue.text4 == true && variables.prologue.text5 == true && variables.prologue.text6 == true && variables.prologue.text7 == false) {
					textBox = messages.prologue.msg7;
					variables.prologue.text7 = true;

				} else if (variables.prologue.text3 == true && variables.prologue.text4 == true && variables.prologue.text5 == true && variables.prologue.text6 == true && variables.prologue.text7 == true && variables.prologue.text8 == false) {
					textBox = messages.prologue.msg8;
					variables.prologue.text8 = true;

				} else {
					event = 'start3';
				}
			}
		}
	} else if (event == 'start3') {
		//Spencer
		entities.push({
			name: "Spencer",
			type: 'NPC',
			id: 'SpencerBR',
			pos: {
				x: 1,
				y: 3,
			},
			color: 'yellow',
		});
		entities.push({
			name: "Spencer",
			type: 'NPC',
			id: 'SpencerBL',
			pos: {
				x: 0,
				y: 3,
			},
			color: 'yellow',
		});
		entities.push({
			name: "Spencer",
			type: 'NPC',
			id: 'SpencerTR',
			pos: {
				x: 1,
				y: 2,
			},
			color: 'yellow',
		});
		entities.push({
			name: "Spencer",
			type: 'NPC',
			id: 'SpencerTL',
			pos: {
				x: 0,
				y: 2,
			},
			color: 'yellow',
		});
		playerList.forEach(function(ele) {
			if (ele.id == 'Spencer') {
				ele.room = levels.prologue2.office;
			}
		});
		//Ray
		entities.push({
			name: "Ray",
			type: 'NPC',
			id: 'RayBR',
			pos: {
				x: 1,
				y: 5,
			},
			color: 'orange',
		});
		entities.push({
			name: "Ray",
			type: 'NPC',
			id: 'RayBL',
			pos: {
				x: 0,
				y: 5,
			},
			color: 'orange',
		});
		entities.push({
			name: "Ray",
			type: 'NPC',
			id: 'RayTR',
			pos: {
				x: 1,
				y: 4,
			},
			color: 'orange',
		});
		entities.push({
			name: "Ray",
			type: 'NPC',
			id: 'RayTL',
			pos: {
				x: 0,
				y: 4,
			},
			color: 'orange',
		});
		playerList.forEach(function(ele) {
			if (ele.id == 'Ray') {
				ele.room = levels.prologue2.office;
			}
		});

		event = 'start4';
	} else if (event == 'start4') {
		if (variables.prologue.text12 == false) {
			player.direction = 'LEFT';
			playerList.forEach(function(ele) {
				if (ele.id == 'Chris') {
					ele.direction = 'LEFT';
				}
			});
		} else {
			player.direction = 'UP';
		}
		if (variables.prologue.text9 == false) {
			textBox = messages.prologue.msg9;
			variables.prologue.text9 = true;
		}
		if (textBox == undefined) {
			if (variables.prologue.text9 == true && variables.prologue.text10 == false) {
				textBox = messages.prologue.msg10;
				variables.prologue.text10 = true;

			} else if (variables.prologue.text9 == true && variables.prologue.text10 == true && variables.prologue.text11 == false) {
				textBox = messages.prologue.msg11;
				variables.prologue.text11 = true;

			} else if (variables.prologue.text9 == true && variables.prologue.text10 == true && variables.prologue.text11 == true && variables.prologue.text12 == false) {
				playerList.forEach(function(ele) {
					if (ele.id == 'Chris') {
						ele.direction = 'DOWN';
					}
				});
				textBox = messages.prologue.msg12;
				variables.prologue.text12 = true;

			} else {
				event = 'tutorial1';
			}
		}
	}
}

let defeated = false;//default: false

//runs the tutorial Levels
function tutorial() {
	if (event == 'tutorial1') {
		currentStage = levels.chapter1.tutorial.lv1;
		stageChanged = true;
		player.weapon = game.weapons.lunarshot.Hytex;
		event = 'tutorial2';
	} else if (event == 'tutorial2') {
		if (variables.chapter1.tutorial.text1 == false) {
			textBox = messages.chapter1.tutorial.msg1;
			variables.chapter1.tutorial.text1 = true;
		}

		if (textBox == undefined) {
			if (variables.chapter1.tutorial.text1 == true && variables.chapter1.tutorial.text2 == false) {
				textBox = messages.chapter1.tutorial.msg2;
				variables.chapter1.tutorial.text2 = true;

			} else if (variables.chapter1.tutorial.text1 == true && variables.chapter1.tutorial.text2 == true && variables.chapter1.tutorial.text3 == false) {
				textBox = messages.chapter1.tutorial.msg3;
				variables.chapter1.tutorial.text3 = true;

			} else if (variables.chapter1.tutorial.text1 == true && variables.chapter1.tutorial.text2 == true && variables.chapter1.tutorial.text3 == true && variables.chapter1.tutorial.text4 == false) {
				textBox = messages.chapter1.tutorial.msg4;
				variables.chapter1.tutorial.text4 = true;

			} else if (defeated == true && variables.chapter1.tutorial.text5 == true) {
				event = 'tutorial3';
				defeated = false;
			}
		}

		levels.chapter1.tutorial.lv1.walls.forEach(function(ele) {
			if (ele.id == 'NPC0') {
				if (ele.HP <= 0) {
					defeated = true;
				}
			}
		});

		if (defeated == true) {
			textBox = messages.chapter1.tutorial.msg5;
			variables.chapter1.tutorial.text5 = true;
		}

	} else if (event == 'tutorial3') {
		currentStage = levels.chapter1.tutorial.lv2;
		stageChanged = true;
		event = 'tutorial4';
		defeated = false;
	} else if (event == 'tutorial4') {
		if (variables.chapter1.tutorial.text6 == false) {
			textBox = messages.chapter1.tutorial.msg6;
			variables.chapter1.tutorial.text6 = true;
		}

		levels.chapter1.tutorial.lv2.walls.forEach(function(ele) {
			if (ele.id == 'enemy0') {
				if (ele.HP <= 0) {
					defeated = true;
				}
			}
		});

		if (defeated == true) {
			event = 'tutorial5';
		}

	} else if (event == 'tutorial5') {
		if (variables.chapter1.tutorial.text7 == false) {
			textBox = messages.chapter1.tutorial.msg7;
			variables.chapter1.tutorial.text7 = true;
		}

		if (textBox == undefined) {
			if (variables.chapter1.tutorial.text7 == true && variables.chapter1.tutorial.text8 == false) {
				textBox = messages.chapter1.tutorial.msg8;
				variables.chapter1.tutorial.text8 = true;

			} else if (variables.chapter1.tutorial.text8) {
				event = 'chapter1';
				menu = 'levelS';
			}
		}
	}
}


function setup() {
	noCursor();

	socket = io();

	//if online mode is on, then check for server events
	if (online == true) {
		socket.on('newPlayer', server.newPlayer);
		socket.on('move', server.newMove);
		socket.on('playerDisconnect', server.playerDisconnect);
		socket.on('attack', server.newAttack);
		socket.on('bulletHit', server.lowerHealth);
	}
}


function draw() {
	clear();
	createCanvas(windowWidth - 20, windowHeight - 20);
	background(currentStage.back);

	if (event.includes('start')) {
		start();
	} else if (event.includes('tutorial')) {
		tutorial();
	}

	//top left corner
	let TLC = {
		pos: { x: player.pos.x - 7, y: player.pos.y - 7 },
	}

	if (stageChanged == true && currentStage.type == undefined) {
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

		entities.forEach(function(ele) {
			ele.pos.y -= currentStage.Sy;
			ele.pos.x -= currentStage.Sx;
			TLC.pos.y -= currentStage.Sy;
			TLC.pos.x -= currentStage.Sx;
		});

		if (currentStage.enemies != undefined) {
			currentStage.enemies.forEach(function(ele) {
				ele.pos.y -= currentStage.Sy;
				ele.pos.x -= currentStage.Sx;
			});
		}

		stageChanged = false;
	}

	if (stageChanged && currentStage.type == '2') {
		entities = [];
		for (y = 0; currentStage.map[y] != undefined; y++) {
			for (x = 0; currentStage.map[y][x] != undefined; x++) {
				if (currentStage.map[y][x] == 'w') {
					entities.push({
						type: 'wall',
						pos: {
							x: x,
							y: y,
						},
						color: 'grey',
					});
				} else if (currentStage.map[y][x] == 'A') {
					entities.push(
						{
							name: "Adom",
							type: 'NPC',
							id: 'AdomBR',
							pos: {
								x: x,
								y: y,
							},
							color: 'blue',
						},
						{
							name: "Adom",
							type: 'NPC',
							id: 'AdomBL',
							pos: {
								x: x - 1,
								y: y,
							},
							color: 'blue',
						},
						{
							name: "Adom",
							type: 'NPC',
							id: 'AdomTR',
							pos: {
								x: x,
								y: y - 1,
							},
							color: 'blue',
						},
						{
							name: "Adom",
							type: 'NPC',
							id: 'AdomTL',
							pos: {
								x: x - 1,
								y: y - 1,
							},
							color: 'blue',
						});
				} else if (currentStage.map[y][x] == 't') {
					entities.push({
						name: "table",
						type: 'wall',
						pos: {
							x: 5,
							y: 6,
						},
						color: 'brown',
					},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 6,
								y: 6,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 7,
								y: 6,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 8,
								y: 6,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 9,
								y: 6,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 10,
								y: 6,
							},
							color: 'brown',
						},
						//left table side
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 5,
								y: 7,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 5,
								y: 8,
							},
							color: 'brown',
						},
						//right table side
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 10,
								y: 7,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 10,
								y: 8,
							},
							color: 'brown',
						},
						//bottom table side
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 6,
								y: 8,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 7,
								y: 8,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 8,
								y: 8,
							},
							color: 'brown',
						},
						{
							name: "table",
							type: 'wall',
							pos: {
								x: 9,
								y: 8,
							},
							color: 'brown',
						},
						//table top
						{
							name: "table",
							type: 'flat',
							pos: {
								x: 5,
								y: 6,
							},
							width: 6,
							height: 3,
							color: 'brown',
						});
				} else if (currentStage.map[y][x] == 'C') {
					entities.push({
						name: "Chris",
						type: 'NPC',
						id: 'ChrisBR',
						pos: {
							x: 8,
							y: 5,
						},
						color: 'green',
						},
						{
							name: "Chris",
							type: 'NPC',
							id: 'ChrisBL',
							pos: {
								x: 7,
								y: 5,
							},
							color: 'green',
						},
						{
							name: "Chris",
							type: 'NPC',
							id: 'ChrisTR',
							pos: {
								x: 8,
								y: 4,
							},
							color: 'green',
						},
						{
							name: "Chris",
							type: 'NPC',
							id: 'ChrisTL',
							pos: {
								x: 7,
								y: 4,
							},
							color: 'green',
					});
				}
			}
		}

		entities.forEach(function(ele) {
			ele.pos.y -= currentStage.Sy;
			ele.pos.x -= currentStage.Sx;
			TLC.pos.y -= currentStage.Sy;
			TLC.pos.x -= currentStage.Sx;
		});

		stageChanged = false;
	}

	//level select menu
	if (menu == 'levelS') {
		background(200);
		//training 
		circle(550, 300, 40);
		line(500, 300, 530, 300);
		line(500, 100, 500, 400);
		//Faster Blaster
		rect(480, 180, 40, 40);
		//checkpoint 1
		if (variables.levels.C1) {
			line(500, 100, 200, 100);
			triangle(360, 120, 400, 120, 380, 80);
		}
		//Red
		if (variables.levels.RS) {
			line(480, 200, 350, 200);
			rect(400, 180, 40, 40);
		}
		//checkpoint 2
		if (variables.levels.C2) {
			line(350, 200, 350, 300);
			triangle(330, 270, 370, 270, 350, 230);
		}
		//checkpoint 3
		if (variables.levels.C3) {
			line(500, 400, 300, 400);
			triangle(400, 420, 440, 420, 420, 380);
		}
		//Center
		if (variables.levels.CS) {
			line(300, 400, 300, 300);
			line(350, 300, 200, 300);
			rect(280, 280, 40, 40);
		}
		//Dance
		if (variables.levels.DS) {
			line(300, 280, 300, 100);
			rect(280, 150, 40, 40);
		}
		//Monkey
		if (variables.levels.MS) {
			line(200, 100, 200, 150);
			rect(180, 80, 40, 40);
		}
		//Blue
		if (variables.levels.BS) {
			line(200, 300, 200, 400);
			line(200, 400, 150, 400);
			rect(180, 380, 40, 40);
		}
		//Caution
		if (variables.levels.CAS) {
			line(150, 400, 150, 150);
			rect(130, 250, 40, 40);
		}
		//Ghost
		if (variables.levels.GS) {
			line(150, 150, 200, 150);
			rect(130, 130, 40, 40);
		}
		//Lunarian HQ
		if (variables.levels.LHQ) {
			line(130, 270, 80, 270);
			line(80, 270, 80, 200);
			triangle(60, 220, 100, 220, 80, 180);
		}
	}

	//quest menu
	if (menu == 'quest') {
		background(140);

		fill(0);
		textSize(30);
		text("No quests yet!", 150, 200);
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
						let offsetX = TLC.pos.x - ele.pos.x;
						let offsetY = TLC.pos.y - ele.pos.y;

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
				let offsetX = TLC.pos.x - ele.pos.x;
				let offsetY = TLC.pos.y - ele.pos.y;

				fill(ele.color);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);

			} else if (ele.type == 'bullet') {
				fill(0);
				rect(ele.pos.x * UNIT, ele.pos.y * UNIT, UNIT, UNIT);

			} else if (ele.type == 'NPC' || ele.type == 'enemy') {
				let offsetX = TLC.pos.x - ele.pos.x;
				let offsetY = TLC.pos.y - ele.pos.y;

				fill(ele.color);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT, UNIT);

			} else if (ele.type == 'door') {
				let offsetX = TLC.pos.x - ele.pos.x;
				let offsetY = TLC.pos.y - ele.pos.y;

				fill(ele.color);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT * 2, UNIT * 2);

			} else if (ele.type == 'flat') {
				let offsetX = TLC.pos.x - ele.pos.x;
				let offsetY = TLC.pos.y - ele.pos.y;

				fill(ele.color);
				rect((TLC.pos.x - offsetX) * UNIT, (TLC.pos.y - offsetY) * UNIT, UNIT * ele.width, UNIT * ele.height);
			} else {
				console.log(`deleted ${ele}`);
				entities = ArrayRemove(entities, ele);
			}
		});
	}

	//other player creator
	if (menu == false) {
		playerList.forEach(function(ele) {
			if (currentStage == ele.room) {
				if (ele.color == undefined) {
					fill('red');
				} else {
					fill(ele.color);
				}
				rect(ele.pos.x * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
				rect((ele.pos.x - 1) * UNIT, ele.pos.y * UNIT, UNIT, UNIT);
				rect((ele.pos.x - 1) * UNIT, (ele.pos.y - 1) * UNIT, UNIT, UNIT);
				rect(ele.pos.x * UNIT, (ele.pos.y - 1) * UNIT, UNIT, UNIT);

				//how the player looks
				rect((ele.pos.x - 1) * UNIT, (ele.pos.y - 1) * UNIT, UNIT * 2, UNIT * 2);
				playerTurn(ele.pos.x, ele.pos.y, ele);
			}
		});
	}

	//enemy creator
	if (menu == false && currentStage.enemies != undefined) {
		currentStage.enemies.forEach(function(ele) {
			if (ele.color == undefined) {
				fill('red');
			} else {
				fill(ele.color);
			}

			let offsetX = TLC.pos.x - ele.pos.x;
			let offsetY = TLC.pos.y - ele.pos.y;

			//just how the enemy looks
			//rect((TLC.pos.x - offsetX - 1) * UNIT, (TLC.pos.y + offsetY - 1) * UNIT, UNIT * 2, UNIT * 2);
			playerTurn(ele.pos.x, ele.pos.y, ele);

			RunAI(ele);
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
		movement = false;
		fill('#FFFF70');
		rect(0, 340, 200, 50);
		rect(0, 12 * UNIT, 15 * UNIT, 100);

		fill(0);
		strokeWeight(0);
		textSize(25);
		text(textBox.author, 10, 370);
		textSize(20);
		text(textBox.message, 10, 13 * UNIT);
		strokeWeight(1);
	} else {
		movement = true;
	}

	//battle interface
	if (menu == false) {
		//weapon charger
		if (player.weapon != undefined) {
			fill(250);
			rect(0, 40, player.weapon.max_charge * 4, 20);
			fill('yellow');
			rect(0, 40, charge * 4, 20);
			//energy meter
			fill(250);
			rect(0, 25, 250, 20);
			fill('blue');
			rect(0, 25, (player.energy / 10) / 2, 20);
		}

		//health bar
		fill(0);
		textSize(30);
		//text(player.HP, 300, 25);
		fill(250);
		rect(0, 0, 300, 25);
		fill('red');
		rect(0, 0, player.HP, 25);
		/*
				fill(200);
				circle(buttons.quest.x, buttons.quest.y, buttons.quest.width);
				fill(0);
				circle(buttons.quest.x, buttons.quest.y + 20, buttons.quest.width - 50);
				triangle(buttons.quest.x + 10, buttons.quest.y - 15, buttons.quest.x - 10, buttons.quest.y - 15, buttons.quest.x + 0, buttons.quest.y + 10);
				*/
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
		text(`${charge}, ${player.energy}`, 20, 20);
	}

	//weapon charger
	if (mouseIsPressed == true && menu == false && player.weapon != undefined && player.weapon.type == 'charger' && textBox == undefined) {
		if (charge < player.weapon.max_charge) {
			charge += 1;
		}
	}

	//fully automatic weapon handeler
	if (mouseIsPressed && !menu && player.weapon != undefined && player.weapon.type == 'full automatic' && textBox == undefined) {
		player.weapon.cooldown--;
		if (player.weapon != undefined && player.weapon.cooldown <= 0) {
			let xx = X;
			let yy = Y;

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
				dmg: player.weapon.dmg,
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
				//console.log(data.pos.x + ", " + data.pos.y);
			}
			player.weapon.cooldown = player.weapon.max_cooldown;
		}
	}

	//semi automatic weaqpon handler
	if (!menu && player.weapon != undefined && player.weapon.type == 'semi automatic' && textBox == undefined) {
		player.weapon.cooldown -= 1;
		console.log(player.weapon.cooldown);
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
			if (i.type == 'wall' || i.type == 'player' || i.type == 'NPC' || i.type == 'enemy') {
				if (dir == "RIGHT" && X + 1 == i.pos.x && Y >= i.pos.y && Y - BOXH < i.pos.y) return true;
				if (dir == "DOWN" && Y + 1 == i.pos.y && X >= i.pos.x && X - BOXW < i.pos.x) return true;
				if (dir == "UP" && Y - BOXH == i.pos.y && X >= i.pos.x && X - BOXW < i.pos.x) return true;
				if (dir == "LEFT" && X - BOXW == i.pos.x && Y >= i.pos.y && Y - BOXH < i.pos.y) return true;
			}
		}
		return false
	}

	//does stuff for bulletsMove
	function bulletThing(elem, ele) {
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
		} else if (elem.type == 'NPC' || elem.type == 'enemy') {
			elem.HP -= ele.dmg;
			if (elem.HP <= 0) {
				entities.forEach(function(eleme) {
					if (eleme.id == elem.id) {
						entities = ArrayRemove(entities, eleme);
					}
				});
				if (elem.type == 'enemy') {
					currentStage.enemies.forEach(function(eleme) {
						if (eleme.id == elem.id) {
							currentStage.enemies = ArrayRemove(currentStage.enemies, eleme);
						}
					});
				}
			}
			if (elem.type == 'enemy') {
				currentStage.enemies.forEach(function(eleme) {
					if (eleme.id == elem.id) {
						eleme.HP -= ele.dmg;
					}
				});
			}
			console.log(`hit dummy ${elem.HP}`);
			entities = ArrayRemove(entities, ele);
		} else if ((ele.pos.x == 7 || ele.pos.x == 6) && (ele.pos.y == 7 || ele.pos.y == 6)) {
			player.HP -= ele.dmg;
			entities = ArrayRemove(entities, ele);
			if (player.HP <= 0) {
				menu = 'dead';
			}
		}
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
								bulletThing(elem, ele);
							}
						});
						break;
					case 'DOWN':
						ele.pos.y++;
						entities.forEach(function(elem) {
							if (ele.pos.y == elem.pos.y && ele.pos.x == elem.pos.x) {
								bulletThing(elem, ele);
							}
						});
						break;
					case 'RIGHT':
						ele.pos.x++;
						entities.forEach(function(elem) {
							if (ele.pos.x == elem.pos.x && ele.pos.y == elem.pos.y) {
								bulletThing(elem, ele);
							}
						});
						break;
					case 'LEFT':
						ele.pos.x--;
						entities.forEach(function(elem) {
							if (ele.pos.x == elem.pos.x && ele.pos.y == elem.pos.y) {
								bulletThing(elem, ele);
							}
						});
						break;
				}
			}
		});
	}

	//player movement
	if (menu == false && movement == true) {
		if (arrowKeys == true) {
			if (keyIsDown(LEFT_ARROW)) {
				let l = Colide('LEFT');
				if (X != (BOXW - 1) && !l) {
					if (moveTimer <= 0) {
						player.pos.x -= 1;
						moveTimer = MT;
						server.playerMoved('x', 'M');
						TLC.pos.x++;
						entitiesMove('x', 'M');
					}
					moveTimer -= 1;
				}
			}
			if (keyIsDown(RIGHT_ARROW)) {
				let r = Colide('RIGHT');
				if (X != WIDTH - 1 && r != true) {
					if (moveTimer <= 0) {
						player.pos.x += 1;
						moveTimer = MT;
						server.playerMoved('x', 'P');
						TLC.pos.x--;
						entitiesMove('x', 'P');
					}
					moveTimer -= 1;
				}
			}
			if (keyIsDown(UP_ARROW)) {
				let u = Colide('UP');
				if (Y != (BOXH - 1) && u != true) {
					if (moveTimer <= 0) {
						player.pos.y -= 1;
						moveTimer = MT;
						server.playerMoved('y', 'M');
						TLC.pos.y++;
						entitiesMove('y', 'M');
					}
					moveTimer -= 1;
				}
			}
			if (keyIsDown(DOWN_ARROW)) {
				let d = Colide('DOWN');
				if (Y != HEIGHT - 1 && d != true) {
					if (moveTimer <= 0) {
						player.pos.y += 1;
						moveTimer = MT;
						server.playerMoved('y', 'P');
						TLC.pos.y--;
						entitiesMove('y', 'P');
					}
					moveTimer -= 1;
				}
			}
		}

		if (WASD == true) {
			if (keys['d'] == true) {
				let r = Colide('RIGHT');
				if (X != WIDTH - 1 && !r) {
					if (moveTimer <= 0) {
						player.pos.x += 1;
						moveTimer = MT;
						server.playerMoved('x', 'P');
						TLC.pos.x--;
						entitiesMove('x', 'P');
					}
					moveTimer -= 1;
				}
			}
			if (keys['a'] == true) {
				let l = Colide('LEFT');
				if (X != (BOXW - 1) && !l) {
					if (moveTimer <= 0) {
						player.pos.x -= 1;
						moveTimer = MT;
						server.playerMoved('x', 'M');
						TLC.pos.x++;
						entitiesMove('x', 'M');
					}
					moveTimer -= 1;
				}
			}
			if (keys['s'] == true) {
				let d = Colide('DOWN');
				if (Y != HEIGHT - 1 && !d) {
					if (moveTimer <= 0) {
						player.pos.y += 1;
						moveTimer = MT;
						server.playerMoved('y', 'P');
						TLC.pos.y--;
						entitiesMove('y', 'P');
					}
					moveTimer -= 1;
				}
			}
			if (keys['w'] == true) {
				let u = Colide('UP');
				if (Y != (BOXH - 1) && !u) {
					if (moveTimer <= 0) {
						player.pos.y -= 1;
						moveTimer = MT;
						server.playerMoved('y', 'M');
						TLC.pos.y++;
						entitiesMove('y', 'M');
					}
					moveTimer -= 1;
				}
			}
		}
	}

	thing = TLC;

	bulletsMove();
	server.playerMoved();
}


function mousePressed() {

	//text test button
	if (mouseX > buttons.text_test.x + buttons.text_test.width - 64 && mouseX < buttons.text_test.x + buttons.text_test.width && mouseY > buttons.text_test.y - buttons.text_test.height + 64 && mouseY < buttons.text_test.y + buttons.text_test.height && menu == 'pause' && textBox == undefined) {
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

	if (menu == 'levelS') {
		//training
		if (mouseX > 550 + 40 - 64 && mouseX < 550 + 40 && mouseY > 300 - 40 + 64 && mouseY < 300 + 40) { }

		//Faster Blaster
		if (mouseX > 480 + 40 - 64 && mouseX < 480 + 40 && mouseY > 180 - 40 + 64 && mouseY < 180 + 40) { }
	}

	//quest button
	/*
		if (mouseX > buttons.quest.x + buttons.quest.width - 128 && mouseX < buttons.quest.x + buttons.quest.width && mouseY > buttons.quest.y - buttons.quest.height - 128 && mouseY < buttons.quest.y + buttons.quest.height && menu == false && textBox == undefined) {
			menu = 'quest';
		}*/
}

function mouseReleased() {
	let TLC = thing;

	if (player.weapon.type == 'charger') {
		if (menu == false && textBox == undefined && player.weapon != undefined) {
			let xx = X;
			let yy = Y;

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
				dmg: charge + player.weapon.dmg,
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
				//console.log(data.pos.x + ", " + data.pos.y);
			}
			charge = 0;
		}
	}

	if (player.weapon.type == 'semi automatic') {
		if (menu == false && textBox == undefined && player.weapon != undefined) {
			if (player.weapon.cooldown <= 0) {
				let xx = X;
				let yy = Y;

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
					dmg: player.weapon.dmg,
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
					//console.log(data.pos.x + ", " + data.pos.y);
					player.weapon.cooldown = player.weapon.max_cooldown;
				}
			}
		}
	}
}

function keyReleased() {
	//pause menu
	if (key === 'p' && (menu == 'pause' || menu == false) && textBox == undefined) {
		if (menu == false) {
			menu = 'pause';
		} else {
			menu = false;
		}
	}

	//quest menu
	/*
		if (key == 'q' && menu != 'pause' && menu != 'main' && textBox == undefined) {
			if (menu == false) {
				menu = 'quest';
			} else {
				menu = false;
			}
		}*/

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