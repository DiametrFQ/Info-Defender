import Phaser from "phaser";
import Player from "../objects/Player";
import InGamesTool from "../objects/InGamesTool";
import Timer from "../objects/Timer";
import GameMap from "../objects/GameMap";
import Inventory from "../objects/Inventory";
import Registaration from "../Frontend/Registaration";
import Buble from "../objects/Bubles/Bubles";
import Quest from "../objects/Quests/Quest";
import Question2 from "../objects/Quests/Question2";
import Question3 from "../objects/Quests/Quations3";
import Levels from "../Frontend/Levels";

export class Game extends Phaser.Scene {
  // private reg: Registaration;
  private map: GameMap;
  public player: Player; //Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private timer: Timer;
  // private tools: InGamesTool[];
  private bubles: Buble[];
  public quests: Quest[];

  constructor() {
    super("game");
  }

  create() {
    this.map = new GameMap(this.make.tilemap({ key: "map" }));
    this.player = new Player(this.physics, new Inventory());
    this.map.setCollide(this.physics, this.player);

    const keyboard = new InGamesTool(
      "keyboard",
      [-100, -100],
      this.physics,
      this.add.text(-110, -110, "wifi1"),
      this.input,
      this.player
    );

    this.bubles = [
      new Buble(
        "buble_no_keyboard",
        [750, 750],
        this.physics,
        this.player,
        () => {
          new Buble(
            "buble_keyboard",
            [1490, 550],
            this.physics,
            this.player,
            () => {
              new Buble(
                "buble_no_keyboard",
                [750, 750],
                this.physics,
                this.player,
                () => {
                  this.quests[1].setSprite("QDORAL");
                }
              ).buildRemoveFromInventoryTool(keyboard);
            }
          ).buildAddInInventoryTool(keyboard);

          new Buble(
            "buble_HDMI",
            [1470, 650],
            this.physics,
            this.player,
            () => {}
          );
        }
      ),
      new Buble(
        "buble_questions",
        [910, 520],
        this.physics,
        this.player,
        () => {
          new Question3(
            [760, 500],
            this,
            `Сотрудник:"С приходом электриков,\n у меня компьютер стал жить своей жизнью"`,
            "asdasd",
            new InGamesTool(
              "wifi1",
              [-110, -110],
              this.physics,
              this.add.text(1110, 1110, "wifi1"),
              this.input,
              this.player
            ),
            this.player
          );
        }
      ),
    ];
    this.bubles.push(
      new Buble("buble_no_mon", [1110, 450], this.physics, this.player, () => {
        new Question2(
          [560, 500],
          this,
          `Сотрудник: "Вчера всё работало,\n а сегодня монитор не загорается"`,
          "asdasd",
          new InGamesTool(
            "HDM",
            [-100, -100],
            this.physics,
            this.add.text(-110, -110, "HDM"),
            this.input,
            this.player
          )
        );
      })
    );

    this.quests = [
      new Quest(
        [100, 200],
        this,
        "Мониторы",
        "У сотрудника не работает монитор.\n Разберись с этим"
      ),
      new Quest(
        [100, 350],
        this,
        "Клавиатура",
        "Программист сломал клавиатуру\n в порыве ярости. \n Принеси ему новую"
      ),
      new Quest(
        [100, 500],
        this,
        "Атака?",
        "На компьютере сотрудника стали\n открываться приложения\n без его ведома.\n Проверь что там"
      ),
    ];
    new Levels(this);
    new Registaration(this);

    const startSeconds = 1;
    this.timer = new Timer(
      startSeconds,
      this.add.text(0, 0, `Прошло ${startSeconds} секунд`)
    );
    this.timer.setInterval(this.player);

    this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      this.player.pointerup(pointer, this.timer.getSeconds);
    });

    // this.input.on('pointermove', (pointer: Phaser.Input.Pointer) =>{
    //     if(this.gaykey.inHand){
    //         this.gaykey.sprite.setVisible(true).copyPosition(pointer)
    //     }
    // });
  }
  update() {
    this.map.ground.active.valueOf();

    this.player.stay();
    this.player.checkPos();
  }
}
