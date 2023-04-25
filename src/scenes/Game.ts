import Phaser from 'phaser'

interface Icoord{
    x: number,
    y: number
}

export class Game extends Phaser.Scene{
    
    private map: Phaser.Tilemaps.Tilemap;
    private walls: Phaser.Tilemaps.TilemapLayer;
    private stena: Phaser.Tilemaps.TilemapLayer;
    private ground: Phaser.Tilemaps.TilemapLayer;
    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private gaykey: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private tileSet: Phaser.Tilemaps.Tileset;
    private coord: Icoord = {
        x: 0,
        y: 0
    };
    private timer: number;
    private seconds: number;
    private textTimer: Phaser.GameObjects.Text;

    constructor(){
        super("game")
    }

    //preloag(){}

    create(){
        this.coord.x = 0
        this.coord.y = 0

        this.map = this.make.tilemap({key: "fuck"});
        this.tileSet = this.map.addTilesetImage('IsoTales', 'tiles');
        const coord = [500, 100];
        this.ground = this.map.createLayer('Слой тайлов 1', this.tileSet).setPosition(...coord);
        this.walls = this.map.createLayer('Walls', this.tileSet).setPosition(...coord);
        this.stena = this.map.createLayer('stena', this.tileSet).setPosition(...coord);

        this.gaykey = this.physics.add.sprite(400, 300, 'gaykey')
        //this.physics.arcade.enable(this.gaykey);

        this.player = this.physics.add.sprite(100,110,"player")
        this.player.setPosition(coord[0], coord[1]+210)

        this.walls.setCollisionByProperty({collides: true})
        this.walls.setCollisionBetween(0,10000)

        this.stena.setCollisionByProperty({collides: true})
        this.stena.setCollisionBetween(0,10000)

        this.physics.add.collider(this.player, this.gaykey, ()=>{
            this.gaykey.setVelocity(0)
            this.gaykey.setPosition(400, 650)
        })

        this.physics.add.collider(this.player, [this.walls, this.stena], ()=>{
            this.player.setVelocity(0)
        })

        this.seconds = 1000
        this.textTimer = this.add.text(0,0, `Осталось ${this.seconds} секунд`);

        this.timer = setInterval(() => 
        {
            this.seconds--
            this.textTimer.text = `Осталось ${this.seconds} секунд`
            if(!this.seconds){
                clearInterval(this.timer)
                this.player.setVelocity(0)
            }
        },
        1000)

        // const graphics = this.add.graphics()

        // graphics.lineStyle(5, 0x0000FF, 1.0);
        // graphics.beginPath();
        // graphics.moveTo(500,300);

        // for(let i = 0 ; i <= 700; i++){
        //     graphics.lineTo(i*2+134.5, i)
        // }

        // graphics.closePath();
        // graphics.strokePath();

        // graphics.lineStyle(5, 0x00FFFF, 1.0);
        // graphics.beginPath();
        // graphics.moveTo(500,300);

        // for(let i = 0 ; i <= 700; i++){
        //     graphics.lineTo(i*2-479.5, i)
        // }

        // graphics.closePath();
        // graphics.strokePath();

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) =>
        {
            if (
                pointer.leftButtonReleased() && this.seconds &&
                -pointer.x/2+437.5 < pointer.y &&
                -pointer.x/2+741.5 > pointer.y &&

                pointer.y*2+134.5 > pointer.x &&
                pointer.y*2-479.5 < pointer.x

            )
            {
                //console.log(objectsClicked)

                //194 334

                this.coord = {
                    x: pointer.x,
                    y: pointer.y
                }
                this.player.setVelocityX(-(this.player.x - pointer.x))
                this.player.setVelocityY(-(this.player.y - pointer.y))
            }
        });
        this.ground.setInteractive();

    }   
        // graphics.lineTo(510, 490);
        // graphics.lineTo(180, 490);
        // graphics.lineTo(811, 336);
        // graphics.lineTo(203, 336);
    update(){

        this.ground.active.valueOf()

        if(
            Math.floor(this.player.x) == Math.floor(this.coord.x) &&
            Math.floor(this.player.y) == Math.floor(this.coord.y)
        ){
            this.player.setVelocity(0)
        }

        
    }
}