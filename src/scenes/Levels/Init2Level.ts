import Buble from "../../objects/Bubles/Bubles";
import Quest from "../../objects/Quests/Quest";
import Quest2_1 from "../../objects/Quests/Quest2_1";
import { Game } from "../Game";

export default function Init2Level(Scene: Game) {
  Scene.bubles.push(
    new Buble("buble_no_mon", [1110, 450], Scene.physics, Scene.player, () => {
      new Quest2_1(
        [560, 500],
        Scene,
        `Сотрудник: "Вчера всё работало,\n а сегодня монитор не загорается"`,
        "asdasd"
      );
    })
  );

  Scene.quests = [
    new Quest(
      [100, 200],
      Scene,
      "Мониторы",
      " У сотрудников при включени\n компьютера появляются\n баннеры с казино рулетками.\n Решите эту проблему"
    ),
  ];
}
