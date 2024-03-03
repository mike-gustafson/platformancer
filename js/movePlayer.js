// movePlayer.js
// Version: 0.0.1
// Event: Any Event
// Description: Move the player left and right
// Tags: player, movement
// Subcategory: Movement

export function movePlayer(player, keys, speed, friction) {

        if (keys.left.pressed) {
            player.velocity.x = -speed;
        }
        if (keys.right.pressed) {
            player.velocity.x = speed;
        }
        else {
            player.velocity.x *= friction;
        }
        player.position.x += player.velocity.x;
        return player;
}
