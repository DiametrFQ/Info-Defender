import { Game } from "../../../../scenes/Game";

export default class QuationsWithImg {
  private description: Phaser.GameObjects.Text;
  private sprite;
  private additionalFunction: Function;

  readonly _target: Phaser.GameObjects.Sprite;

  public isDone = false;

  private _back;
  constructor(
    private coord: [number, number],
    private scene: Game,
    readonly _text: string,
    readonly _img: string,
    readonly coordTarget: [number, number],
    private sizeScale: number
  ) {
    this._back = this.scene.add.sprite(...this.coord, "textBlock");
    this._back.displayHeight = 900;
    this._back.displayWidth = 1100;

    this._target = this.scene.add.sprite(...coordTarget, "possibleAnswer");
    this._target.displayHeight = 20;
    this._target.setInteractive();
    this._target.on("pointerup", () => {
      this.isDone = true;
      this.destroy();
    });

    this.sprite = this.scene.add.image(this.coord[0], this.coord[1], _img);
    this.sprite.scale = this.sizeScale;

    this._target.displayWidth = this.sprite.width;

    this.setText(this._text);
  }

  setText(text: string) {
    if (this.description) {
      this.description.destroy();
    }
    this.description = this.scene.add.text(
      this.coord[0] - 180,
      this.coord[1] - 400,
      text,
      {
        color: "#38201c",
      }
    );
  }

  addFunctionOnDead(func: Function) {
    this.additionalFunction = func;
  }

  destroy() {
    this._back.destroy();
    this.description.destroy();
    this._target.destroy();
    this.sprite.destroy();
    this.additionalFunction();
  }
}
