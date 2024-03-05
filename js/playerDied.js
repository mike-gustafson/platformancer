// playerDied.js
// Version: 0.0.1
// Event: Any Event
// Description: Remove a life from a player when they die
// Tags: player, death, collision
// Subcategory: Player Lives

export function playerDied(playerLives) {
    let livesRemaining = playerLives - 1;
    if (livesRemaining < 0) {
        return { alive: false, lives: 0 }
    } else {
        return { alive: true, lives: livesRemaining }
    }
}