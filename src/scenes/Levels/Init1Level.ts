import Popup from "../../Frontend/Popup";
import Buble from "../../objects/Bubles/Bubles";
import InGamesTool from "../../objects/InGamesTool";
import Question3 from "../../objects/Quests/Quations3";
import Quest from "../../objects/Quests/Quest";
import Question2 from "../../objects/Quests/Question2";
import { Game } from "../Game";

export default function Init1Level(Scene: Game) {
  const keyboard = new InGamesTool(
    "keyboard",
    [-100, -100],
    Scene.physics,
    Scene.add.text(-110, -110, "wifi1"),
    Scene.input,
    Scene.player
  );
  Scene.bubles.push(
    new Buble(
      "buble_no_keyboard",
      [750, 750],
      Scene.physics,
      Scene.player,
      () => {
        new Buble(
          "buble_keyboard",
          [1490, 550],
          Scene.physics,
          Scene.player,
          () => {
            new Buble(
              "buble_no_keyboard",
              [750, 750],
              Scene.physics,
              Scene.player,
              () => {
                new Popup(Scene, "GoodPlace").init();
                Scene.quests[1].done();
              }
            ).buildRemoveFromInventoryTool(keyboard);
          }
        ).buildAddInInventoryTool(keyboard);
        new Popup(Scene, "BadPlace").init();
      }
    )
  );
  Scene.bubles.push(
    new Buble(
      "buble_questions",
      [910, 520],
      Scene.physics,
      Scene.player,
      () => {
        new Question3(
          [760, 500],
          Scene,
          `Сотрудник:"С приходом электриков,\n у меня компьютер стал жить своей жизнью"`,
          "asdasd",
          new InGamesTool(
            "wifi1",
            [-110, -110],
            Scene.physics,
            Scene.add.text(1110, 1110, "wifi1"),
            Scene.input,
            Scene.player
          ),
          Scene.player
        );
      }
    )
  );
  Scene.bubles.push(
    new Buble("buble_no_mon", [1110, 450], Scene.physics, Scene.player, () => {
      new Question2(
        [560, 500],
        Scene,
        `Сотрудник: "Вчера всё работало,\n а сегодня монитор не загорается"`,
        "asdasd",
        new InGamesTool(
          "HDM",
          [-100, -100],
          Scene.physics,
          Scene.add.text(-110, -110, "HDM"),
          Scene.input,
          Scene.player
        )
      );
    })
  );
  Scene.quests = [
    new Quest(
      [100, 200],
      Scene,
      "Мониторы",
      "У сотрудника не работает монитор.\n Разберись с этим"
    ),
    new Quest(
      [100, 350],
      Scene,
      "Клавиатура",
      "Программист сломал клавиатуру\n в порыве ярости. \n Принеси ему новую"
    ),
    new Quest(
      [100, 500],
      Scene,
      "Атака?",
      "На компьютере сотрудника стали\n открываться приложения\n без его ведома.\n Проверь что там"
    ),
  ];
}
