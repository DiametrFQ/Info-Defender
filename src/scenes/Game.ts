import Phaser from 'phaser';
import Player from '../objects/Player';
import InGamesTool from '../objects/InGamesTool';
import Timer from '../objects/Timer';
import GameMap from '../objects/GameMap';
import Inventory from '../objects/Inventory';

export class Game extends Phaser.Scene{
    
    private map: GameMap;
    private player: Player;//Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private timer: Timer;
    private tools: InGamesTool[];

    constructor(){
        super("game");
    }

    create(){
        console.log(this.input)
        // this.input = new Hand(this);
        // console.log(this.input)

        this.map = new GameMap(this.make.tilemap({key: "fuck"}));
        this.map.ground.setInteractive();

        this.player = new Player(
            this.physics,
            new Inventory(),
        );

        this.map.setCollide(this.physics, this.player,);
        this.player.position(this.map.coord,);

        this.tools = [
            new InGamesTool([400, 300], this.physics, 'gaykey', this.add.text(0,0, ``), this.input, this.player,),
            new InGamesTool([400, 250], this.physics, 'gaykey', this.add.text(0,0, ``), this.input, this.player,),
            new InGamesTool([500, 300], this.physics, 'wire', this.add.text(0,0, ``), this.input, this.player,),
        ]
        this.tools.push(
            new InGamesTool([600, 300], this.physics, 'wire', this.add.text(0,0, ``), this.input, this.player,)
        )
        const startSeconds = 100;
        this.timer = new Timer(startSeconds, this.add.text(0,0, `Осталось ${startSeconds} секунд`));
        this.timer.setInterval(this.player);
        
        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            this.player.pointerup(pointer, this.timer.getSeconds)
        });

        // this.input.on('pointermove', (pointer: Phaser.Input.Pointer) =>{
        //     if(this.gaykey.inHand){
        //         this.gaykey.sprite.setVisible(true).copyPosition(pointer)
        //     }
        // });
    }   
    update(){
        this.map.ground.active.valueOf();

        this.player.stay();
    }
}