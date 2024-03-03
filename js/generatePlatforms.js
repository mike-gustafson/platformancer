// generatePlatforms.js
// Version: 0.0.1
// Event: Any Event
// Description: Generate platforms for the level
// Tags: platform, level, generate
// Subcategory: Platform

import { Platform } from "./classes/platform.js";
import level1Platforms from '../levels/level-01.js';

const levelDataMap = {
    1: level1Platforms,
};

export function generatePlatforms(level, innerHeight, levelWidth) {
    const platformData = levelDataMap[level];

    if (!platformData) {
        throw new Error(`No platform data found for level ${level}`);
    }

    let platforms = platformData.map((platformData) => {
        let platform = new Platform(levelWidth, innerHeight);
        platform.position.x = platformData.x;
        platform.position.y = innerHeight/2 + platformData.y;
        platform.width = platformData.width;
        return platform;
    });
    const levelExitPlatform = new Platform();
    levelExitPlatform.position.x = levelWidth - 40; // Position it at levelWidth - 40
    levelExitPlatform.position.y = 400;
    levelExitPlatform.width = 150;
    platforms.push(levelExitPlatform);
    
    return platforms;
}