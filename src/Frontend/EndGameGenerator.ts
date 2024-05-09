import Answer from "../objects/Quests/Answer";
import { Game } from "../scenes/Game";
import Levels from "./Levels";

const endGame = (
  coord: [number, number],
  scene: Game,
  choise: { answer: string },
  description: Phaser.GameObjects.Text,
  beckDescription: Phaser.GameObjects.Sprite,
  answers: Answer[]
) => {
  const endGameBack = scene.add.sprite(coord[0], coord[1] + 300, "DeadBlock");
  endGameBack.displayHeight = 900;
  endGameBack.displayWidth = 600;

  const endGameText = scene.add.text(coord[0] - 150, coord[1], "Конец игры", {
    color: "#38201c",
    fontSize: "50px",
  });

  const endGameDescription = scene.add.text(
    coord[0] - 250,
    coord[1] + 150,
    choise.answer,
    {
      color: "#38201c",
      fontSize: "26px",
    }
  );

  const endGameButton = scene.add.sprite(
    coord[0] + 140,
    coord[1] + 600,
    "textBlock"
  );
  const endGameButtonText = scene.add.text(
    coord[0] + 60,
    coord[1] + 570,
    "МЕНЮ",
    {
      color: "#38201c",
      fontSize: "70px",
    }
  );
  endGameButton.displayHeight = 100;
  endGameButton.displayWidth = 300;
  endGameButton.setInteractive();

  endGameButton.on("pointerup", () => {
    answers.forEach((answer) => answer.destroy());

    description.destroy();
    beckDescription.destroy();

    endGameText.destroy();
    endGameDescription.destroy();
    endGameBack.destroy();
    endGameButton.destroy();
    endGameButtonText.destroy();

    scene.quests.forEach((quest) => quest.destroy());

    new Levels(scene).init();
  });
};

export default endGame;
