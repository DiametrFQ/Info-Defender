import Phaser from "phaser";
import { Game } from "../../scenes/Game";

export default class Quest {
  public _description: Phaser.GameObjects.Text;
  public _beckDescription: Phaser.GameObjects.Sprite;
  public _sprite;

  private _back;
  constructor(
    private _coord: [number, number],
    private _scene: Game,
    readonly _text: string,
    readonly _textDescription: string
  ) {
    this._back = this._scene.add.sprite(
      ...this._coord,
      "QuestATimerAnoActoveQuest"
    );
    this._back.setInteractive();
    this._back.displayHeight = 100;
    this._back.displayWidth = 200;
    this._sprite = this._scene.add.text(
      this._coord[0] - 50,
      this._coord[1] - 5,
      `${_text}`
    );

    this._back.on("pointerover", () => {
      this._beckDescription = this._scene.add.sprite(
        this._coord[0] + 250,
        this._coord[1] + 5,
        "textBlock"
      );
      this._beckDescription.displayHeight = 200;
      this._beckDescription.displayWidth = 400;
      this._description = this._scene.add.text(
        this._coord[0] + 100,
        this._coord[1] - 5,
        `${_textDescription}`,
        {
          color: "#38201c",
        }
      );
    });

    this._back.on("pointerout", () => {
      this._beckDescription.destroy();
      this._description.destroy();
    });
  }

  setSprite(sprite: string) {
    this._back.destroy();
    this._back = this._scene.add.sprite(...this._coord, sprite);
    this._back.setInteractive();
    this._back.displayHeight = 100;
    this._back.displayWidth = 200;
    this._sprite.destroy();
    this._sprite = this._scene.add.text(
      this._coord[0] - 50,
      this._coord[1] - 5,
      `${this._text}`
    );
  }
}
