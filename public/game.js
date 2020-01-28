class Game {
	constructor() {
		this.levels = {
			test: {
				name: "test 2",
				type: '2',
				back: 230,
				WIDTH: 20,
				HEIGHT: 20,
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
			}
		};
		this.weapons = {
			//shooters
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
			lunarshot2K: {
				Lunarian: {
					dmg: 65,
					energy: 20,
					max_charge: 50,
					range: 4,
					type: 'charger',
				},
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
			//snipers
			_360_sniper: {
				Lunarian: {
					dmg: 100,
					energy: 60,
					max_charge: 95,
					range: 9,
					type: 'charger',
				},
				Linthorium: {
					dmg: 120,
					energy: 60,
					max_charge: 50,
					range: 10,
					type: 'charger',
				},
			},
			_360_no_scope: {
				Linthorium: {
					dmg: 150,
					energy: 60,
					max_charge: 40,
					range: 8,
					type: 'charger',
				},
			},
			bow: {
				NRG: {
					dmg: 100,
					energy: 50,
					max_charge: 60,
					range: 9,
					type: 'charger',
				},
			},
			tri_compound: {
				NRG: {
					dmg: 100,
					energy: 70,
					max_charge: 75,
					range: 9,
					type: 'charger',
				},
			},
			//side arms
			lunav: {
				Lunarian: {
					dmg: 20,
					energy: 5,
					max_charge: 65,
					range: 4,
					type: 'charger',
				},
				Hytex: {
					dmg: 25,
					energy: 5,
					max_charge: 80,
					range: 5,
					type: 'charger',
				},
				Linthorium: {
					dmg: 30,
					energy: 10,
					max_charge: 60,
					range: 5.5,
					type: 'charger',
				},
			},
			perl: {
				Hytex: {
					dmg: 30,
					energy: 15,
					max_charge: 60,
					range: 3,
					type: 'charger',
				},
				Hurricane: {
					dmg: 20,
					energy: 15,
					max_charge: 80,
					range: 5.5,
					type: 'charger',
				},
				NRG: {
					dmg: 25,
					energy: 10,
					max_charge: 75,
					range: 4,
					type: 'charger',
				},
			},
			//blasters
			mint260: {
				Hytex: {
					dmg: 100,
					energy: 50,
					cooldown: 15,
					max_cooldown: 15,
					range: 4.5,
					type: 'semi automatic',
				},
				Linthorium: {
					dmg: 100,
					energy: 65,
					cooldown: 20,
					max_cooldown: 20,
					range: 6,
					type: 'semi automatic',
				},
			},
			ruby: {
				NRG: {
					dmg: 130,
					energy: 50,
					cooldown: 15,
					max_cooldown: 15,
					range: 5,
					type: 'semi automatic',
				},
				Hurricane: {
					dmg: 110,
					energy: 50,
					cooldown: 20,
					max_cooldown: 20,
					range: 6,
					type: 'semi automatic',
				},
			},
			//full autos
			tiger: {
				Hytex: {
					dmg: 25,
					energy: 20,
					range: 6.5,
					cooldown: 6,
					max_cooldown: 6,
					type: 'full automatic',
				}
			},
			silma: {
				Hytex: {
					dmg: 30,
					energy: 10,
					cooldown: 4,
					max_cooldown: 4,
					range: 5,
					type: 'full automatic',
				},
				NRG: {
					dmg: 40,
					energy: 20,
					cooldown: 4,
					max_cooldown: 4,
					range: 3.5,
					type: 'full automatic',
				},
			},
			//gatlings
			gatling: {
				Hurricane: {
					dmg: 70,
					energy: 20,
					max_charge: 50,
					cooldown: 15,
					max_cooldown: 15,
					range: 8,
					type: 'gatling',
				},
				Hytex: {
					dmg: 50,
					energy: 10,
					max_charge: 50,
					cooldown: 15,
					max_cooldown: 15,
					range: 6,
					type: 'gatling',
				},
			},
		};
	}
}