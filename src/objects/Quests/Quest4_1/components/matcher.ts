import Button from "../../../../Frontend/Button";
import { Game } from "../../../../scenes/Game";
import Comparable from "./comparable";

export default class Matcher {
  private _back: Phaser.GameObjects.Sprite;
  readonly checkButton: Button;

  private garbage: Phaser.GameObjects.Sprite[] = [];
  private rightCoordTargets: [number, number][] = [
    [600, 200],
    [600, 400],
    [600, 600],
  ];
  private leftCoordTargets: [number, number][] = [
    [1200, 200],
    [1200, 400],
    [1200, 600],
  ];

  private rightTextTargets: string[] = [
    "XSS инъекция",
    "SQL инъекция",
    "Code injection",
  ];
  private leftTextTargets: string[] = [
    `SecRule ARGS "@contains <sc" "phase:2\n,log,deny,msg:'Detect try to use\n scriptblock'id:4001" иSecRule ARGS\n "@contains <Sc" "phase:2,log,deny,msg\n:'Detect try to use\n scriptblock'id:4002"`,
    `SecRule REQUEST_FILENAME|ARGS_NAMES|\nARGS|XML:/*"(?i)\b(?i:and)\b\s+(\d{1,10}|\n'[^=]{1,10}')\s*[=]|\b(?i:and)\b\s+(\d{1,10\n}|'[^=]{1,10}')\s*[<>]|\band\b ?(?:\d{1,10\n}|[\'\"][^=]{1,10}[\'\"]) ?[=<>]+|\b(?i:and\n)\b\s+(\d{1,10}|'[^=]{1,10}')" "phase:2,\nlog,deny,msg:'XCC regular detect'\nid:5005"`,
    `SecRule ARGS "@contains |" "phase:2,\nlog,deny,msg:'Command injection.\n Detect |'id:1003"`,
  ];

  private rirgtComparables: Comparable[] = [];
  private leftComparables: Comparable[] = [];

  constructor(private coord: [number, number], private scene: Game) {
    this._back = this.scene.add.sprite(...this.coord, "textBlock");
    this._back.displayHeight = 900;
    this._back.displayWidth = 1100;

    const button = this.scene.add.sprite(
      coord[0],
      coord[1] + 300,
      "possibleAnswer"
    );
    button.setInteractive().on("pointerup", () => {
      console.log("check");
      this.checkMatch();
    });
    button.scale = 0.1;
    this.checkButton = new Button(
      button,
      this.scene.add.text(coord[0] - 30, coord[1] + 295, "Check", {
        color: "#38201c",
      })
    );

    this.rightCoordTargets.forEach((coord) => {
      const spr = this.scene.add
        .sprite(...coord, "possibleAnswer")
        .setInteractive()
        .on("pointerup", () => {});

      spr.scale = 0.5;
      spr.scaleX = 0.25;
      spr.scaleY = 0.45;

      this.garbage.push(spr);
    });

    this.leftCoordTargets.forEach((coord) => {
      const spr = this.scene.add
        .sprite(...coord, "possibleAnswer")
        .setInteractive()
        .on("pointerup", () => {});

      spr.scale = 0.5;
      spr.scaleX = 0.25;
      spr.scaleY = 0.45;

      this.garbage.push(spr);
    });

    this.rightCoordTargets.forEach((coord, i) => {
      const newComparable = new Comparable(
        this.scene,
        [coord[0] - 400, coord[1]],
        this.rightCoordTargets,
        this.rightTextTargets[i]
      );
      this.rirgtComparables.push(newComparable);
    });

    this.leftCoordTargets.forEach((coord, i) => {
      const newComparable = new Comparable(
        this.scene,
        [coord[0] + 400, coord[1]],
        this.leftCoordTargets,
        this.leftTextTargets[i]
      );
      this.leftComparables.push(newComparable);
    });
  }

  destroy() {
    this.garbage.forEach((spr) => {
      spr.destroy();
    });
    this.rirgtComparables.forEach((comparable) => {
      comparable.destroy();
    });
    this.leftComparables.forEach((comparable) => {
      comparable.destroy();
    });
    this.checkButton.destroy();
    this._back.destroy();
  }

  checkMatch() {
    let isDone = true;
    this.rirgtComparables.map((right, i) => {
      console.log(right.getY(), this.leftComparables[i].getY());
    });

    for (let i = 0; i < this.rirgtComparables.length; i++) {
      const right = this.rirgtComparables[i];
      const left = this.leftComparables[i];

      if (right.getY() !== left.getY()) {
        isDone = false;
        break;
      }
      console.log(right.getY(), left.getY());
    }
    if (isDone) {
      this.destroy();
      this.scene.quests[0].done();
    } else {
      let btn: Button;
      const popup = this.scene.add
        .sprite(800, 400, "possibleAnswer")
        .setInteractive()
        .on("pointerup", () => {
          popup.destroy();
          btn.destroy();
        });
      popup.scale = 0.5;

      btn = new Button(
        popup,
        this.scene.add.text(600, 400, "Попробуй еще раз", {
          color: "#38201c",
          fontSize: "30px",
        })
      );
    }
  }
}
