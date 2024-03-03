// levelExit.js
// Version: 0.0.1
// Class: LevelExit
// Description: The level exit class
// Tags: level, exit, class
// Subcategory: UI

export class LevelExit {
    constructor(x, y, width, height) {
        this.initialPosition = { x, y };
        this.position = { ...this.initialPosition};
        this.width = width;
        this.height = height;
    }

    create(context) {
        context.fillStyle = 'green'; // You can set the color to whatever you prefer
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(context, player, levelWidth, innerWidth) {
        this.create(context)
        this.position.x = Math.round(this.position.x);
        if (
            (player.position.x <= 100 && player.inLevelXPosition.x >= 100) ||
            (player.inLevelXPosition.x < levelWidth && player.position.x >= innerWidth / 2)
        ) {
            if (player.velocity.x !== 0){
                this.position.x -= player.velocity.x;
            }
        }
    }
    reset() {
        this.position = this.initialPosition;
        this.create(context)
    }
}