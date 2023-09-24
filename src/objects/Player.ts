import Inventory from "./Inventory";

export default class Player {
  private stopCoord = { x: 0, y: 0 };
  readonly body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(
    private _physics: Phaser.Physics.Arcade.ArcadePhysics,
    readonly invenrory: Inventory
  ) {
    this.body = this._physics.add
      .sprite(800, 600, "IMGPlayer")
      .setInteractive();
    this.body.displayWidth = 50;
    this.body.displayHeight = 100;

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
    // const bord = [134.5, -479.5, 437.5, 741.5]
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

  pointerup(pointer: Phaser.Input.Pointer, seconds: number) {
    if (this.outOfBounds(pointer) && seconds) {
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
}
