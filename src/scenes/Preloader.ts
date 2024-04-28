import Phaser from "phaser";
import Map3 from "../../assets/Map3.json";
import tiles from "@/scene.jpeg";
import IMGPlayer from "@objects/Characters_aseprite.png";

import PreloadBubles from "./Preloaders/BublePreloader";
import PreloadUI from "./Preloaders/UIPreloader";

import wifi1 from "@gameTools/wi-fi1.png";
import wifi2 from "@gameTools/wi-fi2.png";
import wifi3 from "@gameTools/wi-fi3.png";
import wifi4 from "@gameTools/wi-fi4.png";
import keyboard from "@gameTools/keyboard_in_inventory.png";
import HDM from "@gameTools/HDM_in_inventory.png";

export class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("wifi1", wifi1);
    this.load.image("wifi2", wifi2);
    this.load.image("wifi3", wifi3);
    this.load.image("wifi4", wifi4);
    this.load.image("keyboard", keyboard);
    this.load.image("HDM", HDM);
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
