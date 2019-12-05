var isBattle = false;
var isRight = false;
var wLVL = 1;
var wHP = 50;
var wATK = 9;
var wDEF = 8;
var wEXP = 12;
var wSPD = 6.0;
var inScene;
var walter;

class Wraith extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene, x, y)
  {
    super(scene, x, y, "wraith").setScale(0.9);

    inScene = scene;
    scene.add.existing(this);
    this.play("leftWraith");
    walter = scene.player;

    isBattle = scene.isBattle;
    if (isBattle) { this.setLevel(); }
  }

  setLevel()
  {
    var adjustLVL = Math.floor(Math.random() * 5) - 2;
    wEXP += adjustLVL;
    if (wLVL + adjustLVL <= 1)
    {
      wLVL = 1;
    }
    else
    {
      wLVL += adjustLVL;
    }

    if (wLVL > 1) { this.setStats(); }
  }

  setStats()
  {
    for (var i = 1; i <= wLVL; i++)
    {
      wHP += Math.floor(Math.random() * 6) + 2;
      wATK += Math.floor(Math.random() * 2) + 1;
      wDEF += Math.floor(Math.random() * 2) + 1;
      wEXP += Math.floor(Math.random() * 4) + 2;
      if (i % 5 == 0 && wSPD >= 1)
      {
        wSPD -= 0.5;
      }
    }
    console.log("Level: " + wLVL + " HP: " + wHP + ", Attack: " + wATK + ", Defense: " + wDEF + ", EXP: " + wEXP + ", Speed: " + wSPD);
  }

  followPlayer()
  {
    if (Phaser.Math.Distance.Between(this.x, this.y, inScene.player.x, walter.y) <= 120)
    {
      inScene.physics.moveToObject(this, walter, 50);
      this.setWraithDirection();
    }
    else
    {
      this.body.setVelocity(0, 0);
    }
  }

  setWraithDirection()
  {
    if (this.body.velocity.x > 0)
    {
      this.play("rightWraith");
    }
    else if (this.body.velocity.x < 0)
    {
      this.play("leftWraith");
    }
  }

  getLevel() { return wLVL; }
  getHealth() { return wHP; }
  getAttack() { return wATK; }
  getDefense() { return wDEF; }
  getEXP() { return wEXP; }
  getSpeed() { return wSPD; }
}
