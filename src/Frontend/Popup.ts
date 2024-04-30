import { Game } from "../scenes/Game";
import Background from "./Background";
export default class Popup extends Background {
  constructor(
    readonly scene: Game, // readonly text: Phaser.GameObjects.Text,
    readonly sprite: string
  ) {
    super(scene, sprite);
  }

  override init() {
    this.background = this.scene.add.sprite(940, 540, this.sprite);
    this.background.scale = 0.8;
    this.background.setInteractive();
    this.background.on("pointerup", () => {
      this.destroy();
    });
  }
}
