// start the app with deviceready event
function onLoad() {

	// check deviceready event - wait for app to load...
	document.addEventListener('deviceready', function() {

		start();

	});

}

function buildConfig(type) {
	console.log(`screen background set for orientation - ${type}`);

	this.gameSettings = {
    playerSpeed: 200
  }

  this.config = {
    type: Phaser.AUTO,
    width: window.innerWidth,// * window.devicePixelRatio,
    height: window.innerHeight,// * window.devicePixelRatio,
    backgroundColor: 000000,
    pixelArt: true,
    autoResize: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [LoadAssets, TestScene, TestBattle, MobileOverWorldUI],
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  };
  this.game = new Phaser.Game(this.config);
}

function ready() {
  const { type } = screen.orientation;
  console.log(`screen orientation = ${type}`);
	buildConfig(type);
}

async function start() {
  await screen.orientation.lock("landscape");
  ready();
}

onLoad();
