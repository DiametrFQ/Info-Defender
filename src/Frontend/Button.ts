import Phaser from "phaser";

export default class Button {
  constructor(
    readonly _body: Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle, // readonly text: Phaser.GameObjects.Text,
    readonly _text: Phaser.GameObjects.Text
  ) {}

  destroy() {
    this._body.destroy();
    this._text.destroy();
  }
}
