import Phaser from "phaser";
import Player from "../objects/Player";
import Timer from "../objects/Timer";
import GameMap from "../objects/GameMap";
import Inventory from "../objects/Inventory";
import Buble from "../objects/Bubles/Bubles";
import Quest from "../objects/Quests/Quest";
import Levels from "../Frontend/Levels";
import Final from "../Frontend/Final";
import Login from "../Frontend/Login";

export class Game extends Phaser.Scene {
  // private reg: Registaration;
  public levelNow: number;

  private map: GameMap;
  public player: Player; //Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private timer: Timer;
  // private tools: InGamesTool[];
  public bubles: Buble[] = [];
  public quests: Quest[] = [];
  public level: number;

  constructor() {
    super("game");
  }

  create() {
    this.map = new GameMap(this.make.tilemap({ key: "map" }));
    this.player = new Player(this.physics, new Inventory());
    this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      this.player.pointerup(pointer, !!this.timer.getSeconds);
    });

    this.map.setCollide(this.physics, this.player);

    const startSeconds = 1;
    this.timer = new Timer(
      startSeconds,
      this.add.text(0, 0, `Прошло ${startSeconds} секунд`)
    );
    this.timer.setInterval(this.player);

    new Login(this);
  }

  update() {
    this.map.ground.active.valueOf();

    this.player.stay();
    this.player.checkPos();

    this.nextLevel();
  }

  levelIsDone() {
    return this.quests.length > 0 && this.quests.every((quest) => quest.isDone);
  }

  nextLevel() {
    if (this.levelIsDone()) {
      this.quests.forEach((quest) => quest.destroy());
      new Final(this, new Levels(this)).init();

      this.quests.length = 0;

      this.player.setPosition(400, 700);
    }
  }
}
