import { Game } from "../scenes/Game";
import Phaser from "phaser";
import Button from "./Button";
import Init1Level from "../scenes/Levels/Init1Level";
import Init2Level from "../scenes/Levels/Init2Level";
import Init3Level from "../scenes/Levels/Init3Level";

export default class Levels {
  private x = 950;
  private y = 300;
  private weight = 400;
  private height = 300;
  private activeHexColor = 0x42f59e;
  private passiveHexColor = 0x898c91;
  private textBlock: Phaser.GameObjects.Sprite;

  private rectangles: Button[] = [];
  constructor(
    readonly scane: Game // readonly text: Phaser.GameObjects.Text,
  ) {}

  init() {
    this.textBlock = this.scane.add.sprite(this.x, 500, "BackMenu");
    this.generateLevelRectangle(
      this.x - 450,
      this.y,
      this.activeHexColor,
      1
    ).on("pointerup", () => {
      this.destroy();
      this.scane.level = 1;
      Init1Level(this.scane);
    });
    this.generateLevelRectangle(this.x, this.y, this.activeHexColor, 2).on(
      "pointerup",
      () => {
        this.destroy();
        this.scane.level = 2;
        Init2Level(this.scane);
      }
    );
    this.generateLevelRectangle(
      this.x + 450,
      this.y,
      this.activeHexColor,
      3
    ).on("pointerup", () => {
      this.destroy();
      this.scane.level = 2;
      Init3Level(this.scane);
    });

    this.y += 400;

    this.generateLevelRectangle(this.x - 450, this.y, this.passiveHexColor, 4);
    this.generateLevelRectangle(this.x, this.y, this.passiveHexColor, 5);
    this.generateLevelRectangle(this.x + 450, this.y, this.passiveHexColor, 6);
  }

  generateLevelRectangle(x: number, y: number, color: number, num: number) {
    const rec = this.scane.add
      .rectangle(x, y, this.weight, 11, this.height, color)
      .setInteractive();

    rec.fillColor = color;
    rec.scaleY = 20;

    const text = this.scane.add.text(x, y, num.toString(), { color: "black" });
    text.scale = 2;

    const btn = new Button(rec, text);

    this.rectangles.push(btn);
    return rec;
  }

  setCoord(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  destroy() {
    this.textBlock.destroy();
    this.rectangles.forEach((rec) => rec.destroy());
  }
}
