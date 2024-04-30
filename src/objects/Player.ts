import InGamesTool from "./InGamesTool";
import Inventory from "./Inventory";

export default class Player {
  private stopCoord = { x: 0, y: 0 };
  readonly body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private check = false;
  private checkCoord: [number, number];
  private checkTool: InGamesTool;
  private afterChecking: Function;

  constructor(
    private _physics: Phaser.Physics.Arcade.ArcadePhysics,
    readonly invenrory: Inventory
  ) {
    this.body = this._physics.add
      .sprite(800, 600, "IMGPlayer")
      .setInteractive();
    this.body.displayWidth = 50;
    this.body.displayHeight = 100;
    this.body.scale += 1.2;

    // this.invenrory = new Inventory(this.add);
  }

  private outOfBounds(pointer: Phaser.Input.Pointer): Boolean {
    return (
      pointer.leftButtonReleased() &&
      -pointer.x / 2 + 877.5 < pointer.y &&
      -pointer.x / 2 + 1471.5 > pointer.y &&
      pointer.y * 2 + 174.5 > pointer.x &&
      pointer.y * 2 - 1009.5 < pointer.x
    );

    // Вставить в главный класс Game для проверки границ
    //
    // const graphics = this.add.graphics()
    // const bord = [174.5, -1009.5, 877.5, 1471.5]
    // for (let j = 0; j < bord.length; j++) {
    //     graphics.lineStyle(5, 0x0000FF, 1.0);
    //     graphics.beginPath();
    //     graphics.moveTo(500,300);
    //     if(j < 2){
    //         for(let i = 0 ; i <= 700; i++){
    //             graphics.lineTo(i*2+bord[j], i)
    //         }
    //     }
    //     else{
    //         for(let i = 700 ; i >= 0; i--){
    //             graphics.lineTo(i*2, bord[j]-i)
    //         }
    //     }
    //     graphics.closePath();
    //     graphics.strokePath();
    // }
  }

  pointerup(pointer: Phaser.Input.Pointer, condition = true) {
    if (this.outOfBounds(pointer) && condition) {
      this.stopCoord = {
        x: pointer.x,
        y: pointer.y,
      };
      this.body.setVelocityX(-(this.body.x - pointer.x));
      this.body.setVelocityY(-(this.body.y - pointer.y));
    }
  }

  stay() {
    if (
      Math.floor(this.body.x) == Math.floor(this.stopCoord.x) &&
      Math.floor(this.body.y) == Math.floor(this.stopCoord.y)
    ) {
      this.body.setVelocity(0);
    }
  }

  position(coord: number[]) {
    this.body.setPosition(coord[0], coord[1] + 610);
  }

  buildCheckPos(
    checkCoord: [number, number],
    Tool: InGamesTool,
    afterChecking: Function
  ) {
    this.check = true;
    this.checkCoord = checkCoord;
    this.checkTool = Tool;
    this.afterChecking = afterChecking;
  }

  checkPos() {
    if (this.check) {
      const maxX = Math.max(this.body.x, this.checkCoord[0]);
      const minX = Math.min(this.body.x, this.checkCoord[0]);

      const maxY = Math.max(this.body.y, this.checkCoord[1]);
      const minY = Math.min(this.body.y, this.checkCoord[1]);

      const res = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2);
      if (res < 500) {
        this.checkTool.setSprite("wifi1");
      }
      if (res < 400) {
        this.checkTool.setSprite("wifi2");
      }
      if (res < 300) {
        this.checkTool.setSprite("wifi3");
      }
      if (res < 200) {
        this.checkTool.setSprite("wifi4");
      }
      if (res < 150) {
        this.afterChecking();
        this.check = false;
      }
    }
  }

  getPosition(): [number, number] {
    return [this.body.x, this.body.y];
  }
}
