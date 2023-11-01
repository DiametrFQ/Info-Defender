import Phaser from "phaser";
import { Game } from "../../scenes/Game";
import Answer from "./Answer";
import Buble from "../Bubles/Bubles";

export default class Question2 {
  public _description: Phaser.GameObjects.Text;
  public _beckDescription: Phaser.GameObjects.Sprite;
  constructor(
    private _coord: [number, number],
    private _scene: Game,
    readonly _text: string,
    readonly _textDescription: string
  ) {
    this._beckDescription = this._scene.add.sprite(...this._coord, "textBlock");
    this._beckDescription.displayHeight = 900;
    this._beckDescription.displayWidth = 600;
    this._description = this._scene.add.text(
      this._coord[0] - 180,
      this._coord[1] - 80,
      this._text
    );
    const Answer1 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 110],
      "Подключен ли монитор к компьютеру?",
      () => {
        Answer2.destroy();
        Answer3.destroy();
        this.setText("Кто-то украл hdmi!");
        Answer1.setText("Найти кабель");
        Answer1.setFunc(() => {
          Answer1.destroy();
          this._beckDescription.destroy();
          this._description.destroy();

          new Buble(
            [1490, 550],
            this._scene.physics,
            "buble_keyboard",
            this._scene.player,
            () => {
              new Buble(
                [750, 750],
                this._scene.physics,
                "buble_no_keyboard",
                this._scene.player,
                () => {}
              );
            }
          );

          new Buble(
            [1470, 650],
            this._scene.physics,
            "buble_HDMI",
            this._scene.player,
            () => {
              new Buble(
                [1110, 450],
                this._scene.physics,
                "buble_no_mon",
                this._scene.player,
                () => {
                  this._scene.quests[0].setSprite("QDORAL");
                }
              );
            }
          );
        });
      }
    );
    const Answer2 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 220],
      "Постучать по монитору)))",
      () => {
        Answer2.destroy();
        this.setText("Так делают только\n подлые ящеры");
      }
    );

    const Answer3 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 330],
      "Подключен ли монитор к разетке?",
      () => {
        Answer3.destroy();
        this.setText("Монитор подключен к разетке");
      }
    );
  }
  setText(text: string) {
    this._description.text = text;
  }
}