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
    playerSpeed: 75,
    walkSpeed: 75,
    runSpeed: 100,
    canMove: true,
    startNewGame: true
  }

  this.currentGame = {
    mapArea: "town1Scene",
    playerX: 0,
    playerY: 0,
    maxHealth: 100,
    currentHealth: 100,
    maxMana: 100,
    currentMana: 100,
    currentLevel: 1,
    exp: 0,
    expForLevelUp: 100,
    spellCount: 1,
    attackPower: 10,
    defensePower: 10,
    currentGold: 0
  }

  this.config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    backgroundColor: 000000,
    pixelArt: true,
    autoResize: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [StartScene, LoadAssets, Town1Scene, ForestScene, BattleScene, MobileOverWorldUI, BattleUI, GameOverScene],
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
