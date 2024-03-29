import buble_HDMI from "@buble/buble_HDMI.png";
import buble_keyboard from "@buble/buble_keyboard.png";
import buble_mon from "@buble/buble_mon.png";
import buble_no_keyboard from "@buble/buble_no_keyboard.png";
import buble_questions from "@buble/buble_questions.png";
import buble_wi_fi from "@buble/buble_wi-fi.png";

export default function PreloadBubles(scene: Phaser.Scene) {
  scene.load.image("buble_HDMI", buble_HDMI);
  scene.load.image("buble_keyboard", buble_keyboard);
  scene.load.image("buble_no_mon", buble_mon);
  scene.load.image("buble_no_keyboard", buble_no_keyboard);
  scene.load.image("buble_questions", buble_questions);
  scene.load.image("buble_wi_fi", buble_wi_fi);
}
