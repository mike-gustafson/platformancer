// isPlayerAtEndOfLevel.js
// Version: 0.0.1
// Event: Any Event
// Description: Check if the player has reached the end of the level
// Tags: player, level, end
// Subcategory: Collision Detection

export function isPlayerAtEndOfLevel(player, levelExit) {
    return (
        player.inLevelXPosition.x >= levelExit.initialPosition.x &&
        player.inLevelXPosition.x <= levelExit.initialPosition.x + levelExit.width &&
        player.position.y + player.height >= levelExit.initialPosition.y &&
        player.position.y <= levelExit.initialPosition.y + levelExit.height
    ) ? true : false;
}