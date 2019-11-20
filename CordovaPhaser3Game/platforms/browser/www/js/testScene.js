class TestScene extends Phaser.Scene
{
  constructor()
  {
    super("testGame");
  }

  create()
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

    setTimeout(() => {
      //this.scene.switch("testBattle");
      this.scene.run("mobileOverWorldUI");
    }, 2000);
  }

  getPlayer()
  {
    return this.player;
  }

  update()
  {
    /*if (this.joystick.left)
    {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }
    else if (this.joystick.right)
    {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
    else {
      this.player.setVelocityX(0);
    }

    if (this.joystick.up)
    {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }
    else if (this.joystick.down)
    {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
    else {
      this.player.setVelocityY(0);
    }*/

    /*if (this.player.body.velocity.x > 0)
    {
      this.player.play("right", true);
    }
    else if (this.player.body.velocity.x < 0)
    {
      this.player.play("left", true);
    }
    else if (this.player.body.velocity.y > 0)
    {
      this.player.play("down", true);
    }
    else if (this.player.body.velocity.y < 0)
    {
      this.player.play("up", true);
    }
    else {
      this.player.play("still", true);
    }*/
  }
}
