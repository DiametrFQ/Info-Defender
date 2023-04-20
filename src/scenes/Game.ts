import Phaser from 'phaser'

export class Game extends Phaser.Scene{

    private map: Phaser.Tilemaps.Tilemap;
    private walls: Phaser.Tilemaps.TilemapLayer;
    private stena: Phaser.Tilemaps.TilemapLayer;
    private ground: Phaser.Tilemaps.TilemapLayer;
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
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
        this.map = this.make.tilemap({key: "fuck"})
        this.tileSet = this.map.addTilesetImage('IsoTales', 'tiles')

        this.ground = this.map.createLayer('Слой тайлов 1', this.tileSet).setPosition(350,0)
        this.walls = this.map.createLayer('Walls', this.tileSet).setPosition(350,0)
        this.stena = this.map.createLayer('stena', this.tileSet).setPosition(350,0)

        this.player = this.physics.add.sprite(100,110,"player")

        this.player.setPosition(300,210)

        //this.player.setAngle(45)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.walls.setCollisionByProperty({collides: true})
        this.walls.setCollisionBetween(0,10000)

        this.stena.setCollisionByProperty({collides: true})
        this.stena.setCollisionBetween(0,10000)

        this.physics.add.collider(this.player, this.walls, ()=>{console.log('ht')})

        // this.physics.add.overlap(this.player, this.walls, function () {
        //     console.log('ht')
        //   });

        this.seconds = 10
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
            if (pointer.leftButtonReleased() && this.seconds){
                const tween = this.tweens.add({
                    targets: this.player,
                    x: pointer.x,
                    y: pointer.y,
                    ease: 'Linear',
                    duration: 200,
                    onComplete:function(){
                        tween.remove()
                    },
                })
            }
        });
    }

    update(){
        this.ground.active.valueOf()
        if(this.seconds){
            //this.ground.active.valueOf()
            // this.player.setVelocityY(0)
            // this.player.setVelocityX(0)

            if (this.cursors.left.isDown){
                console.log('sdf')
            }

            if(this.cursors.up.isDown == true){
                this.player.setVelocityY(-50)
                this.player.setVelocityX(100)
            }
            else if(this.cursors.down.isDown == true){
                this.player.setVelocityY(50)
                this.player.setVelocityX(-100)
            }

            if(this.cursors.left.isDown == true){
                this.player.setVelocityY(-50)
                this.player.setVelocityX(-100)
            }
            else if(this.cursors.right.isDown == true){
                this.player.setVelocityY(50)
                this.player.setVelocityX(100)
            }
        }
    }
}