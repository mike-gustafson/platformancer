// findLastPlatformY.js
// Version: 0.0.1
// Event: Any Event
// Description: Find the Y position of the last platform in the level
// Tags: platform, level, last
// Subcategory: Platform

export function findLastPlatformY(platforms, endPortalHeight) {
    return platforms[platforms.length - 1].position.y + platforms[platforms.length - 1].height - endPortalHeight;
}