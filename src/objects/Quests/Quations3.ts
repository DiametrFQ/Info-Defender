import Phaser from "phaser";
import { Game } from "../../scenes/Game";
import Answer from "./Answer";
import Buble from "../Bubles/Bubles";
import InGamesTool from "../InGamesTool";
import Player from "../Player";
import AnswersJSON from "./choises.json";

export default class Question3 {
  public _description: Phaser.GameObjects.Text;
  public _beckDescription: Phaser.GameObjects.Sprite;
  constructor(
    private _coord: [number, number],
    private _scene: Game,
    readonly _text: string,
    readonly _textDescription: string,
    readonly wifi: InGamesTool,
    private Player: Player
  ) {
    this._beckDescription = this._scene.add.sprite(...this._coord, "textBlock");
    this._beckDescription.displayHeight = 900;
    this._beckDescription.displayWidth = 600;

    this._coord[1] -= 280;

    this._description = this._scene.add.text(
      this._coord[0] - 200,
      this._coord[1],
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

    const fooWiFi = () => {
      answers.slice(1).forEach((ans) => ans.destroy());
      const Answer1 = answers[0];

      Answer1.setFunc(() => {
        this.setText(
          "Обнаружена поддельная wi-fi точка,\n осмотри офис и замерить уровень сигнала,\n чтобы найти точку раздачи!"
        );
        Answer1.setText("То есть...");
        Answer1.setFunc(() => {
          this._beckDescription.destroy();
          this._description.destroy();
          Answer1.destroy();
        });
        const afterDeathBubleWifi = () => {
          this.Player.buildCheckPos([1350, 450], this.wifi, () => {
            const afterDeathBubleQuestions = () => {
              this._beckDescription = this._scene.add.sprite(
                ...this._coord,
                "textBlock"
              );
              this._beckDescription.displayHeight = 500;
              this._beckDescription.displayWidth = 600;
              this._description = this._scene.add.text(
                this._coord[0] - 280,
                this._coord[1] - 200,
                `Электрики решил провести атаку с использованием подменной 
Wi-Fi сети. Они создал фальшивую точку доступа с 
названием нашей корпоративной Wi-Fi сети и скопировали 
окно авторизации. Сотрудники, не подозревая ничего,
подключались к этой сети и вводили свои логины и 
пароли для доступа к сети. 
Злоумышленники получали доступ к логинам и паролям
сотрудников и собрали информацию о том, какие
ресурсы они используют и какие данные хранят в 
системе. Но вы успели предотвратить 
утечку данных. Отличная работа!`,
                {
                  color: "#38201c",
                }
              );

              const ex = () => {
                Answer1.destroy();
                this._beckDescription.destroy();
                this._description.destroy();
              };

              const Answer1 = new Answer(
                this._scene,
                [this._coord[0], this._coord[1] + 110],
                `Теперь всё понятно`,
                ex
              );
              this._scene.quests[2].setSprite("QDORAL");
            };

            const buble = new Buble(
              "buble_questions",
              [1350, 450],
              this._scene.physics,
              this._scene.player,
              afterDeathBubleQuestions
            );
            buble.buildRemoveFromInventoryTool(this.wifi);
            buble.body.displayHeight = 170;
            buble.body.displayWidth = 170;
          });
        };

        new Buble(
          "buble_wi_fi",
          [1150, 800],
          this._scene.physics,
          this._scene.player,
          afterDeathBubleWifi
        ).buildAddInInventoryTool(this.wifi);
      });
    };

    let count = 1;

    for (const key1 in AnswersJSON) {
      const key1Typed = key1 as "goodChoises" | "badChoises";
      const choises = AnswersJSON[key1Typed];

      for (const key2 in choises) {
        const choise = choises[key2];

        const consequences = () => {
          this.setText(choise.answer);
          if (key1 == "goodChoises") {
            answers[0].setText("То есть...");
            fooWiFi();
          } else answer.destroy();
        };

        const answer = new Answer(
          this._scene,
          [this._coord[0], this._coord[1] + 110 * count],
          choise.choise,
          consequences
        );

        answers.push(answer);
        count++;
      }
    }
  }
}
