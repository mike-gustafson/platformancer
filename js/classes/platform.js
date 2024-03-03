// platform.js
// Version: 0.0.1
// Class: Platform
// Description: The platform class
// Tags: platform, class
// Subcategory: Environment

import { random } from '../utils.js';

export class Platform {
    constructor(levelWidth, innerHeight) {
        this.height = 15
        this.width = random(500, 100)
        this.position = {
            x: Math.floor(Math.random() * (levelWidth - this.width)),
            y: Math.floor((Math.random() * (innerHeight*.75)+(innerHeight/4)-30)),
        }
        this.isExitPlatform = false;
    }
    create(context) {
        context.fillStyle = '#565656'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(context, player, levelWidth) {
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
}   