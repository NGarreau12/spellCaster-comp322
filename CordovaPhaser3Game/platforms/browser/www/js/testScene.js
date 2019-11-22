class TestScene extends Phaser.Scene
{
  constructor()
  {
    super("testScene");
  }

  create() //When later abstracted: createArea(mapArea, tileSet, enterFrom)
  {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("comp322TileSetTest", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    var spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
    this.physics.add.collider(this.player, worldLayer);

    var camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.roundPixels = true;

    this.openUI();
    this.events.on('wake', this.openUI, this);

    /*setTimeout(() => { //remove the timers ~ use async timers
      this.enterBattle();
    }, 2000);*/
  }

  openUI()
  {
    this.scene.run("mobileOverWorldUI");
    var overUI = this.scene.get("mobileOverWorldUI");
    overUI.createUI(this, this.player);
    this.scene.stop("testBattle");
  }

  enterBattle()
  {
    this.scene.sleep("mobileOverWorldUI");
    this.scene.switch("testBattle");
  }

  enterOVW()
  {

  }

  update()
  {

  }
}
