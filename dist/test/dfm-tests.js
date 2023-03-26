"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const triangle_creation_1 = require("./triangle-creation");
function testDFMCalculator(dfmCalc) {
    if (Math.abs(dfmCalc.dfsTriangle[0][2] - 1.016751024) < 0.001
        && Math.abs(dfmCalc.dfsTriangle[4][1] - 1.020205912) < 0.001) {
        console.log('DFCalculator dfsTriangle Test: Passed');
        return true;
    }
    console.log('DFCalculator dfsTriangle Test: Failed');
    console.log(dfmCalc.triangle.values);
    console.log(dfmCalc.dfsTriangle);
    return false;
}
function testDFMCreation(dfmCalc) {
    let dfms = dfmCalc.calculate();
    //console.log(dfms);
    dfms.tail = 0.1;
    //console.log(dfms);
}
function testDFMUltimate(triangle, dfm) {
    let ultimate = (0, src_1.calculateDFMUltimate)(triangle, dfm);
    console.log(ultimate);
}
function testDFM(data) {
    let fac = (0, triangle_creation_1.triangleFactoryCreation)(data);
    let tri = fac.buildMovementTriangle(3, 3);
    let dfmCalc = new src_1.DFCalculator(tri);
    if (!testDFMCalculator(dfmCalc))
        return;
    let dfms = dfmCalc.calculate();
    testDFMCreation(dfmCalc);
    testDFMUltimate(tri, dfms);
}
(0, triangle_creation_1.readFileAndTest)(testDFM);
