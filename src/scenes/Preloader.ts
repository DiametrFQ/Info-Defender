import Phaser from "phaser";
import Map3 from "../../assets/Map3.json";
import tiles from "@/scene.jpeg";
import IMGPlayer from "@objects/Characters_aseprite.png";

import PreloadGT from "./Preloaders/GameTools";
import PreloadBubles from "./Preloaders/BublePreloader";
import PreloadUI from "./Preloaders/UIPreloader";

export class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    PreloadGT(this);
    PreloadBubles(this);
    PreloadUI(this);

    this.load.image("tiles", tiles);
    this.load.image("IMGPlayer", IMGPlayer);
    this.load.tilemapTiledJSON("map", Map3);
  }

  create() {
    this.scene.start("game");
  }
}
