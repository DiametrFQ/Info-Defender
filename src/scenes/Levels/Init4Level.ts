import Buble from "../../objects/Bubles/Bubles";
import Quest from "../../objects/Quests/Quest";
import Quest4_1 from "../../objects/Quests/Quest4_1";
import { Game } from "../Game";

export default function Init4Level(Scene: Game) {
  let countDone = { count: 0 };
  Scene.bubles.push(
    new Buble(
      "comand_injection",
      [1110, 450],
      Scene.physics,
      Scene.player,
      () => {
        new Quest4_1(
          [560, 500],
          Scene,
          `Проверь сервис по проверке соединения, который\n принимает на вход ip.\n Что напишешь в строку с ip?`,
          "asdasd",
          0,
          countDone
        );
      }
    ),
    new Buble("sql", [920, 490], Scene.physics, Scene.player, () => {
      new Quest4_1(
        [560, 500],
        Scene,
        `Проверь веб сервис на устойчивость к SQL вставкам.\n Что допишешь в адрес?`,
        "asdasd",
        1,
        countDone
      );
    }),
    new Buble("xss", [1220, 490], Scene.physics, Scene.player, () => {
      new Quest4_1(
        [560, 500],
        Scene,
        `Проверь веб сервис на устойчивость к XSS вставкам.\n Что допишешь в адрес?`,
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
      "Пентест",
      "Проведи тестирование\n на проникновение\n (пентест) нашего\n сайта"
    ),
  ];
}
