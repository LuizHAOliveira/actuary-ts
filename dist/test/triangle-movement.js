"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const triangle_1 = require("../triangle");
const path = require("path");
let triangleMoveFile = path.resolve(__dirname, 'triangle_movement.csv');
function FileToArrays(data) {
    let rows = data.split('\n');
    rows.shift();
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
function TestTriangleCreation(data) {
    let parsedData = FileToArrays(data);
    let triFactory = (0, triangle_1.createClassFactoryFromMovement)(parsedData.values, parsedData.origin, parsedData.development);
    console.log(triFactory.base_triangle);
}
fs.readFile(triangleMoveFile, 'utf8', (error, data) => {
    if (data != undefined) {
        TestTriangleCreation(data);
    }
    else {
        console.log(error);
    }
});
