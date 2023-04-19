import Phaser from 'phaser'
import {Game} from './scenes/Game'
import {Preloader} from './scenes/Preloader'
import './assets/0x72_DungeonTilesetII_v1.4.png'
import './assets/MakeFacj.json'
import './assets/Крив.png'



const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	scene: [Preloader, Game],
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 0 },
		},
	},
	// scale:{
	// 	zoom:2
	// }
	zoom:2
}

export default new Phaser.Game(config)
