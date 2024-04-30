// import InGamesTool from "./InGamesTool";
import Player from "./Player";

export default class GameMap {
  readonly coord = [0, 0];
  private _tileSet: Phaser.Tilemaps.Tileset;
  readonly ground: Phaser.Tilemaps.TilemapLayer;
  readonly _walls: Phaser.Tilemaps.TilemapLayer;

  constructor(private map: Phaser.Tilemaps.Tilemap) {
    this._tileSet = this.map.addTilesetImage("scene", "tiles");

    this.ground = this.map
      .createLayer("Floor", this._tileSet)
      .setPosition(...this.coord);
    this._walls = this.map
      .createLayer("Walls", this._tileSet)
      .setPosition(...this.coord);

    this._walls.setCollisionByProperty({ collides: true });
    this._walls.setCollisionBetween(0, 10000);
  }

  setCollide(physics: Phaser.Physics.Arcade.ArcadePhysics, player: Player) {
    physics.add.collider(player.body, [this._walls], () => {
      player.body.setVelocity(0);
    });
  }
}
