import Phaser from 'phaser'

export class Game extends Phaser.Scene{

    private map: Phaser.Tilemaps.Tilemap;
    private walls: Phaser.Tilemaps.TilemapLayer;
    private stena: Phaser.Tilemaps.TilemapLayer;
    private ground: Phaser.Tilemaps.TilemapLayer;
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private tileSet: Phaser.Tilemaps.Tileset;
    //private check: Phaser.Physics.Arcade.Collider;
    private timer: number;
    private seconds: number;
    private textTimer: Phaser.GameObjects.Text;

    constructor(){
        super("game")
    }

    //preloag(){}

    create(){
        this.map = this.make.tilemap({key: "fuck"});
        this.tileSet = this.map.addTilesetImage('IsoTales', 'tiles');
        const coord = [500, 100];
        this.ground = this.map.createLayer('Слой тайлов 1', this.tileSet).setPosition(...coord);
        this.walls = this.map.createLayer('Walls', this.tileSet).setPosition(...coord);
        this.stena = this.map.createLayer('stena', this.tileSet).setPosition(...coord);

        this.player = this.physics.add.sprite(100,110,"player")
        this.player.setPosition(coord[0], coord[1]+210)

        this.walls.setCollisionByProperty({collides: true})
        this.walls.setCollisionBetween(0,10000)

        this.stena.setCollisionByProperty({collides: true})
        this.stena.setCollisionBetween(0,10000)

        this.physics.add.collider(this.player, [this.walls, this.stena], ()=>{
            console.log('asbyr')
            this.player.setVelocityY(0)
            this.player.setVelocityX(0)
        })

        this.seconds = 1000
        this.textTimer = this.add.text(0,0, `Осталось ${this.seconds} секунд`);

        this.timer = setInterval(() => 
        {
            this.seconds--
            this.textTimer.text = `Осталось ${this.seconds} секунд`
            if(!this.seconds){
                clearInterval(this.timer)
                this.player.setVelocityY(0)
                this.player.setVelocityX(0)
            }
        },
        1000)

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) =>
        {
            if (pointer.leftButtonReleased() && this.seconds)
            {
                this.player.setVelocityX(-(this.player.x - pointer.x))
                this.player.setVelocityY(-(this.player.y - pointer.y))
            }
        });
    }

    update(){
        this.ground.active.valueOf()
        // if(this.seconds){
        //     //this.ground.active.valueOf()
        //     // this.player.setVelocityY(0)
        //     // this.player.setVelocityX(0)

        //     if(this.cursors.up.isDown == true){
        //         this.player.setVelocityY(-50)
        //         this.player.setVelocityX(100)
        //     }
        //     else if(this.cursors.down.isDown == true){
        //         this.player.setVelocityY(50)
        //         this.player.setVelocityX(-100)
        //     }

        //     if(this.cursors.left.isDown == true){
        //         this.player.setVelocityY(-50)
        //         this.player.setVelocityX(-100)
        //     }
        //     else if(this.cursors.right.isDown == true){
        //         this.player.setVelocityY(50)
        //         this.player.setVelocityX(100)
        //     }
        // }
    }
}