import * as fs from 'fs';
import { Triangle, TriangleFactory, createClassFactoryFromMovement } from '../basic-classes';
import path = require('path');

let triangleMoveFile: string = path.resolve(__dirname, 'triangle_movement.csv');

interface TriangleCreationInfos {
    values: number[],
    origin: number[],
    development: number[]
}

function fileToArrays(data: string): TriangleCreationInfos {
    let rows: string[] = data.split('\n');
    rows.shift(); // Skip first line
    let cols: string[];
    let parsedData: TriangleCreationInfos = {
        values: [],
        origin: [],
        development: []
    }
    rows.forEach((r) => {
        cols = r.split('\t');
        parsedData.origin.push(Number(cols[0]));
        parsedData.development.push(Number(cols[1]));
        parsedData.values.push(Number(cols[2]));
    });
    return parsedData;
}
function testTriangleFactoryCreation(data: string): TriangleFactory {
    let parsedData: TriangleCreationInfos = fileToArrays(data);
    let triFactory: TriangleFactory = createClassFactoryFromMovement(parsedData.values,
        parsedData.origin,
        parsedData.development);
    console.log('TriangleFactory created succesfully');
    return triFactory;
}
function testTriangleCreation(factory: TriangleFactory): Triangle {
    let tri: Triangle = factory.buildMovementTriangle(3, 1);
    console.log('Triangle created succesfully');
    return tri;
}
fs.readFile(triangleMoveFile, 'utf8', (error, data) => {
    if (data != undefined) {
        let factory: TriangleFactory = testTriangleFactoryCreation(data);
        let tri = testTriangleCreation(factory);
        //console.log(factory.base_triangle.slice(3, 6));
        console.log(tri.values);
        tri.changeToCumulative();
        console.log(tri.values);
    } else {

        console.log(error);
    }
});

