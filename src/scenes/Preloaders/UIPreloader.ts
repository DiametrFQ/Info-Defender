import textBlock from "@ui/text_block.png";
import inventory from "@ui/inventory.png";
import possibleAnswer from "@ui/possible_answer.png";
import QDORAL from "@ui/quest_done&active_level.png";
import QATAnaquest from "@ui/Quest&Timer&no_active_quest.png";
import TimerAndQuest from "@ui/Quest&Timer&no_active_quest.png";
import Casino1 from "@ui/casino1.jpg";
import Casino2 from "@ui/casino2.jpg";
import Casino3 from "@ui/casino3.jpg";
import Casino4 from "@ui/casino4.jpg";

export default function PreloadUI(scene: Phaser.Scene) {
  scene.load.image("inventory", inventory);
  scene.load.image("QuestATimerAnoActoveQuest", QATAnaquest);
  scene.load.image("textBlock", textBlock);
  scene.load.image("possibleAnswer", possibleAnswer);
  scene.load.image("QDORAL", QDORAL);
  scene.load.image("TimerAndQuest", TimerAndQuest);

  scene.load.image("Casino1", Casino1);
  scene.load.image("Casino2", Casino2);
  scene.load.image("Casino3", Casino3);
  scene.load.image("Casino4", Casino4);
}
