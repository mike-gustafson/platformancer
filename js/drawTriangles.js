// drawTriangles.js
// Version: 0.0.1
// Event: Any Event
// Description: Draw the triangles on the screen
// Tags: triangle, display
// Subcategory: Background

export function drawTriangles(triangles, context, player, levelWidth, innerWidth, innerHeight) {
    for (let i = 0; i < triangles.length; i++) {        
        if (
            (player.position.x <= 100 && player.inLevelXPosition.x >= 100) ||
            (player.inLevelXPosition.x < levelWidth && player.position.x >= innerWidth / 2)
        ) {
            if (player.velocity.x !== 0) {
                triangles[i].a -= player.velocity.x/16;
                triangles[i].b -= player.velocity.x/16;
                triangles[i].cXOffset -= player.velocity.x/16;
            }
        }
        context.beginPath();
        context.moveTo(triangles[i].a, innerHeight);
        context.lineTo(triangles[i].b, innerHeight);
        context.lineTo(triangles[i].cXOffset, innerHeight - triangles[i].c);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = '#666666';
        context.stroke();
        context.fillStyle = "#b1a849";
        context.fill();
    }
} 