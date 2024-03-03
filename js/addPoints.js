// addPoints.js
// Version: 0.0.1
// Event: Any Event
// Description: Add points to the score when the player lands on a platform
// Tags: score, platform, points
// Subcategory: Score

export function addPoints(platform, scoredPlatforms, scoreTotal, scoreThisLife) {
    if (scoreTotal === undefined) {
        scoreTotal = 0;
    }
    if (scoreThisLife === undefined) {
        scoreThisLife = 0;
    }
    if(!scoredPlatforms.has(platform)) {
        scoredPlatforms.add(platform);
        scoreTotal += 10;
        scoreThisLife += 10;
    }
    return {scoredPlatforms, scoreTotal, scoreThisLife};
};