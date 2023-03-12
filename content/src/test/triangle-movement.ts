import * as fs from 'fs';
import { TriangleFactory, createClassFactoryFromMovement } from '../triangle';
import path = require('path');

let triangleMoveFile: string = path.resolve(__dirname, 'triangle_movement.csv');

interface TriangleCreationInfos {
    values: number[],
    origin: number[],
    development: number[]
}

function FileToArrays(data: string): TriangleCreationInfos {
    let rows: string[] = data.split('\n');
    rows.shift();
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
function TestTriangleCreation(data: string) {
    let parsedData: TriangleCreationInfos = FileToArrays(data);
    let triFactory: TriangleFactory = createClassFactoryFromMovement(parsedData.values,
        parsedData.origin,
        parsedData.development);
    console.log(triFactory.base_triangle);
}
fs.readFile(triangleMoveFile, 'utf8', (error, data) => {
    if (data != undefined) {
        TestTriangleCreation(data);
    } else {

        console.log(error);
    }
});

