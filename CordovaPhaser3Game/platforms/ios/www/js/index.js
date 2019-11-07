document.addEventListener('deviceready', function() {
  screen.orientation.lock('landscape');
})

window.addEventListener('load', () => {
  window.setTimeout(() => {
    buildConfig();
  }, 200)
})

function buildConfig()
{
  this.gameSettings = {
    playerSpeed: 200
  }

  this.config = {
    type: Phaser.AUTO,
    width: window.innerWidth,// * window.devicePixelRatio,
    height: window.innerHeight,// * window.devicePixelRatio,
    backgroundColor: 0x000000,
    pixelArt: true,
    autoResize: false,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [LoadAssets, TestScene, TestBattle],
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  };

  this.game = new Phaser.Game(this.config);
}
