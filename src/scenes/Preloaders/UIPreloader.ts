import textBlock from "@ui/text_block.png";
import inventory from "@ui/inventory.png";
import possibleAnswer from "@ui/possible_answer.png";
import QDORAL from "@ui/quest_done&active_level.png";
import QATAnaquest from "@ui/Quest&Timer&no_active_quest.png";
import TimerAndQuest from "@ui/Quest&Timer&no_active_quest.png";

export default function PreloadUI(scene: Phaser.Scene) {
  scene.load.image("inventory", inventory);
  scene.load.image("QuestATimerAnoActoveQuest", QATAnaquest);
  scene.load.image("textBlock", textBlock);
  scene.load.image("possibleAnswer", possibleAnswer);
  scene.load.image("QDORAL", QDORAL);
  scene.load.image("TimerAndQuest", TimerAndQuest);
}
