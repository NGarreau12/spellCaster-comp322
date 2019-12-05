var walterAttacking = false;
var endBattle = false;

class BattleScene extends Phaser.Scene
{
  constructor()
  {
    super("battleScene");
  }

  create()
  {
    const map = this.make.tilemap({ key: "BattleScreen" });
    const tileset = map.addTilesetImage("8x8TileSet", "tiles");
    const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);

    this.isBattle = true;

    var walterPoint = map.findObject("Spawns", obj => obj.name === "Walter Spawn");
    var wraithPoint = map.findObject("Spawns", obj => obj.name === "Wraith Spawn");
    var centerCam = map.findObject("Spawns", obj => obj.name === "Center");

    this.walter = this.physics.add.sprite(walterPoint.x, walterPoint.y, "walter");
    this.wraith = new Wraith(this, wraithPoint.x, wraithPoint.y);

    var camera = this.cameras.main;
    camera.startFollow(centerCam);
    camera.setZoom(2.8);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.roundPixels = true;

    this.enemyCoolDown = false;
    this.enemySpeed = this.wraith.getSpeed();
    this.enemyCooler = this.enemySpeed * 1000;
    this.enemyAttackDamage = (this.wraith.getAttack() * 2) - currentGame.defensePower;

    this.scene.run("battleUI");
    this.overUI = this.scene.get("battleUI");
    this.overUI.createUI(this, this.walter, this.wraith);
  }

  update()
  {
    if (!endBattle)
    {
      if (!this.enemyCoolDown)
      {
        this.enemyAttack();
      }

      this.updateUI();
    }
  }

  updateUI()
  {

    if (currentGame.currentHealth <= 0)
    {
      this.gameOver();
    }
  }

  enemyAttack()
  {
    this.enemyCoolDown = true;
    setTimeout(() => {
      this.enemyCooler = (Math.floor(Math.random() * 5) + this.enemySpeed) * 1000;
      this.hitWalter();
      this.enemyCoolDown = false;
    }, this.enemyCooler);
  }

  hitWalter()
  {
    if (walterAttacking == false)
    {
      this.wraith.play("attackWraith", true);
      this.walter.play("damageWalter", true);
      if (this.wraith.getAttack() >= currentGame.currentHealth)
      {
        currentGame.currentHealth = 0;
      }
      else
      {
        currentGame.currentHealth -= this.wraith.getAttack();
      }
    }
  }



  aButtonDown()
  {

  }

  bButtonDown()
  {

  }

  aButtonUp()
  {

  }

  bButtonUp()
  {

  }

  enterOVW()
  {
    this.scene.stop("battleUI");
    this.scene.wake(currentGame.mapArea);
  }

  gameOver()
  {
    endBattle = true;
    setTimeout(() => {
      this.scene.stop("battleUI");
      this.scene.start("gameOverScene");
    }, 2500);
  }
}
