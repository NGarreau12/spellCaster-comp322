class TestBattle extends Phaser.Scene
{
  constructor()
  {
    super("testBattle");
  }

  create()
  {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("comp322TileSetTest", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    var spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    this.player = this.physics.add.sprite(500, 100, "player");
    //this.physics.add.collider(this.player, worldLayer);

    var camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.roundPixels = true;

    this.enemyCoolDown = false;
    this.enemyCooler = 2;
    this.enemyAttackCount = 0;

    setTimeout(() => {
      var sceneStat = "false";
      if (this.scene.isSleeping("testScene")) { sceneStat = "true"; console.log("true"); }
      this.txt = this.add.text(550, 150, this.enemyAttackCount, { fontFamily: "Arial", fontSize: 100, color: "#000000" });
      this.txt = this.add.text(650, 250, sceneStat, { fontFamily: "Arial", fontSize: 100, color: "#000000" });
      this.scene.switch("testScene");
    }, 2000);
  }

  update()
  {

  }

  enemyAttack()
  {
    this.enemyCoolDown = true;
    this.enemyAttackCounter++;
    this.add.text(550, 150, this.enemyAttackCount, { fontFamily: "Arial", fontSize: 100, color: "#000000" });
    setTimeout(() => {
      this.enemyAttackCounter++;
      this.txt.setText(this.enemyAttackCount);
      this.enemyCooler = Math.floor(Math.random() * 9) + 2;
      this.enemyCoolDown = false;
    }, 1000);
  }
}
