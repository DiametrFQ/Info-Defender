import { Game } from "../../scenes/Game";
import Button from "./Button";
import Inner from "./Input";

export default class Registaration {
  readonly _back;
  readonly _inputMail;
  readonly _inputLogin;
  readonly _inputPassword;
  readonly _inputs;
  private _activeInput: Inner;

  readonly _buttonSave;
  readonly _buttonReg;

  constructor(
    readonly scane: Game // readonly text: Phaser.GameObjects.Text,
  ) {
    this._back = this.createBack();
    this._inputMail = this.createInput(200, "email");
    this._inputLogin = this.createInput(300, "login");
    this._inputPassword = this.createInput(400, "pas");
    this._inputs = [this._inputMail, this._inputLogin, this._inputPassword];
    this._buttonSave = this.createButton(500, "log", () => {
      this.destroy();
    });
    this._buttonReg = this.createButton(600, "pas", () => {
      this.destroy();
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
    return this.scane.add.rectangle(500, 350, 900, 600, 0x00ff00);
  }

  createInput(y: number, text: string) {
    const reg = this.scane.add.rectangle(500, y, 200, 50, 0x000000);

    const addText = this.scane.add.text(420, y - 10, text);
    return new Inner(reg, addText);
  }

  createButton(y: number, text: string, func: Function) {
    const reg = this.scane.add
      .rectangle(500, y, 200, 50, 0xff0000)
      .setInteractive()
      .on("pointerup", func);

    const addText = this.scane.add.text(420, y - 10, text);

    return new Button(reg, addText);
  }

  destroy() {
    this._back.destroy();
    this._inputMail.destroy();
    this._inputLogin.destroy();
    this._inputPassword.destroy();
    this._buttonSave.destroy();
    this._buttonReg.destroy();
  }
}
