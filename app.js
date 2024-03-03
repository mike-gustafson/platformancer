// level imports
import level01Platforms from './levels/level-01.js';

// function imports
import { addPoints } from './js/addPoints.js';
import { movePlayer } from './js/movePlayer.js';
import { createClouds } from './js/createClouds.js';
import { createTriangles } from './js/createTriangles.js';
import { drawClouds } from './js/drawClouds.js';
import { drawScore } from './js/drawScore.js';
// class imports
import { Menu } from './js/classes/menu.js';
import { Player } from './js/classes/player.js';
import { Platform } from './js/classes/platform.js';
import { LevelExit } from './js/classes/levelExit.js';

let trianglesCurrentPosition = 0;
let trianglePeakMaxHeight = innerHeight/2;
let trianglePeakMinHeight = innerHeight/1.5;
let levelExit
let triangles = [];
let clouds = [];

// canvas setup
const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

// menu
let isMenuDisplayed = true;
let displayMenuImage = true;

const menuImage = document.getElementById('image');
const menuNavToOptions = document.getElementById('nav-to-options');
const menuNavToCredits = document.getElementById('nav-to-credits');
const menuNavToLevelSelect = document.getElementById('nav-to-level-select');
const menuNavToInstructions = document.getElementById('nav-to-instructions');
const menuNavToMain = document.getElementsByClassName('navigate-to-main-menu');
const menuNavToTechnicalInfo = document.getElementById('nav-to-technical-info');

const startButton = document.getElementById('start-button');
const finalScoreText = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// player variables
let player;
let playerLanded = false;
let playerStartingXPosition;
let playerStartingLives = 3;
let playerLives = playerStartingLives;

// score variables
const scorePositionX = canvas.width / 2;
const scorePositionY = 50;
let scoreTotal = 0;
let scoreThisLife = 0;

// level variables
let platforms;
let levelWidth = 10000;
let scoredPlatforms = new Set();

let endOfLevel = levelWidth;
let endPortalX = levelWidth - 48;
let endPortalY;
let endPortalWidth = 48;
let endPortalHeight = 100;

// Sounds
const musicMenu = new Audio("sounds/Funk'e'Tony_-_Funkafe.mp3");
const soundPlayerLanding = new Audio('sounds/332661__reitanna__big-thud.wav');
const soundPlayerJumping = new Audio('sounds/399095__plasterbrain__8bit-jump.wav');
const soundGameOver = new Audio('sounds/362204__taranp__horn_fail_wahwah_3.wav');
const backgroundMusic = new Audio('sounds/Kirill_Kharchenko_-_Background_Hip-Hop_Funk.mp3');

const menuMain = new Menu('start-menu');
const menuWelcome = new Menu('welcome-menu');
const menuOptions = new Menu('options-menu');
const menuCredits = new Menu('credits-menu');
const menuGameOver = new Menu('game-over-menu');
const menuContainer = new Menu('menu-container');
const menuLevelSelect = new Menu('level-select-menu');
const menuInstructions = new Menu('instructions-menu');
const menuTechnicalInfo = new Menu('technical-info-menu');

const allMenus = [menuMain, menuWelcome, menuOptions, menuCredits, menuGameOver, menuLevelSelect, menuInstructions, menuTechnicalInfo];

startButton.addEventListener('click', menuStartGame);
restartButton.addEventListener('click', menuStartGame);
menuNavToOptions.addEventListener('click', () => showMenu(menuOptions));
menuNavToCredits.addEventListener('click', () => showMenu(menuCredits));
menuNavToLevelSelect.addEventListener('click', () => showMenu(menuLevelSelect));
menuNavToInstructions.addEventListener('click', () => showMenu(menuInstructions));
menuNavToTechnicalInfo.addEventListener('click', () => showMenu(menuTechnicalInfo));
menuWelcome.show();
// Physics Variables
let speed = 5;
let friction = .7;
let gravity = 1.3;
let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

// INPUT EVENT LISTENERS--------------------------------------------------------------
onload = function() {
    for(var i = 0; i < menuNavToMain.length; i++) {
        let eachOne = menuNavToMain[i];
        eachOne.onclick = function() {
            menuCredits.hide();
            menuInstructions.hide();
            menuLevelSelect.hide();
            menuOptions.hide();
            menuTechnicalInfo.hide();
            menuGameOver.hide();
            if (displayMenuImage) {
                menuImage.style.display = 'flex'
            }
            menuMain.show();
        }
    }
}

addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65: keys.left.pressed = true
            break;
            case 68: keys.right.pressed = true    
            break;
            case 32:
                if (!player.jumping) {
                    if (isPlayerOnAPlatform()) {
                        player.velocity.y = -20;
                        player.jumping = true
                        playerLanded = false
                        soundPlayerJumping.play();
                    }
                }
                break;
        }
    });

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
            break;
        case 32:
            if (!player.jumping) {
            }
            break;
        case 68:
            keys.right.pressed = false            
            break;
    }
});

// GAME LOOP -------------------------------------------------------------------------
const loop = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTriangles();
    drawClouds(clouds, player, context, levelWidth, innerWidth);
    player.update(gravity, context);
    levelExit.update(context, player, levelWidth, innerWidth);
    drawScore(context, scoreTotal, scoreThisLife, scorePositionX, scorePositionY);
    platforms.forEach(platform => {
        platform.update(context, player, levelWidth);
    })
    drawPlayerLives();
    isPlayerOnAPlatform();
    isPlayerOnTheGround();
    isPlayerAtEndOfLevel();
    player = movePlayer(player, keys, speed, friction)
    keepPlayerOnTheScreen();
    if (isMenuDisplayed) {
        return;
    }
    requestAnimationFrame(loop); 
}

