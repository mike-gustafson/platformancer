// drawScore.js
// Version: 0.0.1
// Event: Any Event
// Description: Draw the score on the screen
// Tags: score, display
// Subcategory: Score

export function drawScore(context, scoreTotal, scoreThisLife, scorePositionX, scorePositionY) {
    context.fillStyle = 'black';
    context.font = '32px Arial';
    context.textAlign = 'center';
    context.fillText(`Total Score:  ${scoreTotal}`, scorePositionX, scorePositionY);
    context.fillText(`This Life:  ${scoreThisLife}`, scorePositionX, scorePositionY+32);
}