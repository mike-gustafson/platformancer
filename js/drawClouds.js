// drawClouds.js
// Version: 0.0.1
// Event: Any Event
// Description: Draw the clouds in the background
// Tags: background, cloud
// Subcategory: Background

export function drawClouds(clouds, player, context, levelWidth, innerWidth) {    
    for (let i = 0; i < clouds.length; i++){
        if (
            (player.position.x <= 100 && player.inLevelXPosition.x >= 100) ||
            (player.inLevelXPosition.x < levelWidth && player.position.x >= innerWidth / 2)
        ) {
            if (player.velocity.x !== 0) {
            clouds[i].x -= player.velocity.x/4;
        }
    }
        context.beginPath();
        context.arc(clouds[i].x, clouds[i].y, 60, Math.PI * 0.5, Math.PI * 1.5);
        context.arc(clouds[i].x + 70, clouds[i].y - 60, 70, Math.PI * 1, Math.PI * 1.85);
        context.arc(clouds[i].x + 152, clouds[i].y - 45, 50, Math.PI * 1.37, Math.PI * 1.91);
        context.arc(clouds[i].x + 200, clouds[i].y, 60, Math.PI * 1.5, Math.PI * 0.5);
        context.moveTo(clouds[i].x + 200, clouds[i].y + 60);
        context.lineTo(clouds[i].x, clouds[i].y + 60);
        context.strokeStyle = '#797874';
        context.stroke();
        context.fillStyle = '#ffffff';
        context.fill();
    }
}