var walterAttacking = false;
var wraithAttacking = false;
var endBattle = false;
var wraithOGSpeed = 10.0;
var manaSpeed = 1000;
var waltATK = 10;
var waltDEF = 10;

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
    wraithOGSpeed = this.enemySpeed;
    this.enemyCooler = this.enemySpeed * 1000;
    this.enemyAttackDamage = (this.wraith.getAttack() * 2) - currentGame.defensePower;

    this.resetBaseBat();

    this.scene.run("battleUI");
    this.overUI = this.scene.get("battleUI");
    this.overUI.createUI(this, this.walter, this.wraith);

    this.manaReady = true;
    this.wraithCrit = false;
    this.walterCrit = false;

    manaSpeed = currentGame.manaRate;
    waltATK = currentGame.attackPower;
    waltDEF = currentGame.defensePower;
  }

  update()
  {
    if (!endBattle)
    {
      if (!this.enemyCoolDown)
      {
        this.enemyAttack();
      }
      if (currentGame.currentMana < currentGame.maxMana && this.manaReady)
      {
        this.manaRegen();
      }

      this.checkHealths();
    }
  }

  checkHealths()
  {
    if (currentGame.currentHealth <= 0)
    {
      this.gameOver();
    }
    else if (this.wraith.getHealth() <= 0)
    {
      this.winBattle();
    }
  }

  enemyAttack()
  {
    this.enemyCoolDown = true;
    setTimeout(() => {
      if (!endBattle)
      {
        this.enemyCooler = (Math.floor(Math.random() * 5) + this.enemySpeed) * 1000;
        this.hitWalter();
      }
      this.enemyCoolDown = false;
    }, this.enemyCooler);
  }

  resetBaseBat()
  {
    this.enemyCoolDown = false;
    this.enemySpeed = this.wraith.getSpeed();
    wraithOGSpeed = this.enemySpeed;
    this.enemyCooler = this.enemySpeed * 1000;
    this.enemyAttackDamage = (this.wraith.getAttack() * 2) - currentGame.defensePower;
  }

  hitWalter()
  {
    if (walterAttacking == false && wraithAttacking == false)
    {
      wraithAttacking = true;
      this.wraith.play("attackWraith", true);
      this.walter.play("damageWalter", true);

      var dmg = (this.wraith.getAttack() - currentGame.defensePower) + ((Math.floor(Math.random() * 15) - 0) + 10);

      if (dmg >= 20) { this.wraithCrit = true; }
      else { this.wraithCrit = false; }

      if (dmg >= currentGame.currentHealth)
      {
        dmg = currentGame.currentHealth;
      }
      currentGame.currentHealth -= dmg;

      this.overUI.wraithAttack(dmg, this.wraithCrit);
      wraithAttacking = false;
    }
  }

  manaRegen()
  {
    this.manaReady = false;
    setTimeout(() => {
      currentGame.currentMana++;
      this.manaReady = true;
    }, manaSpeed);
  }

  walterSpell(spName, spVal, spMana)
  {
    if (wraithAttacking == false && walterAttacking == false)
    {
      walterAttacking = true;

      if (spMana >= currentGame.currentMana)
      {
        spMana = currentGame.currentMana;
      }
      currentGame.currentMana -= spMana;

      if (!spName.localeCompare("Fireball") || !spName.localeCompare("Spark") || !spName.localeCompare("Thunder"))
      {
        this.hitWraith(spVal);
      }
      else if (!spName.localeCompare("Heal") || !spName.localeCompare("Recover"))
      {
        this.walterHeal(spVal);
      }
      else if (!spName.localeCompare("Strengthen")) { this.walterATKUP(spVal); }
      else if (!spName.localeCompare("Fortify")) { this.walterDEFUP(spVal); }
      else if (!spName.localeCompare("Focus")) { this.walterFocus(spVal); }
      else if (!spName.localeCompare("Freeze")) { this.walterFreeze(spVal); }
      else if (!spName.localeCompare("Banish")) { this.walterBanish(spVal); }
      else { this.overUI.spellFailure(); }

      walterAttacking = false;
    }
  }

  hitWraith(spDmg)
  {
    this.walter.play("attackWalter", true);
    this.wraith.play("damageWraith", true);

    var dmg = (currentGame.attackPower - this.wraith.getDefense()) + ((Math.floor(Math.random() * 6) - 0) + spDmg);

    if (dmg >= 20) { this.walterCrit = true; }
    else { this.walterCrit = false; }

    if (dmg >= this.wraith.getHealth())
    {
      dmg = this.wraith.getHealth();
    }
    this.wraith.setHealth(this.wraith.getHealth() - dmg);

    this.overUI.spellSuccess("AttackWraith", dmg, this.walterCrit);
  }

  walterHeal(spHeal)
  {
    this.walter.play("attackWalter", true);

    if (currentGame.currentHealth + spHeal > currentGame.maxHealth)
    {
      spHeal = currentGame.maxHealth - currentGame.currentHealth;
    }
    currentGame.currentHealth += spHeal;

    this.overUI.spellSuccess("Heal", spHeal, false);
  }

  walterATKUP(spRaise)
  {
    this.walter.play("attackWalter", true);

    spRaise += (Math.floor(Math.random() * 2));
    currentGame.attackPower += spRaise;

    this.overUI.spellSuccess("AtkUp", spRaise, false);
  }

  walterDEFUP(spRaise)
  {
    this.walter.play("attackWalter", true);

    spRaise += (Math.floor(Math.random() * 2));
    currentGame.defensePower += spRaise;

    this.overUI.spellSuccess("DefUp", spRaise, false);
  }

  walterFocus(spFocus)
  {
    this.walter.play("attackWalter", true);

    manaSpeed += spFocus;
    this.overUI.spellSuccess("Focus", spFocus, false);
  }

  walterFreeze(spFreeze)
  {
    this.walter.play("attackWalter", true);
    this.wraith.play("damageWraith", true);

    this.enemySpeed *= 2;
    this.overUI.spellSuccess("FreezeWraith", spFreeze, false);

    setTimeout(() => {
      this.enemySpeed = wraithOGSpeed;
      this.overUI.wraithUnfreeze();
    }, spFreeze);
  }

  walterBanish(spBan)
  {
    this.walter.play("attackWalter", true);
    this.wraith.play("damageWraith", true);

    var banned = true;

    if (spBan >= this.wraith.getHealth())
    {
      spBan = this.wraith.getHealth();
    }
    else
    {
      banned = false;
    }
    this.wraith.setHealth(this.wraith.getHealth() - spBan);

    this.overUI.spellSuccess("BanishWraith", spBan, banned);
  }

  gameOver()
  {
    endBattle = true;
    setTimeout(() => {
      this.scene.stop("battleUI");
      this.scene.start("gameOverScene");
    }, 2500);
  }

  winBattle()
  {
    endBattle = true;
    this.overUI.walterWin();
    this.gainEXP();

    setTimeout(() => {
      this.enterOVW();
    }, 5000);
  }

  enterOVW()
  {
    this.scene.stop("battleUI");
    this.scene.start(currentGame.mapArea, "LoadGame");
  }

  gainEXP()
  {
    currentGame.exp += this.wraith.getEXP();
    if (currentGame.exp >= currentGame.expForLevelUp)
    {
      setTimeout(() => {
        currentGame.exp -= currentGame.expForLevelUp;
        this.levelUp();
      }, 2000);
    }
  }

  levelUp()
  {
    currentGame.manaRate = manaSpeed;
    currentGame.attackPower = waltATK;
    currentGame.defensePower = waltDEF;

    currentGame.currentLevel++;
    if (currentGame.spellCount < 10) { currentGame.spellCount++; }

    currentGame.maxHealth += (Math.floor(Math.random() * 5) + 4);
    currentGame.currentHealth = currentGame.maxHealth;

    currentGame.maxMana += (Math.floor(Math.random() * 6) + 3);
    currentGame.currentMana = currentGame.maxMana;
    currentGame.manaRate += 50;

    currentGame.attackPower += (Math.floor(Math.random() * 3) + 1);
    currentGame.defensePower += (Math.floor(Math.random() * 3) + 1);

    currentGame.expForLevelUp += (Math.floor(Math.random() * 6) + 3);

    this.overUI.walterLevelUp();
  }
}
