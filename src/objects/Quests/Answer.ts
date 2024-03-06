import { Game } from "../../scenes/Game";

export default class Answer {
  private view;
  private text;

  constructor(
    readonly _scene: Game,
    private _coord: [number, number],
    private _text: string,
    readonly consequences: Function
  ) {
    this.view = this._scene.add.sprite(...this._coord, "possibleAnswer");
    this.text = this._scene.add.text(
      this._coord[0] - 160,
      this._coord[1] - 10,
      this._text,
      { color: "#38201c" }
    );
    this.buildView([100, 480]).buildViewInteractive();
  }
  destroy() {
    this.view.destroy();
    this.text.destroy();
  }
  setText(text: string) {
    this.text.text = text;
  }
  setFunc(func: Function) {
    this.view.off("pointerup");
    this.view.on("pointerup", func);
  }
  setPossition(x: number, y: number) {
    this.view.setPosition(x, y);
    this.text.setPosition(x - 160, y - 10);
  }
  buildView(coord: [number, number]) {
    this.view.displayHeight = coord[0];
    this.view.displayWidth = coord[1];
    return this;
  }
  buildViewInteractive() {
    this.view.setInteractive().on("pointerup", this.consequences);
    return this;
  }
}
