import Phaser from 'phaser'
import tiles from '@/Isometric_MedievalFantasy_Tiles.png'
import MakeFacj from '../../assets/MakeFacj.json'
import Player from '@/Крив.png'
import wire from '@/wire.png'
import gaykey from '@/gaykey.png'


export class Preloader extends Phaser.Scene{
    constructor(){
        super("preloader")
    }

    preload(){
        this.load.image("wire", wire)
        this.load.image("gaykey", gaykey)
        this.load.image("tiles", tiles)
        this.load.tilemapTiledJSON("fuck", MakeFacj)
        this.load.image('player', Player)
    }

    create(){
        this.scene.start("game")
    }
}