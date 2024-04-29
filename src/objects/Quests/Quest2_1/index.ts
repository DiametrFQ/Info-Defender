import Phaser from "phaser";
import { Game } from "../../../scenes/Game";
import Answer from "../Answer";
import Buble from "../../Bubles/Bubles";
import dialogsJSON from "./dialogs.json";
import QuationsWithImg from "./components/QueationsWithImg";
import Levels from "../../../Frontend/Levels";

export default class Quest2_1 {
  private _description: Phaser.GameObjects.Text;
  private _beckDescription: Phaser.GameObjects.Sprite;

  private _startBubbleCount = 0;
  private _doneCount = 0;

  constructor(
    private _coord: [number, number],
    private _scene: Game,
    readonly _text: string,
    readonly _textDescription: string
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
    const answers: Answer[] = [];

    const generatorDialogs = () => {
      let level = 0;
      let countAnswers = 1;
      const getNewAnswers = () => {
        const choisesOnLevel = dialogsJSON[level];

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
                if (this._startBubbleCount == 2) {
                  const answer = new Answer(
                    this._scene,
                    [this._coord[0], this._coord[1] + 110],
                    "Здорово",
                    () => {
                      answer.destroy();
                      this._description.destroy();
                      this._beckDescription.destroy();

                      new Buble(
                        "buble_no_mon",
                        [920, 490],
                        this._scene.physics,
                        this._scene.player,
                        () => {
                          new QuationsWithImg(
                            [800, 500],
                            this._scene,
                            "Нужно избавиться от вирусных программ",
                            "Casino1",
                            [800, 500],
                            2
                          ).addFunctionOnDead(() => this.checkDone());
                        }
                      );

                      new Buble(
                        "buble_no_mon",
                        [1220, 490],
                        this._scene.physics,
                        this._scene.player,
                        () => {
                          new QuationsWithImg(
                            [800, 500],
                            this._scene,
                            "Нужно избавиться от вирусных программ",
                            "Casino2",
                            [800, 500],
                            1
                          ).addFunctionOnDead(() => this.checkDone());
                        }
                      );

                      new Buble(
                        "buble_no_mon",
                        [1120, 560],
                        this._scene.physics,
                        this._scene.player,
                        () => {
                          new QuationsWithImg(
                            [800, 500],
                            this._scene,
                            "Нужно избавиться от вирусных программ",
                            "Casino3",
                            [800, 440],
                            1
                          ).addFunctionOnDead(() => this.checkDone());
                        }
                      );
                    }
                  );
                } else {
                  this._startBubbleCount++;
                  getNewAnswers();
                }
              } else if (keyChoisesTyped == "deadChoises") {
                const endGameBack = this._scene.add.sprite(
                  this._coord[0],
                  this._coord[1] + 300,
                  "textBlock"
                );
                endGameBack.displayHeight = 900;
                endGameBack.displayWidth = 600;

                const endGameText = this._scene.add.text(
                  this._coord[0] - 150,
                  this._coord[1],
                  "Конец игры",
                  {
                    color: "#38201c",
                    fontSize: "50px",
                  }
                );

                const endGameDescription = this._scene.add.text(
                  this._coord[0] - 250,
                  this._coord[1] + 150,
                  choise.answer,
                  {
                    color: "#38201c",
                    fontSize: "26px",
                  }
                );

                const endGameButton = this._scene.add.sprite(
                  this._coord[0] + 140,
                  this._coord[1] + 600,
                  "textBlock"
                );
                endGameButton.displayHeight = 100;
                endGameButton.displayWidth = 300;
                endGameButton.setInteractive();

                endGameButton.on("pointerup", () => {
                  answers.forEach((answer) => answer.destroy());

                  this._description.destroy();
                  this._beckDescription.destroy();

                  endGameText.destroy();
                  endGameDescription.destroy();
                  endGameBack.destroy();
                  endGameButton.destroy();

                  this._scene.quests.forEach((quest) => quest.destroy());

                  new Levels(this._scene).init();
                });

                // endGameText
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
    console.log("done", this._doneCount);
    if (this._doneCount == 2) {
      this._scene.quests[0].done();
    } else {
      this._doneCount++;
    }
  }

  idDone() {
    this._scene.quests[0].done();
  }
}
