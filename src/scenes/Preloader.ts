import Phaser from 'phaser'

export class Preloader extends Phaser.Scene{
    constructor(){
        super("preloader")
    }

    preload(){
        this.load.image("tiles","assets/Isometric_MedievalFantasy_Tiles.png")
        this.load.tilemapTiledJSON("fuck", 'assets/MakeFacj.json')
        this.load.image('player', 'assets/Крив.png')
    }

    create(){
        this.scene.start("game")
    }
}