import Phaser from "phaser";
import { Game } from "../../../scenes/Game";
import Answer from "../Answer";

import DialogComandInjJSON from "./DialogComandInj.json";
import DialogSQL from "./DialogSQL.json";
import DialogXSS from "./DialogXSS.json";
import endGame from "../../../Frontend/EndGameGenerator";
import Buble from "../../Bubles/Bubles";
import Matcher from "./components/matcher";

type dialog = typeof DialogComandInjJSON | typeof DialogSQL | typeof DialogXSS;

const dialogs: [dialog, dialog, dialog] = [
  DialogComandInjJSON,
  DialogSQL,
  DialogXSS,
];

export default class Quest4_1 {
  private _description: Phaser.GameObjects.Text;
  private _beckDescription: Phaser.GameObjects.Sprite;

  constructor(
    private _coord: [number, number],
    private _scene: Game,
    readonly _text: string,
    readonly _textDescription: string,
    readonly dialogNum: number,
    public _doneCount: { count: number }
  ) {
    this._beckDescription = this._scene.add.sprite(...this._coord, "textBlock");
    this._beckDescription.displayHeight = 900;
    this._beckDescription.displayWidth = 600;

    this._coord[1] -= 280;

    this._description = this._scene.add.text(
      this._coord[0] - 200,
      this._coord[1] - 50,
      this._text,
      { color: "#38201c" }
    );

    this.init();
  }

  setText(text: string) {
    this._description.text = text;
  }

  init() {
    new Matcher(
      this._coord.map((c) => c + 300) as [number, number],
      this._scene
    );
    const answers: Answer[] = [];

    const generatorDialogs = () => {
      let level = 0;
      let countAnswers = 1;
      const getNewAnswers = () => {
        const choisesOnLevel = dialogs[this.dialogNum][level];

        for (const keyChoises in choisesOnLevel) {
          const keyChoisesTyped = keyChoises as
            | "goodChoises"
            | "badChoises"
            | "deadChoises";

          const choises = choisesOnLevel[keyChoisesTyped];

          for (const choise of choises) {
            const consequences = () => {
              this.setText(choise.answer);
              if (keyChoisesTyped == "goodChoises") {
                answers.forEach((answer) => answer.destroy());
                answers.length = 0;
                countAnswers = 1;

                const answer = new Answer(
                  this._scene,
                  [this._coord[0], this._coord[1] + 110],
                  "Здорово",
                  () => {
                    answer.destroy();
                    this._description.destroy();
                    this._beckDescription.destroy();
                    this.checkDone();
                  }
                );
              } else if (keyChoisesTyped == "deadChoises") {
                endGame(
                  this._coord,
                  this._scene,
                  choise,
                  this._description,
                  this._beckDescription,
                  answers
                );
              }
              answer.destroy();
            };

            const answer = new Answer(
              this._scene,
              [this._coord[0], this._coord[1] + 110 * countAnswers],
              choise.choise,
              consequences
            );
            answers.push(answer);
            countAnswers++;
          }
        }
        level++;
      };
      return getNewAnswers;
    };

    const getNewAnswers = generatorDialogs();
    getNewAnswers();
  }

  checkDone() {
    if (this._doneCount.count == 2) {
      this.idDone();
    } else {
      this._doneCount.count++;
    }
  }

  idDone() {
    new Buble(
      "owasp2",
      [920, 490],
      this._scene.physics,
      this._scene.player,
      () => {
        new Matcher(
          this._coord.map((c) => c + 300) as [number, number],
          this._scene
        );
      }
    );
  }
}
