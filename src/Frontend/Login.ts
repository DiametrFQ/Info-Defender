import { Game } from "../scenes/Game";
import Button from "./Button";
import Inner from "./Input";
import Levels from "./Levels";
import Registaration from "./Registaration";

export default class Login {
  readonly _back;
  readonly _inputLogin;
  readonly _inputPassword;
  readonly _inputs;
  private _activeInput: Inner;
  private x: number = 950;
  // private character: [number, number, number] = [200, 50, 0x000000];

  readonly _buttonSave;
  readonly _buttonReg;

  constructor(readonly scane: Game) {
    this._back = this.createBack();
    this._inputLogin = this.createInput(300, "login");
    this._inputPassword = this.createInput(400, "pas");
    this._inputs = [this._inputLogin, this._inputPassword];

    this._buttonSave = this.createButton(500, "segn in", () => {
      this.destroy();
      new Levels(this.scane).init();
    });
    this._buttonReg = this.createButton(600, "registration", () => {
      this.destroy();
      new Registaration(this.scane);
    });

    this.scane.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      (event: any) => {
        for (const input of this._inputs) {
          if (!input._active) {
            continue;
          }
          if (!(this._activeInput === input)) {
            this._activeInput?.setActive(false);
            this._activeInput = input;
          }
        }
        if (
          !this._activeInput?._active ||
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
    return this.scane.add.sprite(this.x, 500, "BackMenuLogin");
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

  createButton(y: number, text: string, func: Function) {
    const reg = this.scane.add
      .sprite(this.x, y, "QDORAL")
      .setInteractive()
      .on("pointerup", func);

    reg.scale = 0.15;
    reg.scaleY = 0.1;

    const addText = this.scane.add.text(this.x - 25, y, text, {
      color: "black",
    });

    return new Button(reg, addText);
  }

  destroy() {
    this._back.destroy();
    this._inputLogin.destroy();
    this._inputPassword.destroy();
    this._buttonSave.destroy();
    this._buttonReg.destroy();
  }
}
