"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileAndTest = exports.triangleFactoryCreation = void 0;
const fs = require("fs");
const basic_classes_1 = require("../src/basic-classes");
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
function triangleFactoryCreation(data) {
    let parsedData = fileToArrays(data);
    let triFactory = (0, basic_classes_1.createClassFactoryFromMovement)(parsedData.values, parsedData.origin, parsedData.development);
    return triFactory;
}
exports.triangleFactoryCreation = triangleFactoryCreation;
function testTriangleFactoryCreation(triFac) {
    if (Math.abs(triFac.base_triangle[3][10] - 46.9293780830976) < 0.001
        && Math.abs(triFac.base_triangle[1][0] - 5249.6951491389) < 0.001) {
        console.log('Factory Test: Passed');
        return true;
    }
    console.log('Factory Test: Failed');
    return false;
}
function triangleCreation(factory) {
    let tri = factory.buildMovementTriangle(3, 1);
    return tri;
}
function testTriangleCreation(tri) {
    if (Math.abs(tri.values[1][3] - 4340.408335370001) < 0.001
        && Math.abs(tri.values[5][4] - 2555.50057124) < 0.001) {
        console.log('Triangle Creation Test: Passed');
        return true;
    }
    console.log('Triangle Creation Test: Failed');
    return false;
}
function testTriangleChangeToCumulative(tri) {
    tri.changeToCumulative();
    if (Math.abs(tri.values[1][3] - 25735.20880) < 0.001
        && Math.abs(tri.values[5][4] - 31691.53174) < 0.001) {
        console.log('Triangle ChangeToCumulative Test: Passed');
        return true;
    }
    console.log('Triangle ChangeToCumulative Test: Failed');
    console.log(tri.values);
    return false;
}
function testTriangleChangeToMovement(tri) {
    tri.changeToMovement();
    if (Math.abs(tri.values[1][3] - 4340.408335370001) < 0.001
        && Math.abs(tri.values[5][4] - 2555.50057124) < 0.001) {
        console.log('Triangle ChangeToMovement Test: Passed');
        return true;
    }
    console.log('Triangle ChangeToMovement Test: Failed');
    console.log(tri.values);
    return false;
}
function testTriangleDiagonal(tri) {
    tri.changeToCumulative();
    let diagonal = tri.getDiagonal();
    let diagonal_2 = tri.getDiagonal(2);
    if (Math.abs(diagonal.values[3] - 31908.71128) < 0.001
        && Math.abs(diagonal_2.values[6] - 29786.074145) < 0.001) {
        console.log('Triangle getDiagonal Test: Passed');
        return true;
    }
    console.log('Triangle getDiagonal Test: Failed');
    console.log(diagonal.values);
    console.log(diagonal_2.values);
    return false;
}
function testTriangles(data) {
    // Not the best solution, but it works for now
    // We are testing only the most complex case: the one in which origin and development periods
    // are different
    let factory = triangleFactoryCreation(data);
    if (!testTriangleFactoryCreation(factory))
        return;
    let tri = triangleCreation(factory);
    if (!testTriangleCreation(tri))
        return;
    tri.changeToCumulative();
    if (!testTriangleChangeToCumulative(tri))
        return;
    tri.changeToMovement();
    if (!testTriangleChangeToMovement(tri))
        return;
    if (!testTriangleChangeToMovement(tri))
        return;
    if (!testTriangleDiagonal(tri))
        return;
}
function readFileAndTest(testFunction) {
    fs.readFile(triangleMoveFile, 'utf8', (error, data) => {
        if (data != undefined) {
            testFunction(data);
        }
        else {
            console.log(error);
        }
    });
}
exports.readFileAndTest = readFileAndTest;
readFileAndTest(testTriangles);
