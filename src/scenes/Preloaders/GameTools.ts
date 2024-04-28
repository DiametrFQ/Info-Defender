import wifi1 from "@gameTools/wi-fi1.png";
import wifi2 from "@gameTools/wi-fi2.png";
import wifi3 from "@gameTools/wi-fi3.png";
import wifi4 from "@gameTools/wi-fi4.png";
import keyboard from "@gameTools/keyboard_in_inventory.png";
import HDM from "@gameTools/HDM_in_inventory.png";

export default function PreloadGT(scene: Phaser.Scene) {
  scene.load.image("wifi1", wifi1);
  scene.load.image("wifi2", wifi2);
  scene.load.image("wifi3", wifi3);
  scene.load.image("wifi4", wifi4);
  scene.load.image("keyboard", keyboard);
  scene.load.image("HDM", HDM);
}
