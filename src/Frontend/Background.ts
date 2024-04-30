import { Game } from "../scenes/Game";
export default class Background {
  protected background: Phaser.GameObjects.Sprite;
  constructor(
    readonly scene: Game, // readonly text: Phaser.GameObjects.Text,
    readonly sprite: string
  ) {}

  init() {
    this.background = this.scene.add.sprite(940, 540, this.sprite);
    this.background.scale = 0.8;
  }

  destroy() {
    this.background.destroy();
  }
}
