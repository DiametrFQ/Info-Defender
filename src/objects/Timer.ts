import Player from "./Player";

export default class Timer{

    constructor(
        private _seconds: number,
        readonly text: Phaser.GameObjects.Text,
    ){}

    public set setSeconds(newSeconds: number){
        this._seconds = newSeconds
    }

    public get getSeconds(){
        return this._seconds;
    }

    setInterval(player: Player){
        const timer = setInterval(() => {
            this._seconds--
            this.text.text = `Осталось ${this._seconds} секунд`
            if(!this._seconds){
                clearInterval(timer)
                player.body.setVelocity(0)
            }
        }, 1000)
    }
}