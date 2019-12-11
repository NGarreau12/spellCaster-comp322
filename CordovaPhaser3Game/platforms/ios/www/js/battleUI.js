var isUIUP = false;
var worldScene;
var player;
var enemy;
var wMaxHealth;
var textEvent = "";
var spell = 0;
var spPos = 0;
var spName = "";
var spVal = 0;
var manaCost = 0;
var cast = false;
var firstInput = "";
var secondInput = "";
var inBattle = true;

class BattleUI extends Phaser.Scene
{
  constructor()
  {
    super("battleUI");
  }

  createUI(wrldSn, plr, enmy)
  {
    this.resetBaseUI();

    worldScene = wrldSn;
    player = plr;
    enemy = enmy;
    wMaxHealth = enmy.getHealth();

    aButton = this.add.image(window.innerWidth - 65, window.innerHeight - 60, "a-unpressed").setScale(2);
    aButton.setInteractive().on('pointerdown', function(){
      aButton.setTexture("a-pressed");
      if (inBattle)
      {
        if (spPos == 2)
        {
          cast = true;
        }
        else if (spPos == 3)
        {
          spPos = 0;
          spell = 0;
          spName = "";
        }
      }
    });
    aButton.setInteractive().on('pointerout', function(){
      aButton.setTexture("a-unpressed");
    });

    bButton = this.add.image(window.innerWidth - 140, window.innerHeight - 60, "b-unpressed").setScale(2);
    bButton.setInteractive().on('pointerdown', function(){
      bButton.setTexture("b-pressed");
      if (inBattle)
      {
        if (spPos == 2 || spPos == 3)
        {
          spPos = 0;
          spell = 0;
          spName = "";
        }
      }
    });
    bButton.setInteractive().on('pointerout', function(){
      bButton.setTexture("b-unpressed");
    });

    this.addArrowButton(upArrow, 0, "Up", 110, window.innerHeight - 170, 1);
    this.addArrowButton(leftArrow, 270, "Left", 50, window.innerHeight - 110, 2);
    this.addArrowButton(rightArrow, 90, "Right", 170, window.innerHeight -110, 3);
    this.addArrowButton(downArrow, 180, "Down", 110, window.innerHeight - 50, 4);

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(5, 5, window.innerWidth - 8, 120);
    this.graphics.fillRect(5, 5, window.innerWidth - 8, 120);

    this.txtHP = this.add.text(150, 6, "HP: " + currentGame.currentHealth + " / " + currentGame.maxHealth, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtMana = this.add.text(150, 20, "Mana: " + currentGame.currentMana + " / " + currentGame.maxMana, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtLevel = this.add.text(150, 34, "Level: " + currentGame.currentLevel, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtExperience = this.add.text(150, 48, "EXP: " + currentGame.exp + " / " + currentGame.expForLevelUp, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtAttack = this.add.text(150, 62, "Attack: " + currentGame.attackPower, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtDefense = this.add.text(150, 76, "Defense: " + currentGame.defensePower, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});

    this.txtEnmyHP = this.add.text(600, 6, "HP: " + enemy.getHealth() + " / " + wMaxHealth, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtEnmyLevel = this.add.text(600, 20, "Level: " + enemy.getLevel(), { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtEnmyAttack = this.add.text(600, 34, "Attack: " + enemy.getAttack(), { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtEnmyDefense = this.add.text(600, 48, "Defense: " + enemy.getDefense(), { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});

    this.txtFI = this.add.text(125, 130, firstInput, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});
    this.txtSI = this.add.text(175, 130, secondInput, { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', align: 'center'});

    textEvent = "Walter encountered a level " + enemy.getLevel() + " Wraith!";
    this.txtEvents = this.add.text(220, 96, textEvent, { fontFamily: 'Arial', fontSize: 18, color: '#ffffff', align: 'center'});

    isUIUP = true;
  }

  update()
  {
    if (isUIUP)
    {
      this.updateUI();
      if (cast) { this.castSpell(); }
    }
  }

  updateUI()
  {
    this.txtHP.setText("HP: " + currentGame.currentHealth + " / " + currentGame.maxHealth);
    this.txtMana.setText("Mana: " + currentGame.currentMana + " / " + currentGame.maxMana);
    this.txtLevel.setText("Level: " + currentGame.currentLevel);
    this.txtExperience.setText("EXP: " + currentGame.exp + " / " + currentGame.expForLevelUp);
    this.txtAttack.setText("Attack: " + currentGame.attackPower);
    this.txtDefense.setText("Defense: " + currentGame.defensePower);

    this.txtEnmyHP.setText("HP: " + enemy.getHealth() + " / " + wMaxHealth);
    this.txtEnmyLevel.setText("Level: " + enemy.getLevel());
    this.txtEnmyAttack.setText("Attack: " + enemy.getAttack());
    this.txtEnmyDefense.setText("Defense: " + enemy.getDefense());

    this.txtFI.setText(firstInput);
    this.txtSI.setText(secondInput);

    this.txtEvents.setText(textEvent);
  }

  addArrowButton(btn, rot, dir, posX, posY, spDir)
  {
    btn = this.add.image(posX, posY, "arrow-unpressed").setScale(2);
    btn.angle = rot;
    btn.setInteractive().on('pointerdown', function(){
      btn.setTexture("arrow-pressed");
      if (spPos < 2 && inBattle)
      {
        if (spPos == 0) { firstInput = dir; }
        else if (spPos == 1) { secondInput = dir; }

        var powPos = 1;
        for (var i = 0; i < 1 - spPos; i++)
        {
          powPos *= 10;
        }
        spell = spell + (spDir * (powPos));
        spPos++;
      }
    });
    btn.setInteractive().on('pointerout', function(){
      btn.setTexture("arrow-unpressed");
    });
  }

  resetBaseUI()
  {
    isUIUP = false;
    textEvent = "";
    spell = 0;
    spPos = 0;
    spName = "";
    spVal = 0;
    manaCost = 0;
    cast = false;
    firstInput = "";
    secondInput = "";
    inBattle = true;
  }

  castSpell()
  {
    cast = false;
    if (spPos >= 2)
    {
      if (spell == 33)
      {
        spName = "Fireball";
        spVal = 5;
        manaCost = 8;
      }
      else if (spell == 22 && currentGame.spellCount > 1)
      {
        spName = "Heal";
        spVal = 10;
        manaCost = 25;
      }
      else if (spell == 13 && currentGame.spellCount > 2)
      {
        spName = "Spark";
        spVal = 15;
        manaCost = 20;
      }
      else if (spell == 21 && currentGame.spellCount > 3)
      {
        spName = "Fortify";
        spVal = 2;
        manaCost = 20;
      }
      else if (spell == 34 && currentGame.spellCount > 4)
      {
        spName = "Freeze";
        spVal = 25000;
        manaCost = 55;
      }
      else if (spell == 31 && currentGame.spellCount > 5)
      {
        spName = "Strengthen";
        spVal = 2;
        manaCost = 40;
      }
      else if (spell == 42 && currentGame.spellCount > 6)
      {
        spName = "Focus";
        spVal = 500;
        manaCost = 75;
      }
      else if (spell == 14 && currentGame.spellCount > 7)
      {
        spName = "Thunder";
        spVal = 70;
        manaCost = 80;
      }
      else if (spell == 12 && currentGame.spellCount > 8)
      {
        spName = "Recover";
        spVal = 50;
        manaCost = 90;
      }
      else if (spell == 44 && currentGame.spellCount > 9)
      {
        spName = "Banish";
        spVal = 99999;
        manaCost = 100;
      }
      else
      {
        spName = "Invalid Spell";
        spVal = 0;
        manaCost = 0;
      }

      worldScene.walterSpell(spName, spVal, manaCost);
    }
  }

  spellSuccess(spellType, spellNum, extraDetail)
  {
    if (!spellType.localeCompare("AttackWraith"))
    {
      if (extraDetail)
      {
        textEvent = "Walter cast " + spName + ", dealing " + spellNum + " damage! It's a critical hit!";
      }
      else
      {
        textEvent = "Walter cast " + spName + ", dealing " + spellNum + " damage!";
      }
    }
    else if (!spellType.localeCompare("Heal"))
    {
      textEvent = "Walter cast " + spName + ", recovering " + spellNum + " HP!";
    }
    else if (!spellType.localeCompare("AtkUp"))
    {
      textEvent = "Walter cast " + spName + ", boosting his attack by " + spellNum + "!";
    }
    else if (!spellType.localeCompare("DefUp"))
    {
      textEvent = "Walter cast " + spName + ", boosting his defense by " + spellNum + "!";
    }
    else if (!spellType.localeCompare("Focus"))
    {
      textEvent = "Walter cast " + spName + ", increasing his Mana Regeneration speed!";
    }
    else if (!spellType.localeCompare("AtkUp"))
    {
      textEvent = "Walter cast " + spName + ", boosting his attack by " + spellNum + "!";
    }
    else if (!spellType.localeCompare("FreezeWraith"))
    {
      textEvent = "Walter cast " + spName + ", slowing the wraith for 25 seconds!";
    }
    else if (!spellType.localeCompare("BanishWraith"))
    {
      if (extraDetail)
      {
        textEvent = "Walter cast " + spName + ", sending the wraith far away!";
      }
      else
      {
        textEvent = "Walter cast " + spName + ", but the wraith is too strong!";
      }
    }

    firstInput = "";
    secondInput = "";
    spName = "";
    spVal = 0;
    manaCost = 0;
    spell = 0;
    spPos = 0;
  }

  spellFailure()
  {
    textEvent = "The spell failed!";
  }

  wraithAttack(dmgDone, isCrit)
  {
    if (isCrit) { textEvent = "The wraith attacked, dealing " + dmgDone + " damage! It's a critical hit!"; }
    else { textEvent = "The wraith attacked, dealing " + dmgDone + " damage!"; }
  }

  wraithUnfreeze()
  {
    textEvent = "The wraith thawed out and is back to normal speed!";
  }

  walterWin()
  {
    inBattle = false;
    textEvent = "Walter defeated the wraith! He earned " + enemy.getEXP() + " EXP!";
  }

  walterLevelUp()
  {
    textEvent = "Walter leveled up to Level " + currentGame.currentLevel + "!";
  }
}
