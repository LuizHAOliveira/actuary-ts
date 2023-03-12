"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const triangle_1 = require("../triangle");
const path = require("path");
let triangleMoveFile = path.resolve(__dirname, 'triangle_movement.csv');
function fileToArrays(data) {
    let rows = data.split('\n');
    rows.shift(); // Skip first line
    let cols;
    let parsedData = {
        values: [],
        origin: [],
        development: []
    };
    rows.forEach((r) => {
        cols = r.split('\t');
        parsedData.origin.push(Number(cols[0]));
        parsedData.development.push(Number(cols[1]));
        parsedData.values.push(Number(cols[2]));
    });
    return parsedData;
}
function testTriangleFactoryCreation(data) {
    let parsedData = fileToArrays(data);
    let triFactory = (0, triangle_1.createClassFactoryFromMovement)(parsedData.values, parsedData.origin, parsedData.development);
    console.log('TriangleFactory created succesfully');
    return triFactory;
}
function testTriangleCreation(factory) {
    let tri = factory.buildMovementTriangle(3, 1);
    console.log('Triangle created succesfully');
    return tri;
}
fs.readFile(triangleMoveFile, 'utf8', (error, data) => {
    if (data != undefined) {
        let factory = testTriangleFactoryCreation(data);
        let tri = testTriangleCreation(factory);
        //console.log(factory.base_triangle.slice(3, 6));
        console.log(tri.values);
        tri.changeToCumulative();
        console.log(tri.values);
    }
    else {
        console.log(error);
    }
});
