import { Game } from "../../../../scenes/Game";

export default class Comparable {
  private inHand = false;
  private sprite: Phaser.GameObjects.Sprite;
  textSprite: Phaser.GameObjects.Text;

  //   private rightCoordTargets: [number, number][] = [
  //     [600, 200],
  //     [600, 400],
  //     [600, 600],
  //   ];
  //   private leftCoordTargets: [number, number][] = [
  //     [1200, 200],
  //     [1200, 400],
  //     [1200, 600],
  //   ];

  constructor(
    private scene: Game,
    coord: [number, number],
    private coordTargets: [number, number][],
    text: string
  ) {
    this.sprite = this.scene.add
      .sprite(coord[0], coord[1], "possibleAnswer")
      .setInteractive()
      .on("pointerup", () => {
        if (!this.inHand) {
          this.scene.input.on(
            "pointermove",
            (pointer: Phaser.Input.Pointer) => {
              this.sprite.setVisible(true).copyPosition(pointer);
              this.textSprite.setVisible(true).copyPosition({
                x: pointer.x - 170,
                y: pointer.y - 54,
              });
            }
          );
        } else {
          this.scene.input.off("pointermove");
          this.changeCoords(this.findClosestCoordinates());
          console.log(this.getY());
        }
        this.inHand = !this.inHand;
      });

    this.sprite.scale = 0.5;
    this.sprite.scaleX = 0.25;
    this.sprite.scaleY = 0.45;

    this.textSprite = this.scene.add.text(coord[0] - 170, coord[1] - 54, text, {
      color: "#38201c",
    });
  }

  destroy() {
    this.sprite.destroy();
    this.textSprite.destroy();
  }

  findClosestCoordinates(): [number, number] {
    const x = this.sprite.x;
    const y = this.sprite.y;

    let closestDistanceSquared = Infinity; // Начальное значение бесконечность
    let closestCoordinate: [number, number] = [x, y];

    for (const coord of this.coordTargets) {
      const [coordX, coordY] = coord;
      // Вычисляем квадрат расстояния между текущей координатой и заданными координатами
      const distanceSquared = (coordX - x) ** 2 + (coordY - y) ** 2;
      // Если текущее расстояние меньше предыдущего наименьшего, обновляем ближайшую координату и расстояние
      if (distanceSquared < closestDistanceSquared) {
        closestDistanceSquared = distanceSquared;
        closestCoordinate = coord;
      }
    }

    return closestCoordinate;
  }

  changeCoords(coord: [x: number, y: number]) {
    const [x, y] = coord;
    this.sprite.x = x;
    this.sprite.y = y;

    this.textSprite.x = x - 170;
    this.textSprite.y = y - 54;
  }

  getY() {
    return this.sprite.y;
  }
}
