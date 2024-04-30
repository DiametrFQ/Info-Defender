import Phaser from "phaser";
import Button from "./Button";

export default class Input extends Button {
  public active = false;
  private name: string;
  constructor(
    readonly body: Phaser.GameObjects.Sprite,
    readonly _text: Phaser.GameObjects.Text
  ) {
    super(body, _text);
    this.name = _text.text;
    this.body.setInteractive();
    this.body.on("pointerup", () => {
      this.setActive(true);
      if (this.text === this.name) {
        this.text = "";
      }
    });
  }

  public setActive(state: boolean) {
    this.active = state;
  }

  set text(word: string) {
    this._text.text = word;
  }

  get text() {
    return this._text.text;
  }
}
