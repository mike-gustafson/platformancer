// function imports
import { addPoints } from './js/addPoints.js';
import { movePlayer } from './js/movePlayer.js';
import { playerDied } from './js/playerDied.js';
import { createClouds } from './js/createClouds.js';
import { createTriangles } from './js/createTriangles.js';
import { generatePlatforms } from './js/generatePlatforms.js';

// rendering imports
import { drawScore } from './js/drawScore.js';
import { drawClouds } from './js/drawClouds.js';
import { drawTriangles } from './js/drawTriangles.js';
import { drawPlayerLives } from './js/drawPlayerLives.js';

// collision detection imports
import { isPlayerOnTheGround } from './js/collisionDetection/isPlayerOnTheGround.js';
import { isPlayerAtEndOfLevel } from './js/collisionDetection/isPlayerAtEndOfLevel.js';
import { keepPlayerOnTheScreen } from './js/collisionDetection/keepPlayerOnTheScreen.js';

// level exit imports
import { findLastPlatformY } from './js/findLastPlatformY.js';

// class imports
import { Menu } from './js/classes/menu.js';
import { Player } from './js/classes/player.js';
import { LevelExit } from './js/classes/levelExit.js';

let trianglesCurrentPosition = 0;
let trianglePeakMaxHeight = innerHeight/2;
let trianglePeakMinHeight = innerHeight/1.5;
let levelExit
let triangles = [];
let clouds = [];
let level = 1

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

let endPortalX = levelWidth;
let endPortalWidth = 40;
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
    // clear screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    // render elemnts
    drawPlayerLives(playerLives, context);
    drawClouds(clouds, player, context, levelWidth, innerWidth);
    drawScore(context, scoreTotal, scoreThisLife, scorePositionX, scorePositionY);
    drawTriangles(triangles, context, player, levelWidth, innerWidth, innerHeight);

    // update elements
    player.update(gravity, context);
    levelExit.update(context, player, levelWidth, innerWidth);
    platforms.forEach(platform => {
        platform.update(context, player, levelWidth);
    })

    // collision detection
    isPlayerOnAPlatform();
    isPlayerOnTheGround(player, canvas) ? playerDied(playerLives) ? startLevel() : gameOver() : null;
    isPlayerAtEndOfLevel(player, levelExit) ? gameOver() : null;

    // move player
    player = movePlayer(player, keys, speed, friction)
    player = keepPlayerOnTheScreen(player, levelWidth, playerStartingXPosition);

    // check if menu is displayed
    if (isMenuDisplayed) {
        return;
    }

    // request next frame
    requestAnimationFrame(loop); 
}

// FUNCTIONS --------------------------------------------------------------------------

function startLevel() {
    if (playerLives === 0) {
        gameOver()
    } else {
        playerLives--;
        player.position.x = playerStartingXPosition;
        player.position.y = 20;
        player.velocity.y = 0;
        player.velocity.x = 0;
        player.jumping = false;
        player.inLevelXPosition.x = playerStartingXPosition;
        levelExit.position.x = levelExit.initialPosition.x
        scoreThisLife=0
        platforms = generatePlatforms(level, innerHeight, levelWidth);
        backgroundMusic.play()
    }
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
    playerLives = playerStartingLives
    backgroundMusic.play();
    window.requestAnimationFrame(loop)
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

function createGameAssets() {
    player = new Player
    playerStartingXPosition = player.position.x
    platforms = generatePlatforms(level, innerHeight, levelWidth);
    let endPortalY = findLastPlatformY(platforms, endPortalHeight)
    levelExit = new LevelExit(endPortalX, endPortalY, endPortalWidth, endPortalHeight);
    triangles = createTriangles(levelWidth, trianglePeakMinHeight, trianglePeakMaxHeight, trianglesCurrentPosition);
    clouds = createClouds(levelWidth, clouds)
    player.create(context)
}

function showMenu(requestedMenu) {
    allMenus.forEach(menu => menu.hide());
    requestedMenu.show();
}