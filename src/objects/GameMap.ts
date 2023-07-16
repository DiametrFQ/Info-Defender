// import InGamesTool from "./InGamesTool";
import Player from "./Player";

export default class GameMap{

    readonly coord = [500, 100];
    private _tileSet: Phaser.Tilemaps.Tileset;
    readonly ground: Phaser.Tilemaps.TilemapLayer;
    readonly _walls: Phaser.Tilemaps.TilemapLayer;
    readonly _stena: Phaser.Tilemaps.TilemapLayer;

    constructor(
        private map: Phaser.Tilemaps.Tilemap,
    ){ 
        this._tileSet = this.map.addTilesetImage('IsoTales', 'tiles');

        this.ground = this.map.createLayer('Слой тайлов 1', this._tileSet).setPosition(...this.coord);
        this._walls = this.map.createLayer('Walls', this._tileSet).setPosition(...this.coord);
        this._stena = this.map.createLayer('stena', this._tileSet).setPosition(...this.coord);

        this._walls.setCollisionByProperty({collides: true});
        this._walls.setCollisionBetween(0,10000);
        this._stena.setCollisionByProperty({collides: true});
        this._stena.setCollisionBetween(0,10000);
    }

    setCollide(physics: Phaser.Physics.Arcade.ArcadePhysics, player: Player){
        physics.add.collider(player.body, [this._walls, this._stena], () => {
            player.body.setVelocity(0)
        })
    }
}