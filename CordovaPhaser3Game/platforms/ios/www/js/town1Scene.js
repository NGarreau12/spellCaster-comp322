var wraithChase = true;

class Town1Scene extends Phaser.Scene
{
  constructor()
  {
    super("town1Scene");
  }

  create(whereToSpawn)
  {
    currentGame.mapArea = "town1Scene";

    const map = this.make.tilemap({ key: "Town1Map" });
    const tileset = map.addTilesetImage("8x8TileSet", "tiles");
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
    const obsLayer = map.createStaticLayer("Obstacles", tileset, 0, 0);
    const woodLayer = map.createStaticLayer("Wood Signs", tileset, 0, 0);
    const metalLayer = map.createStaticLayer("Metal Signs", tileset, 0, 0);
    const doorLayer = map.createStaticLayer("Doors", tileset, 0, 0);
    const tranLayer = map.createStaticLayer("Transitions", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    obsLayer.setCollisionByProperty({ collides: true });
    woodLayer.setCollisionByProperty({ collides: true });
    metalLayer.setCollisionByProperty({ collides: true });
    doorLayer.setCollisionByProperty({ collides: true });
    tranLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);

    var spawnX = 0;
    var spawnY = 0;
    if (!whereToSpawn.localeCompare("NewGame"))
    {
      var spawnPoint = map.findObject("Places", obj => obj.name === "InitialSpawn");
      spawnX = spawnPoint.x;
      spawnY = spawnPoint.y;
    }
    else if (!whereToSpawn.localeCompare("LoadGame"))
    {
      spawnX = currentGame.playerX;
      spawnY = currentGame.playerY;

      this.scene.stop("battleScene");

      wraithChase = false;
      setTimeout(() => {
        wraithChase = true;
      }, 5000);
    }
    else if (!whereToSpawn.localeCompare("FromForest"))
    {
      var spawnPoint = map.findObject("Places", obj => obj.name === "T1");
      spawnX = spawnPoint.x;
      spawnY = spawnPoint.y;
    }
    this.player = this.physics.add.sprite(spawnX, spawnY, "walter").setScale(0.75);
    this.player.body.setMaxSpeed(100);

    this.isBattle = false;

    this.wraithSP1 = map.findObject("Places", obj => obj.name === "WS1");
    this.wraithSP2 = map.findObject("Places", obj => obj.name === "WS2");
    this.wraithSP3 = map.findObject("Places", obj => obj.name === "WS3");
    this.wraithSP4 = map.findObject("Places", obj => obj.name === "WS4");
    this.wraithSP5 = map.findObject("Places", obj => obj.name === "WS5");
    this.wraithSP6 = map.findObject("Places", obj => obj.name === "WS6");
    this.wSP1 = this.wraithSP1;
    this.wSP2 = this.wraithSP4;

    this.wraiths = this.physics.add.group();
    this.wraith1 = new Wraith(this, this.wSP1.x, this.wSP1.y);
    this.wraiths.add(this.wraith1);
    this.wraith2 = new Wraith(this, this.wSP2.x, this.wSP2.y);
    this.wraiths.add(this.wraith2);
    this.physics.world.enable(this.wraiths);

    var camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setZoom(3);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.roundPixels = true;

    this.openUI();
    this.events.on('wake', this.openUI, this);

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.player, obsLayer);
    this.physics.add.overlap(this.player, this.wraiths, this.enterBattle, null, this);
    this.physics.add.collider(this.player, woodLayer, this.readWoodSign, null, this);
    this.physics.add.collider(this.player, metalLayer, this.readMetalSign, null, this);
    this.physics.add.collider(this.player, doorLayer, this.knockKnock, null, this);
    this.physics.add.collider(this.player, tranLayer, this.changeArea, null, this);
  }

  update()
  {
    if (wraithChase)
    {
      this.wraith1.followPlayer();
      this.wraith2.followPlayer();
    }
  }

  openUI()
  {
    this.scene.run("mobileOverWorldUI");
    this.overUI = this.scene.get("mobileOverWorldUI");
    this.overUI.createUI(this, this.player);
    this.scene.stop("battleScene");
  }

  aButtonDown()
  {

  }

  bButtonDown()
  {
    gameSettings.playerSpeed = gameSettings.runSpeed;
  }

  aButtonUp()
  {

  }

  bButtonUp()
  {
    gameSettings.playerSpeed = gameSettings.walkSpeed;
  }

  readWoodSign()
  {

  }

  readMetalSign()
  {

  }

  knockKnock()
  {

  }

  changeArea()
  {
    this.scene.sleep("mobileOverWorldUI");
    this.scene.start("forestScene", "FromTown1");
  }

  respawnWraith()
  {

  }

  enterBattle()
  {
    currentGame.playerX = this.player.x;
    currentGame.playerY = this.player.y;

    this.scene.sleep("mobileOverWorldUI");
    this.scene.start("battleScene");
  }
}
