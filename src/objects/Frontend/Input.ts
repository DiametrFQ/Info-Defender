import Phaser from "phaser";
import Button from "./Button";

export default class Input extends Button {
  public _active = false;
  constructor(
    readonly _body: Phaser.GameObjects.Rectangle, // readonly text: Phaser.GameObjects.Text,
    readonly _text: Phaser.GameObjects.Text
  ) {
    super(_body, _text);
    this._body.setInteractive();
    this._body
      .on("keydown-A", () => {
        // console.log(this._active);
        // if (this._active) {
        this._text.text += "asd";
        // }
      })
      .on("pointerup", () => {
        this.setActive(true);
      });
  }

  public setActive(state: boolean) {
    this._active = state;
  }

  set text(word: string) {
    this._text.text = word;
  }

  get text() {
    return this._text.text;
  }
}
