// import Inventory from "./Inventory";
import Player from "../Player";

export default class Buble {
  readonly body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(
    private _coord: [number, number],
    private _physics: Phaser.Physics.Arcade.ArcadePhysics,

    readonly name: string,
    // private _globalListener: Phaser.Input.InputPlugin,
    private _player: Player,
    private _func: Function
  ) {
    this.body = this._physics.add
      .sprite(...this._coord, this.name)
      .setInteractive();
    this.body.displayHeight = 100;
    this.body.displayWidth = 100;

    this._physics.add.collider(this._player.body, this.body, () => {
      this.body.destroy();
      this._func();
      this._player.body.setVelocity(0);
    });

    // this._globalListener.on("pointermove", (pointer: Phaser.Input.Pointer) => {
    //   if (this.inHand) {
    //     this.body.setVisible(true).copyPosition(pointer);
    //   }
    // });

    //this.addCollide(this._player)
  }
}
