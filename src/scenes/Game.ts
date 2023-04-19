import Phaser from 'phaser'

export class Game extends Phaser.Scene{

    private walls: Phaser.Tilemaps.TilemapLayer;
    private ground: Phaser.Tilemaps.TilemapLayer;
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(){
        super("game")
    }
    //preloag(){}

    create(){
        const map = this.make.tilemap({key: "fuck"})
        const tileSet = map.addTilesetImage('IsoTales', 'tiles')
        this.cursors = this.input.keyboard.createCursorKeys();
        this.ground = map.createLayer('Слой тайлов 1', tileSet)
        this.walls = map.createLayer('Walls', tileSet)

        this.player = this.physics.add.sprite(100,110,"player")

        this.player.setPosition(300,210)

        this.walls.setCollisionByProperty({collides: true})

        const debugGraph = this.add.graphics().setAlpha(0.7)
        this.walls.renderDebug(debugGraph,{
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(231,222,48,253),
            faceColor: new Phaser.Display.Color(231,222,56,213)
        })
        //cuctusLayer = map.createLayer('Walls', tileSet)

        this.physics.add.collider(this.player, this.walls)
        console.log(this.walls)
        this.walls.setCollisionBetween(0,10000)

    }

    update(){
        this.ground.active.valueOf()
        this.player.setVelocityY(0)
        this.player.setVelocityX(0)

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