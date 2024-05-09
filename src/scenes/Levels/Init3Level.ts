import Buble from "../../objects/Bubles/Bubles";
import Quest from "../../objects/Quests/Quest";
import Quest3_1 from "../../objects/Quests/Quest3_1";
import { Game } from "../Game";

export default function Init3Level(Scene: Game) {
  let countDone = { count: 0 };
  Scene.bubles.push(
    new Buble("money2", [1110, 450], Scene.physics, Scene.player, () => {
      new Quest3_1(
        [560, 500],
        Scene,
        `Сотрудник получил фишинговое\n письмо на рабочую почту, но\n проходящий мимо сотрудник\n помог сберечь данные карты.\n Настрой антиспам систему, что\n бы такого больше не было"`,
        "asdasd",
        0,
        countDone
      );
    }),
    new Buble("virus", [920, 490], Scene.physics, Scene.player, () => {
      new Quest3_1(
        [560, 500],
        Scene,
        `Сотрудник получил на\n почту архив, а он оказался\n с вирусом. Разберись с этим`,
        "asdasd",
        1,
        countDone
      );
    }),
    new Buble("papers", [1220, 490], Scene.physics, Scene.player, () => {
      new Quest3_1(
        [560, 500],
        Scene,
        `Мы передаём файлы друг-другу через флеши,\nдля безопасности, а возможно ли настроить\nзащищённый документооборот?`,
        "asdasd",
        2,
        countDone
      );
    })
  );

  Scene.quests = [
    new Quest(
      [100, 200],
      Scene,
      "Проблемные \nсотрудники",
      "Сотрудники жалуются. \nОпроси их и реши проблемы"
    ),
  ];
}
