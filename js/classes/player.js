// player.js
// Version: 0.0.1
// Class: Player
// Description: The player class
// Tags: player, class
// Subcategory: Characters

export class Player {
    constructor() {
        this.position = {
            x: 180,
            y: 20
        }
        this.inLevelXPosition = {
            x: 180
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 32
        this.height = 32
        this.jumping = false;
    }

    create(context) {
        context.fillStyle = 'firebrick'
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.strokeStyle = '#666666';
    }
    update(gravity, context) {
        this.create(context);
        this.position.x = Math.round(this.position.x);
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    }
}