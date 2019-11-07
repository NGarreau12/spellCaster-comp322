class LoadAssets extends Phaser.Scene
{
  constructor()
  {
    super("loadGame");
  }

  preload()
  {
    this.load.image("tiles", "img/TileMaps/comp322TilesTest.png");
    this.load.tilemapTiledJSON("map", "img/TileMaps/comp322TileMapTest.json");

    this.load.spritesheet("player", "img/SpriteSheets/comp322PlayerTest.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create()
  {
    this.add.text(20, 20, "Loading Game...");

    this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "still",
        frames: 0,
        frameRate: 10,
        repeat: -1
    });

    this.scene.start("testGame");
  }
}
