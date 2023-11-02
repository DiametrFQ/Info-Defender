import Inventory from "./Inventory";
import Player from "./Player";

export default class InGamesTool {
  private body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private _inHand: boolean = false;
  private _collide: Phaser.Physics.Arcade.Collider;

  constructor(
    private _coord: [number, number],
    private _physics: Phaser.Physics.Arcade.ArcadePhysics,

    readonly name: string,
    private _text: Phaser.GameObjects.Text,
    private _globalListener: Phaser.Input.InputPlugin,
    private _player: Player
  ) {
    this.body = this._physics.add.sprite(..._coord, name);
    this.body.setInteractive();
    this.body.scaleX = 0.3;
    this.body.scaleY = 0.3;

    this._globalListener.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (this.inHand) {
        this.body.setVisible(true).copyPosition(pointer);
      }
    });

    this.addCollide(this._player);
  }

  addCollide(player: Player) {
    this._collide = this._physics.add.collider(player.body, this.body, () => {
      this.body.setVelocity(0);

      player.body.setVelocity(0);
      player.invenrory.addTool(this);
    });
  }

  removeCollide() {
    this._collide.destroy();
  }

  set coord(newCoord: [number, number]) {
    this._coord = newCoord;
    this.body.setPosition(...newCoord);
  }

  get coord() {
    return this._coord;
  }

  set text(newText: string) {
    this._text.text = newText;
  }

  set textPosition(cord: [number, number]) {
    this._text.setPosition(...cord);
  }

  set inHand(take: boolean) {
    this._inHand = take;
  }

  get inHand() {
    return this._inHand;
  }

  takeFrom(Inventory: Inventory) {
    this.body.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      let countTools = Inventory._countTools.get(this.name)!;
      const toolFromInventory = Inventory._tools.get(this.name)!;

      if (!this.inHand && pointer.leftButtonReleased()) {
        Inventory._countTools.set(this.name, --countTools);
        this.inHand = true;
      } else if (this.inHand) {
        Inventory._countTools.set(this.name, ++countTools);
        this.inHand = false;
        this.body.setPosition(...this._coord);
      }
      if (countTools === 0) {
        toolFromInventory.text = ``;
        return;
      }
      toolFromInventory.text = `${countTools}`;
    });
  }

  offPointerUp() {
    this.body.off("pointerup");
  }

  setSprite(newSprite: string) {
    this.body.setTexture(newSprite);
  }

  destroy() {
    this.body.destroy();
  }
}
