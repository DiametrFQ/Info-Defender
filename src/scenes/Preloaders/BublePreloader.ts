import buble_HDMI from "@buble/buble_HDMI.png";
import buble_keyboard from "@buble/buble_keyboard.png";
import buble_mon from "@buble/buble_mon.png";
import buble_no_keyboard from "@buble/buble_no_keyboard.png";
import buble_questions from "@buble/buble_questions.png";
import buble_wi_fi from "@buble/buble_wi-fi.png";
import azino from "@buble/Azino.png";
import money2 from "@buble/money2.png";
import papers from "@buble/papers.png";
import virus from "@buble/virus.png";

import comand_injection from "@buble/comand_injection.png";
import owasp2 from "@buble/owasp2.png";
import sql from "@buble/sql.png";
import xss from "@buble/xss.png";

export default function PreloadBubles(scene: Phaser.Scene) {
  scene.load.image("buble_HDMI", buble_HDMI);
  scene.load.image("buble_keyboard", buble_keyboard);
  scene.load.image("buble_no_mon", buble_mon);
  scene.load.image("buble_no_keyboard", buble_no_keyboard);
  scene.load.image("buble_questions", buble_questions);
  scene.load.image("buble_wi_fi", buble_wi_fi);
  scene.load.image("azino", azino);

  scene.load.image("money2", money2);
  scene.load.image("papers", papers);
  scene.load.image("virus", virus);

  scene.load.image("comand_injection", comand_injection);
  scene.load.image("owasp2", owasp2);
  scene.load.image("sql", sql);
  scene.load.image("xss", xss);
}
