import Phaser from 'phaser'
import {Game} from './scenes/Game'
import {Preloader} from './scenes/Preloader'

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
