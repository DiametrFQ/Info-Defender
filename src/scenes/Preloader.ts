import Phaser from "phaser";
import wire from "@/wire.png";
import gaykey from "@/gaykey.png";
import Map3 from "../../assets/Map3.json";
import tiles from "@/scene.jpeg";
import IMGPlayer from "@objects/Characters_aseprite.png";
import buble_HDMI from "@objects/buble_HDMI.png";
import buble_keyboard from "@objects/buble_keyboard.png";
import buble_mon from "@objects/buble_mon.png";
import buble_no_keyboard from "@objects/buble_no_keyboard.png";
import buble_questions from "@objects/buble_questions.png";
import buble_wi_fi from "@objects/buble_wi-fi.png";
import HDM_in_inventory from "@objects/HDM_in_inventory.png";
import inventory from "@objects/inventory.png";
import possible_answer from "@objects/possible_answer.png";
import QATAnaquest from "@objects/Quest&Timer&no_active_quest.png";
import textBlock from "@objects/text_block.png";
import possibleAnswer from "@objects/possible_answer.png";
import QDORAL from "@objects/quest_done&active_level.png";

export class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("wire", wire);
    this.load.image("gaykey", gaykey);
    this.load.image("tiles", tiles);
    this.load.image("buble_HDMI", buble_HDMI);
    this.load.image("buble_keyboard", buble_keyboard);
    this.load.image("buble_no_mon", buble_mon);
    this.load.image("buble_no_keyboard", buble_no_keyboard);
    this.load.image("buble_questions", buble_questions);
    this.load.image("buble_wi_fi", buble_wi_fi);
    this.load.image("HDM_in_inventory", HDM_in_inventory);
    this.load.image("inventory", inventory);
    this.load.image("possible_answer", possible_answer);
    this.load.image("IMGPlayer", IMGPlayer);
    this.load.image("QuestATimerAnoActoveQuest", QATAnaquest);
    this.load.image("textBlock", textBlock);
    this.load.image("possibleAnswer", possibleAnswer);
    this.load.image("QDORAL", QDORAL);

    this.load.tilemapTiledJSON("map", Map3);
  }

  create() {
    this.scene.start("game");
  }
}
