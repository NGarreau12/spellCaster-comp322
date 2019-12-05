var startNew = false;
var startContinue = false;

class StartScene extends Phaser.Scene
{
  constructor()
  {
    super("startScene");
  }

  preload()
  {
    this.load.image("newBtn", "img/gamepad/NewGameButton.png");
    this.load.image("continueBtn", "img/gamepad/ContinueButton.png");
  }

  create()
  {
    var nButton = this.add.image((window.innerWidth / 3) - 15, (window.innerHeight / 2) + 50, "newBtn").setScale(1.5);
    nButton.setInteractive().on('pointerdown', this.newGame);

    var cButton = this.add.image(((window.innerWidth * 2) / 3) + 15, (window.innerHeight / 2) + 50, "continueBtn").setScale(1.5);
    cButton.setInteractive().on('pointerdown', this.newGame);

    this.add.text((window.innerWidth / 4) - 100, (window.innerHeight / 5), "SPELL CASTER", { fontFamily: 'Arial', fontSize: 80, color: '#ffffff', align: 'center'});
  }

  update()
  {
    if (startNew || startContinue)
    {
      startNew = false;
      startContinue = false;
      this.scene.start("loadAssets");
    }
  }

  newGame()
  {
    localStorage.clear();
    gameSettings.startNewGame = true;
    startNew = true;
  }

  continueGame()
  {
    gameSettings.startNewGame = false;
    startContinue = true;
  }
}
