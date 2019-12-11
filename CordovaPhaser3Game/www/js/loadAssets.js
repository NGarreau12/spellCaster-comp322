class LoadAssets extends Phaser.Scene
{
  constructor()
  {
    super("loadAssets");
  }

  preload()
  {
    this.load.image("tiles", "img/TileMaps/8x8TileSet.png");
    this.load.tilemapTiledJSON("Town1Map", "img/TileMaps/Town1.json");
    this.load.tilemapTiledJSON("ForestMap", "img/TileMaps/Forest.json");
    this.load.tilemapTiledJSON("BattleScreen", "img/TileMaps/Battle.json");

    this.load.image("a-pressed", "img/gamepad/A_Button_Pressed.png");
    this.load.image("a-unpressed", "img/gamepad/A_Button_Unpressed.png");
    this.load.image("b-pressed", "img/gamepad/B_Button_Pressed.png");
    this.load.image("b-unpressed", "img/gamepad/B_Button_Unpressed.png");
    this.load.image("arrow-pressed", "img/gamepad/Arrow_Pressed.png");
    this.load.image("arrow-unpressed", "img/gamepad/Arrow_Unpressed.png");
    this.load.image("save-icon", "img/gamepad/SaveIcon.png");

    this.load.spritesheet("walter", "img/SpriteSheets/WalterSpriteSheet.png", {
      frameWidth: 15,
      frameHeight: 16
    });
    this.load.spritesheet("wraith", "img/SpriteSheets/WraithSpriteSheet.png", {
      frameWidth: 10,
      frameHeight: 16
    });
  }

  create()
  {
    this.add.text(20, 20, "Loading Game...");

    //Animations for Walter
    this.anims.create({
        key: "rightWalter",
        frames: this.anims.generateFrameNumbers("walter", { start: 0, end: 3 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: "leftWalter",
        frames: this.anims.generateFrameNumbers("walter", { start: 4, end: 7 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: "rightStillWalter",
        frames: this.anims.generateFrameNumbers("walter", { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "leftStillWalter",
        frames: this.anims.generateFrameNumbers("walter", { start: 4, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "attackWalter",
        frames: this.anims.generateFrameNumbers("walter", { start: 8, end: 9 }),
        frameRate: 4,
        repeat: 0
    });
    this.anims.get("attackWalter").addFrame(this.anims.generateFrameNumbers("walter", { start: 0, end: 0 }));
    this.anims.create({
        key: "damageWalter",
        frames: this.anims.generateFrameNumbers("walter", { start: 8, end: 8 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.get("damageWalter").addFrame(this.anims.generateFrameNumbers("walter", { start: 0, end: 0 }));

    //Animations for the wraiths
    this.anims.create({
        key: "rightWraith",
        frames: this.anims.generateFrameNumbers("wraith", { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "leftWraith",
        frames: this.anims.generateFrameNumbers("wraith", { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: "attackWraith",
        frames: this.anims.generateFrameNumbers("wraith", { start: 2, end: 2 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.get("attackWraith").addFrame(this.anims.generateFrameNumbers("wraith", { start: 1, end: 1 }));
    this.anims.create({
        key: "damageWraith",
        frames: this.anims.generateFrameNumbers("wraith", { start: 3, end: 3 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.get("damageWraith").addFrame(this.anims.generateFrameNumbers("wraith", { start: 1, end: 1 }));

    var newOrLoad = "";

    if (gameSettings.startNewGame || localStorage.length < 15)
    {
      this.newGame();
      newOrLoad = "NewGame";
    }
    else
    {
      this.loadGame();
      newOrLoad = "LoadGame";
    }

    this.scene.start(currentGame.mapArea, newOrLoad);
  }

  newGame()
  {
    localStorage.clear();

    localStorage.setItem("mapArea", "town1Scene");
    localStorage.setItem("playerX", 0);
    localStorage.setItem("playerY", 0);
    localStorage.setItem("maxHealth", 100);
    localStorage.setItem("currentHealth", 100);
    localStorage.setItem("maxMana", 100);
    localStorage.setItem("currentMana", 100);
    localStorage.setItem("manaRate", 1000);
    localStorage.setItem("currentLevel", 1);
    localStorage.setItem("exp", 0);
    localStorage.setItem("expForLevelUp", 100);
    localStorage.setItem("spellCount", 1);
    localStorage.setItem("attackPower", 10);
    localStorage.setItem("defensePower", 10);
    localStorage.setItem("currentGold", 0);

    currentGame.mapArea = "town1Scene";
    currentGame.playerX = 0;
    currentGame.playerY = 0;
    currentGame.maxHealth = 100;
    currentGame.currentHealth = 100;
    currentGame.maxMana = 100;
    currentGame.currentMana = 100;
    currentGame.manaRate = 1000;
    currentGame.currentLevel = 1;
    currentGame.exp = 0;
    currentGame.expForLevelUp = 100;
    currentGame.spellCount = 1;
    currentGame.attackPower = 10;
    currentGame.defensePower = 10;
    currentGame.currentGold = 0;
  }

  loadGame()
  {
    currentGame.mapArea = localStorage.getItem("mapArea");
    currentGame.playerX = localStorage.getItem("playerX");
    currentGame.playerY = localStorage.getItem("playerY");
    currentGame.maxHealth = localStorage.getItem("maxHealth");
    currentGame.currentHealth = localStorage.getItem("currentHealth");
    currentGame.maxMana = localStorage.getItem("maxMana");
    currentGame.currentMana = localStorage.getItem("currentMana");
    currentGame.manaRate = localStorage.getItem("manaRate");
    currentGame.currentLevel = localStorage.getItem("currentLevel");
    currentGame.exp = localStorage.getItem("exp");
    currentGame.expForLevelUp = localStorage.getItem("expForLevelUp");
    currentGame.spellCount = localStorage.getItem("spellCount");
    currentGame.attackPower = localStorage.getItem("attackPower");
    currentGame.defensePower = localStorage.getItem("defensePower");
    currentGame.currentGold = localStorage.getItem("currentGold");
  }
}
