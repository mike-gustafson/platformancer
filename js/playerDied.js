// playerDied.js
// Version: 0.0.1
// Event: Any Event
// Description: Remove a life from a player when they die
// Tags: player, death, collision
// Subcategory: Player Lives

export function playerDied(playerLives) {
    if (playerLives >= 0) {
        return true;
    } else {
        return false;
    }
}