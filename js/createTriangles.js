// createTriangles.js
// Version: 0.0.1
// Event: Any Event
// Description: Create the triangle "mountains" in the background
// Tags: background, triangle, mountain
// Subcategory: Background

import { random } from "./utils.js";

export function createTriangles(levelWidth, trianglePeakMinHeight, trianglePeakMaxHeight, trianglesCurrentPosition){
    let triangles = [];
    let lastPosition;
    let a;
    let b;
    let c;
    let cXOffset;
    while (trianglesCurrentPosition < levelWidth) {
        a = trianglesCurrentPosition;
        lastPosition = trianglesCurrentPosition;
        c = random(trianglePeakMinHeight, trianglePeakMaxHeight)
        b = c/2 + trianglesCurrentPosition;
        cXOffset = lastPosition+(b-a)/2
        triangles.push({a, b, c, cXOffset})
        trianglesCurrentPosition = b
    }
    return triangles;
}
