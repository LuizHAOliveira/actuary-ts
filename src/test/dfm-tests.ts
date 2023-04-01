import { TriangleFactory, Triangle, Vector, DFCalculator, DFMFactors, calculateDFMUltimate } from "../";
import { triangleFactoryCreation } from "./triangle-creation";
import { data } from './test-data';

function testDFMCalculator(dfmCalc: DFCalculator) {
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
function testDFMCreation(dfmCalc: DFCalculator) {
    let dfms: DFMFactors = dfmCalc.calculate();
    //console.log(dfms);
    dfms.tail = 0.1;
    //console.log(dfms);
}
function testDFMUltimate(triangle: Triangle, dfm: DFMFactors) {
    let ultimate: Vector = calculateDFMUltimate(triangle, dfm);
    console.log(ultimate);
}
function testDFM(data: string) {
    let fac: TriangleFactory = triangleFactoryCreation(data);
    let tri = fac.buildMovementTriangle(3, 3);
    let dfmCalc = new DFCalculator(tri);
    if (!testDFMCalculator(dfmCalc))
        return;
    let dfms: DFMFactors = dfmCalc.calculate();
    testDFMCreation(dfmCalc);
    testDFMUltimate(tri, dfms)
}

testDFM(data);
//readFileAndTest(testDFM);