import Phaser from 'phaser'
import {Game} from './scenes/Game'
import {Preloader} from './scenes/Preloader'
import './style.scss'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
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
	zoom:1.5
}

export default new Phaser.Game(config)
