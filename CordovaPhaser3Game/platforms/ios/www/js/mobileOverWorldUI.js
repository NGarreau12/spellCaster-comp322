var worldScene;
var player;
var canMove = true;
var aButton;
var bButton;
var upArrow;
var downArrow;
var leftArrow;
var rightArrow;

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
      //A button functionality will go here
    });
    aButton.setInteractive().on('pointerout', function(){ aButton.setTexture("a-unpressed"); });

    bButton = this.add.image(window.innerWidth - 140, window.innerHeight - 60, "b-unpressed").setScale(2);
    bButton.setInteractive().on('pointerover', function(){
      bButton.setTexture("b-pressed");
      //B button functionality will go here
    });
    bButton.setInteractive().on('pointerout', function(){ bButton.setTexture("b-unpressed"); });

    this.addArrowButton(upArrow, 0, "up", 110, window.innerHeight - 170, -200, false);
    this.addArrowButton(downArrow, 180, "down", 110, window.innerHeight - 50, 200, false);
    this.addArrowButton(leftArrow, 270, "left", 50, window.innerHeight - 110, -200, true);
    this.addArrowButton(rightArrow, 90, "right", 170, window.innerHeight -110, 200, true);
  }

  addArrowButton(btn, rot, dir, posX, posY, vel, isX)
  {
    btn = this.add.image(posX, posY, "arrow-unpressed").setScale(2);
    btn.angle = rot;
    btn.setInteractive().on('pointerover', function(){
      btn.setTexture("arrow-pressed");
      if (canMove)
      {
        if (isX) { player.setVelocityX(vel); }
        else { player.setVelocityY(vel); }
        //player.play(dir, true); bug: keeps starting it?
      }
    });
    btn.setInteractive().on('pointerout', function(){
      btn.setTexture("arrow-unpressed");
      if (isX) { player.setVelocityX(0); }
      else { player.setVelocityY(0); }
      //player.play("still", true);
    });
  }

  setPlayerCanMove(newMove)
  {
    canMove = newMove;
  }
}
