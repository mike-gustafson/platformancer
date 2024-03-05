// keyboardEvents.js
// Version: 0.0.1
// Event: Any Event
// Description: Keyboard events
// Tags: keyboard, event listeners
// Subcategory: Event Listeners

// keyboardEvents.js
export function setupKeyboardEvents(player, keys, soundPlayerJumping, isPlayerOnAPlatform) {
    console.log(player)
    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65: keys.left.pressed = true; break;
            case 68: keys.right.pressed = true; break;
            case 32:
                if (!player.jumping) {
                    if (isPlayerOnAPlatform()) {
                        player.velocity.y = -20;
                        player.jumping = true;
                        soundPlayerJumping.play();
                    }
                }
                break;
        }
    });

    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 65: keys.left.pressed = false; break;
            case 68: keys.right.pressed = false; break;
        }
    });
}
