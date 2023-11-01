import Phaser from "phaser";
import { Game } from "../../scenes/Game";
import Answer from "./Answer";
import Buble from "../Bubles/Bubles";
import InGamesTool from "../InGamesTool";
import Player from "../Player";

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
    (this._coord[0] -= 0),
      (this._coord[1] -= 280),
      (this._description = this._scene.add.text(
        this._coord[0] - 100,
        this._coord[1],
        this._text,
        {
          color: "#38201c",
        }
      ));

    const fooWiFi = () => {
      Answer2.destroy();
      Answer3.destroy();
      Answer4.destroy();
      Answer5.destroy();
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
        new Buble(
          [1150, 800],
          this._scene.physics,
          "buble_wi_fi",
          this._scene.player,
          () => {
            this.wifi.coord = [1150, 800];
            this.Player.buildCheckPos([1350, 450], this.wifi, () => {
              console.log("asdasdasd");

              new Buble(
                [1350, 450],
                this._scene.physics,
                "buble_questions",
                this._scene.player,
                () => {
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
                  const Answer1 = new Answer(
                    this._scene,
                    [this._coord[0], this._coord[1] + 110],
                    `Теперь всё понятно`,
                    () => {
                      Answer1.destroy();
                      this._beckDescription.destroy();
                      this._description.destroy();
                    }
                  );
                  this._scene.quests[2].setSprite("QDORAL");
                }
              ).body.displayHeight = 170;
            });
          }
        );
      });
    };
    const Answer1 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 110],
      `Посмотреть, к какой сети подключен 
компьютер сотрудника 
(Проверить имя сети (SSID))`,
      () => {
        this.setText(`SSID не соответствует корпоративной wi-fi сети`);
        Answer1.setText("То есть...");
        fooWiFi();
      }
    );
    const Answer2 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 220],
      "Получить mac адрес сети",
      () => {
        this.setText(`mac адрес не сходится`);
        Answer1.setText("То есть...");
        fooWiFi();
      }
    );

    const Answer3 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 330],
      "Подключен ли монитор к разетке?",
      () => {
        this.setText(`Обнаружино 2 wi-fi сети с одинаковым названием`);
        Answer1.setText("То есть...");
        fooWiFi();
      }
    );
    const Answer4 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 440],
      "Всё в порядке, ты случайно не заметил",
      () => {
        Answer4.destroy();
        this.setText("Нет, тут точно чтото не твак");
      }
    );
    const Answer5 = new Answer(
      this._scene,
      [this._coord[0], this._coord[1] + 550],
      "Правила фаервола не отрабатывают!",
      () => {
        Answer5.destroy();
        this.setText("Фаервол не виноват!");
      }
    );
  }
  setText(text: string) {
    this._description.text = text;
  }
}
