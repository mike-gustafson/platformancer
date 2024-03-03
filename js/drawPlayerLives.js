// drawPlayerLives.js
// Version: 0.0.1
// Event: Any Event
// Description: Draw the player's lives on the screen
// Tags: player, lives, display
// Subcategory: Player

export function drawPlayerLives(playerLives, context) {
    for (let i = 0; i < playerLives; i++) {
        let x = 180 - (i * 40);
        let y = 20;
        context.fillStyle = 'firebrick';
        context.fillRect(x, y, 32, 32);
    }
}