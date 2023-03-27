import { Triangle, TriangleFactory, Vector, createTriangleFactoryFromMovement } from '../src/basic-classes';
import { data } from './test-data';

//let triangleMoveFile: string = path.resolve(__dirname, 'triangle_movement.csv');
let triangleMoveFile: string = './triangle_movement.csv';

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
export function triangleFactoryCreation(data: string): TriangleFactory {
    let parsedData: TriangleCreationInfos = fileToArrays(data);
    let triFactory: TriangleFactory = createTriangleFactoryFromMovement(parsedData.values,
        parsedData.origin,
        parsedData.development);
    return triFactory;
}
function testTriangleFactoryCreation(triFac: TriangleFactory): boolean {
    if (Math.abs(triFac.base_triangle[3][10] - 46.9293780830976) < 0.001
        && Math.abs(triFac.base_triangle[1][0] - 5249.6951491389) < 0.001) {
            console.log('Factory Test: Passed');
            return true;
        }
        console.log('Factory Test: Failed');
    return false;
}
function triangleCreation(factory: TriangleFactory): Triangle {
    let tri: Triangle = factory.buildMovementTriangle(3, 1);
    return tri;
}
function testTriangleCreation(tri: Triangle): boolean{
    if (Math.abs(tri.values[1][3] - 4340.408335370001) < 0.001
        && Math.abs(tri.values[5][4] - 2555.50057124) < 0.001) {
            console.log('Triangle Creation Test: Passed');
            return true;
        }
        console.log('Triangle Creation Test: Failed');
    return false;
}
function testTriangleChangeToCumulative(tri: Triangle): boolean {
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
function testTriangleChangeToMovement(tri: Triangle): boolean {
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
function testTriangleDiagonal(tri: Triangle): boolean {
    tri.changeToCumulative();
    let diagonal: Vector = tri.getDiagonal();
    let diagonal_2: Vector = tri.getDiagonal(2);
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

function testTriangles(data: string) {
    // Not the best solution, but it works for now
    // We are testing only the most complex case: the one in which origin and development periods
    // are different
    let factory: TriangleFactory = triangleFactoryCreation(data);
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


testTriangles(data);

//export function readFileAndTest(testFunction: Function) {
//    fs.readFile(triangleMoveFile, 'utf8', (error, data) => {
//         if (data != undefined) {
//             testFunction(data);
//         } else {
//             console.log(error);
//         }
//     });
// }

//readFileAndTest(testTriangles);

