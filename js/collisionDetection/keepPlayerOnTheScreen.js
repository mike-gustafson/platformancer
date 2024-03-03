// keepPlayerOnTheScreen.js
// Version: 0.0.1
// Event: Any Event
// Description: Keep the player on the screen
// Tags: player, screen, collision
// Subcategory: Collision Detection

export function keepPlayerOnTheScreen(player, levelWidth, playerStartingXPosition) {
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
    return player;
}
