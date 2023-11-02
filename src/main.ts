import Phaser from "phaser";
import { Game } from "./scenes/Game";
import { Preloader } from "./scenes/Preloader";
import "./style.scss";

export default new Phaser.Game({
  type: Phaser.AUTO,
  parent: "app",
  scene: [Preloader, Game],
  width: 1900,
  height: 1050,
  physics: {
    default: "arcade",
    arcade: {
      //отключить физические границы
      debug: true,
      gravity: { y: 0 },
    },
  },
  scale: {
    zoom: 0.8,
  },
});
