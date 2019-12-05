var worldScene;
var player;
var isRight = true;
var isMoving = false;
var aButton;
var bButton;
var upArrow;
var downArrow;
var leftArrow;
var rightArrow;
var saveButton;

class MobileOverWorldUI extends Phaser.Scene
{
  constructor()
  {
    super("mobileOverWorldUI");
  }

  createUI(wrldSn, plr)
  {
    worldScene = wrldSn;
    player = plr;

    aButton = this.add.image(window.innerWidth - 65, window.innerHeight - 60, "a-unpressed").setScale(2);
    aButton.setInteractive().on('pointerover', function(){
      aButton.setTexture("a-pressed");
      worldScene.aButtonDown();
    });
    aButton.setInteractive().on('pointerout', function(){
      aButton.setTexture("a-unpressed");
      worldScene.aButtonUp();
    });

    bButton = this.add.image(window.innerWidth - 140, window.innerHeight - 60, "b-unpressed").setScale(2);
    bButton.setInteractive().on('pointerover', function(){
      bButton.setTexture("b-pressed");
      worldScene.bButtonDown();
    });
    bButton.setInteractive().on('pointerout', function(){
      bButton.setTexture("b-unpressed");
      worldScene.bButtonUp();
    });

    this.addArrowButton(upArrow, 0, "up", 110, window.innerHeight - 170, -gameSettings.playerSpeed, false);
    this.addArrowButton(downArrow, 180, "down", 110, window.innerHeight - 50, gameSettings.playerSpeed, false);
    this.addArrowButton(leftArrow, 270, "left", 50, window.innerHeight - 110, -gameSettings.playerSpeed, true);
    this.addArrowButton(rightArrow, 90, "right", 170, window.innerHeight -110, gameSettings.playerSpeed, true);

    saveButton = this.add.image(window.innerWidth - 65, 60, "save-icon").setScale(2);
    saveButton.setInteractive().on('pointerover', this.saveGame);
  }

  addArrowButton(btn, rot, dir, posX, posY, vel, isX)
  {
    btn = this.add.image(posX, posY, "arrow-unpressed").setScale(2);
    btn.angle = rot;
    btn.setInteractive().on('pointerover', function(){
      btn.setTexture("arrow-pressed");
      if (gameSettings.canMove)
      {
        if (isX)
        {
          player.setVelocityX(vel);
          if (vel > 0) { isRight = true; }
          else { isRight = false; }
        }
        else { player.setVelocityY(vel); }

        if (player.body.velocity.x != 0 || player.body.velocity.y != 0) { isMoving = true; }
        else { isMoving = false; }
        if (isMoving) {
          if (isRight) { player.play("rightWalter", true); }
          else { player.play("leftWalter", true); }
        }
      }
    });
    btn.setInteractive().on('pointerout', function(){
      btn.setTexture("arrow-unpressed");
      if (isX) { player.setVelocityX(0); }
      else { player.setVelocityY(0); }

      if (player.body.velocity.x == 0 || player.body.velocity.y == 0) { isMoving = false; }
      else { isMoving = true; }
      if (!isMoving) {
        if (isRight) { player.play("rightStillWalter", true); }
        else { player.play("leftStillWalter", true); }
      }
    });
  }

  setPlayerAnimation()
  {
    this.checkPlayerMoving();

    if (player.body.velocity.x == 0 || player.body.velocity.y == 0) { isMoving = false; }
    else { isMoving = true; }
    if (isMoving) {
      if (isRight) { player.play("rightWalter", true); }
      else { player.play("leftWalter", true); }
    }
    else {
      if (isRight) { player.play("rightStillWalter", true); }
      else { player.play("leftStillWalter", true); }
    }
  }

  checkPlayerMoving()
  {
    if (player.body.velocity.x == 0 || player.body.velocity.y == 0) { isMoving = false; }
    else { isMoving = true; }
  }

  setPlayerCanMove(newMove)
  {
    gameSettings.canMove = newMove;
  }

  saveGame()
  {
    localStorage.setItem("mapArea", currentGame.mapArea);
    localStorage.setItem("playerX", player.x);
    localStorage.setItem("playerY", player.y);
    localStorage.setItem("maxHealth", currentGame.maxHealth);
    localStorage.setItem("currentHealth", currentGame.currentHealth);
    localStorage.setItem("maxMana", currentGame.maxMana);
    localStorage.setItem("currentMana", currentGame.currentMana);
    localStorage.setItem("currentLevel", currentGame.currentLevel);
    localStorage.setItem("exp", currentGame.exp);
    localStorage.setItem("expForLevelUp", currentGame.expForLevelUp);
    localStorage.setItem("spellCount", currentGame.spellCount);
    localStorage.setItem("attackPower", currentGame.attackPower);
    localStorage.setItem("defensePower", currentGame.defensePower);
    localStorage.setItem("currentGold", currentGame.currentGold);
  }
}