// FUNCTIONS --------------------------------------------------------------------------

function isPlayerAtEndOfLevel() {
    if (
        player.inLevelXPosition.x >= levelExit.initialPosition.x &&
        player.inLevelXPosition.x <= levelExit.initialPosition.x + levelExit.width &&
        player.position.y + player.height >= levelExit.initialPosition.y &&
        player.position.y <= levelExit.initialPosition.y + levelExit.height
    ) {
        gameOver()
    }
}
function findLastPlatformY() {
    let highestY = -1;
    platforms.forEach(platform => {
        if (platform.position.x > levelWidth) {
            highestY = platform.position.y;
        }
    });
    return highestY;
}
function generatePlatforms() {
    let initialPlatformData = level01Platforms.map((platformData) => {
        let platform = new Platform(levelWidth, innerHeight);
        platform.position.x = platformData.x;
        platform.position.y = innerHeight/2 + platformData.y;
        platform.width = platformData.width;
        return platform;
    });
    const levelExitPlatform = new Platform();
    levelExitPlatform.position.x = levelWidth - 40; // Position it at levelWidth - 40
    levelExitPlatform.position.y = 400;
    levelExitPlatform.width = 150;
    initialPlatformData.push(levelExitPlatform);
    return initialPlatformData;
}

function gameOver() {
    backgroundMusic.pause()
    soundGameOver.play()
    menuContainer.show();
    showMenu(menuGameOver);
    isMenuDisplayed = true
    musicMenu.play()
    if (displayMenuImage) {
        menuImage.style.display = 'flex'
    }
    finalScoreText.textContent = `${scoreTotal}`
    isMenuDisplayed = true
}

function menuStartGame() {
    createGameAssets()
    menuMain.hide();
    menuContainer.hide();
    isMenuDisplayed = false
    displayMenuImage = false
    musicMenu.pause()
    scoreThisLife = 0;
    scoreTotal = 0
    endPortalY = findLastPlatformY()
    playerLives = playerStartingLives
    levelExit = new LevelExit(levelWidth - 40, 300, 40, 100);
    backgroundMusic.play();
    window.requestAnimationFrame(loop)
}
function drawPlayerLives() {
    for (let i = 0; i < playerLives; i++) {
        let x = 180 - (i * 40);
        let y = 20;
        context.fillStyle = 'firebrick';
        context.fillRect(x, y, 32, 32);
    }
}
function isPlayerOnAPlatform() {
    for (let platform of platforms) {
        if (
            player.position.y >= platform.position.y - player.height &&
            player.position.y <= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.jumping = false;
            if (!playerLanded) {
                soundPlayerLanding.play()
                playerLanded = true;
            }
            player.position.y = platform.position.y - player.height;
            player.velocity.y = 0
            let addPointsResults = addPoints(platform, scoredPlatforms, scoreTotal, scoreThisLife);
            scoredPlatforms = addPointsResults.scoredPlatforms;
            scoreTotal = addPointsResults.scoreTotal;
            scoreThisLife = addPointsResults.scoreThisLife;
            return true;
        }
    }
    return false;
}
function isPlayerOnTheGround() {
    if (player.position.y +player.height >= canvas.height) {
        if (playerLives > 0) {
            playerLives--;
            player.position.x = playerStartingXPosition;
            player.position.y = 20;
            player.velocity.y = 0;
            player.velocity.x = 0;
            player.jumping = false;
            player.inLevelXPosition.x = playerStartingXPosition;
            levelExit.position.x = levelExit.initialPosition.x
            scoreThisLife=0
            platforms = generatePlatforms();
        } else if (playerLives===0){
            gameOver()
        }
    }
}
function keepPlayerOnTheScreen() {
    if (player.inLevelXPosition.x > levelWidth) {
        player.inLevelXPosition.x = levelWidth
    }
    if (player.inLevelXPosition.x < 0) {
        player.inLevelXPosition.x = playerStartingXPosition;
    }
    if (player.inLevelXPosition.x < levelWidth) {
        player.inLevelXPosition.x += player.velocity.x;
    }
    if (player.position.x < 100) {
        player.position.x = 100
    } else if (player.position.x > innerWidth/2) {
        player.position.x = innerWidth/2 
    }
}

function createGameAssets() {
    player = new Player
    playerStartingXPosition = player.position.x
    platforms = generatePlatforms();
    levelExit = new LevelExit(levelWidth - 40, 300, 40, 100);
    triangles = createTriangles(levelWidth, trianglePeakMinHeight, trianglePeakMaxHeight, trianglesCurrentPosition);
    clouds = createClouds(levelWidth, clouds)
    player.create(context)
}
function drawTriangles() {
    for (let i = 0; i < triangles.length; i++) {        
        if (
            (player.position.x <= 100 && player.inLevelXPosition.x >= 100) ||
            (player.inLevelXPosition.x < levelWidth && player.position.x >= innerWidth / 2)
        ) {
            if (player.velocity.x !== 0) {
                triangles[i].a -= player.velocity.x/16;
                triangles[i].b -= player.velocity.x/16;
                triangles[i].cXOffset -= player.velocity.x/16;
            }
        }
        context.beginPath();
        context.moveTo(triangles[i].a, innerHeight);
        context.lineTo(triangles[i].b, innerHeight);
        context.lineTo(triangles[i].cXOffset, innerHeight - triangles[i].c);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = '#666666';
        context.stroke();
        context.fillStyle = "#b1a849";
        context.fill();
    }
} 

function showMenu(requestedMenu) {
    allMenus.forEach(menu => menu.hide());
    requestedMenu.show();
}