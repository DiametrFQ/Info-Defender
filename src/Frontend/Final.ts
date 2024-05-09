import { Game } from "../scenes/Game";
import Init1Level from "../scenes/Levels/Init1Level";
import Init2Level from "../scenes/Levels/Init2Level";
import Init3Level from "../scenes/Levels/Init3Level";
import Init4Level from "../scenes/Levels/Init4Level";
import Button from "./Button";
import Inner from "./Input";
import Levels from "./Levels";

export default class Final {
  private _back: Phaser.GameObjects.Sprite;

  private _nextButton: Button;
  private _menuButton: Button;

  private _activeInput: Inner;
  private x: number = 950;
  private y: number = 850;

  private levels = [Init1Level, Init2Level, Init3Level, Init4Level];

  constructor(readonly scane: Game, readonly _menuBlock: Levels) {}

  init() {
    this._back = this.createBack();
    // this._inputMail = this.createInput(200, "email");
    // this._inputLogin = this.createInput(300, "login");
    // this._inputPassword = this.createInput(400, "pas");
    // this._inputs = [this._inputMail, this._inputLogin, this._inputPassword];
    this._menuButton = this.createButton(this.x - 150, "menu", () => {
      this.destroy();

      this._menuBlock.init();
    });

    this._nextButton = this.createButton(this.x + 150, "next", () => {
      this.levels[this.scane.level](this.scane);
      this.destroy();
    });

    this.scane.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      (event: any) => {
        if (
          !this._activeInput?.active ||
          event.key === "CapsLock" ||
          event.key === "Tab" ||
          event.key === "Shift" ||
          event.key === "Control"
        ) {
          return;
        }
        if (event.key === "Backspace") {
          const text = this._activeInput.text.slice(0, -1);
          this._activeInput.text = text;
          return;
        }
        this._activeInput.text = this._activeInput.text + event.key;
      }
    );
  }

  createBack() {
    const back = this.scane.add.sprite(this.x, 500, "textBlock");
    back.scaleX = 0.35;
    return back;
  }

  createInput(y: number, text: string) {
    const reg = this.scane.add.sprite(this.x, y, "QDORAL"); //this.scane.add.rectangle(this.x, y, ...this.character);
    reg.scale = 0.15;
    reg.scaleY = 0.1;

    const addText = this.scane.add.text(this.x - 25, y - 7, text, {
      color: "black",
    });
    return new Inner(reg, addText);
  }

  createButton(x: number, text: string, func: Function) {
    const reg = this.scane.add
      .sprite(x, this.y, "QDORAL")
      .setInteractive()
      .on("pointerup", func);

    reg.scale = 0.15;
    reg.scaleY = 0.1;

    const UIText = this.scane.add.text(x - 25, this.y - 15, text, {
      color: "black",
      fontSize: "30px",
      fontFamily: "Arial",
    });

    return new Button(reg, UIText);
  }

  destroy() {
    this._back.destroy();
    this._nextButton.destroy();
    this._menuButton.destroy();
    // this._inputMail.destroy();
    // this._inputLogin.destroy();
    // this._inputPassword.destroy();
    // this._buttonSave.destroy();
    // this._buttonReg.destroy();
  }
}
