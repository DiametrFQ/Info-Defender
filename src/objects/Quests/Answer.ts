import { Game } from "../../scenes/Game";

export default class Answer {
  private answer;
  private answerText;

  constructor(
    readonly _scene: Game,
    private _coord: [number, number],
    private _text: string,
    readonly func: Function
  ) {
    this.answer = this._scene.add.sprite(...this._coord, "possibleAnswer");
    this.answerText = this._scene.add.text(
      this._coord[0] - 160,
      this._coord[1] - 10,
      `${this._text}`,
      {
        color: "#38201c",
      }
    );
    this.answer.displayHeight = 100;
    this.answer.displayWidth = 480;
    this.answer.setInteractive();
    this.answer.on("pointerup", this.func);
  }
  destroy() {
    this.answer.destroy();
    this.answerText.destroy();
  }
  setText(text: string) {
    this.answerText.text = text;
  }
  setFunc(func: Function) {
    this.answer.off("pointerup");
    this.answer.on("pointerup", func);
  }
  setPossition(x: number, y: number) {
    this.answer.setPosition(x, y);
    this.answerText.setPosition(x - 160, y - 10);
  }
}
