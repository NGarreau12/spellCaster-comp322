class GameOverScene extends Phaser.Scene
{
  constructor()
  {
    super("gameOverScene");
  }

  create()
  {
    var camera = this.cameras.main;
    camera.setBackgroundColor('000000');

    gameSettings.startNewGame = true;
    localStorage.clear();

    this.add.text((window.innerWidth / 4) - 50, (window.innerHeight / 3), "GAME OVER", { fontFamily: 'Arial', fontSize: 80, color: '#ffffff', align: 'center'});

    this.scene.stop("town1Scene");
    this.scene.stop("forestScene");

    setTimeout(() => {
      this.scene.start("startScene");
    }, 10000);
  }
}
