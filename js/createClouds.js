// createClouds.js
// Version: 0.0.1
// Event: Any Event
// Description: Create the clouds in the background
// Tags: background, cloud
// Subcategory: Background

import { random } from "./utils.js";

export function createClouds(levelWidth, clouds) {
    let cloudX = 0;
    while (cloudX < levelWidth) {
        clouds.push({x: random(100,500)+cloudX,y: random(200, 400)});
        cloudX = cloudX + random(100,500);
    }
    return clouds;
}