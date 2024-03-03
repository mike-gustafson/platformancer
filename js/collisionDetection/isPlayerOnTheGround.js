// isPlayerOnTheGround.js
// Version: 0.0.1
// Event: Any Event
// Description: Check if the player is on the ground
// Tags: player, ground, collision
// Subcategory: Collision Detection

export function isPlayerOnTheGround(player, canvas) {
    return (player.position.y >= canvas.height)
}