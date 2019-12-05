var isUIUP = false;
var worldScene;
var player;
var enemy;
var wMaxHealth;
var textEvent = "";
var spell = 0;
var spPos = 0;
var spName = "";
var cast = false;

class BattleUI extends Phaser.Scene
{
  constructor()
  {
    super("battleUI");
  }

  createUI(wrldSn, plr, enmy)
  {
    worldScene = wrldSn;
    player = plr;
    enemy = enmy;
    wMaxHealth = enmy.getHealth();

    aButton = this.add.image(window.innerWidth - 65, window.innerHeight - 60, "a-unpressed").setScale(2);
    aButton.setInteractive().on('pointerover', function(){
      aButton.setTexture("a-pressed");
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
    });
    aButton.setInteractive().on('pointerout', function(){
      aButton.setTexture("a-unpressed");
      worldScene.aButtonUp();
    });

    bButton = this.add.image(window.innerWidth - 140, window.innerHeight - 60, "b-unpressed").setScale(2);
    bButton.setInteractive().on('pointerover', function(){
      bButton.setTexture("b-pressed");
      if (spPos == 2 || spPos == 3)
      {
        spPos = 0;
        spell = 0;
        spName = "";
      }
    });
    bButton.setInteractive().on('pointerout', function(){
      bButton.setTexture("b-unpressed");
      worldScene.bButtonUp();
    });

    this.addArrowButton(upArrow, 0, "up", 110, window.innerHeight - 170, 1);
    this.addArrowButton(leftArrow, 270, "left", 50, window.innerHeight - 110, 2);
    this.addArrowButton(rightArrow, 90, "right", 170, window.innerHeight -110, 3);
    this.addArrowButton(downArrow, 180, "down", 110, window.innerHeight - 50, 4);

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

  castSpell()
  {
    cast = false;
    if (spPos >= 2)
    {
      if (spell == 33)
      {
        spName = "Fireball";
      }
      else if (spell == 22)
      {
        spName = "Heal";
      }
      else if (spell == 13)
      {
        spName = "Spark";
      }
      else if (spell == 21)
      {
        spName = "Fortify";
      }
      else if (spell == 34)
      {
        spName = "Freeze";
      }
      else if (spell == 31)
      {
        spName = "Strengthen";
      }
      else if (spell == 42)
      {
        spName = "Focus";
      }
      else if (spell == 14)
      {
        spName = "Thunder";
      }
      else if (spell == 12)
      {
        spName = "Recover";
      }
      else if (spell == 44)
      {
        spName = "Banish";
      }
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

    this.txtEvents.setText(textEvent);
  }

  addArrowButton(btn, rot, dir, posX, posY, spDir)
  {
    btn = this.add.image(posX, posY, "arrow-unpressed").setScale(2);
    btn.angle = rot;
    btn.setInteractive().on('pointerdown', function(){
      btn.setTexture("arrow-pressed");
      if (spPos < 2)
      {
        spell = spell + (spDir * Mathf.Pow(10, 1 - spPos));
        spPos++;
      }
    });
    btn.setInteractive().on('pointerout', function(){
      btn.setTexture("arrow-unpressed");
    });
  }
}
