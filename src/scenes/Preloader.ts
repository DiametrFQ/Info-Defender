import Phaser from 'phaser'
import dung from './../../assets/Isometric_MedievalFantasy_Tiles.png'
import MakeFacj from './../../assets/MakeFacj.json'
import Player from './../../assets/Крив.png'

export class Preloader extends Phaser.Scene{
    constructor(){
        super("preloader")
    }

    preload(){
        this.load.image("tiles", dung)
        this.load.tilemapTiledJSON("fuck", MakeFacj)
        this.load.image('player', Player)
    }

    create(){
        this.scene.start("game")
    }
}