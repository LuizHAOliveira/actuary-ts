
interface TrianglePeriods {
    origin: number,
    development: number
}

class VerticalHeader {

}
class HorizontalHeader {

}

export class Triangle {
    values: number[][];
    //months_span: list # (ori, dev)
    //ref_date: date
    periods:  TrianglePeriods;
    v_header: VerticalHeader;
    h_header: HorizontalHeader;
    cumulative: boolean;
    constructor (values: number[][], cumulative: boolean) {
        this.values = values;
        this.cumulative = cumulative;
    }
}

export class TriangleFactory {
    base_triangle: number[][];
    shape: number[];
    constructor (base_triangle: number[][]) {
        this.base_triangle = base_triangle;
        this.shape = [base_triangle.length, base_triangle[0].length];
    }

    private checkValidPeriods(originPeriod: number, developmentPeriod: number): boolean {
        if (originPeriod % developmentPeriod == 0)
            return true;
        return false;
    }

    buildMovementTriangle(originPeriod: number, developmentPeriod: number): Triangle {
        if (!this.checkValidPeriods(originPeriod, developmentPeriod))
            throw Error('Invalid period combination');
        let shape: number[] = this.shape;
        let originSize: number = Math.floor(shape[0] /  originPeriod) + Math.min(shape[0] % originPeriod, 1);
        let devSize: number = Math.floor(shape[1] /  developmentPeriod) + Math.min(shape[1] % developmentPeriod, 1);
        let leftOvers = shape[1] % developmentPeriod;
        let correction = leftOvers > 0 ? 1 : 0;
        let tri: number[][] = Array.apply(null, new Array(originSize)).map(
            ()=> Array.apply(null, new Array(devSize)).map(()=> 0)
            );
        let newI: number; let newJ: number; let relMonths: number;
        for (let i: number = 0; i < shape[0]; i++) {
            for (let j: number = 0; j < shape[1] - i; j++) {
                newI = Math.floor(i / originPeriod);
                relMonths = i % originPeriod + j;
                newJ = Math.floor((relMonths - leftOvers) / developmentPeriod) + correction;
                tri[newI][newJ] += this.base_triangle[i][j];
            }
        }
        return new Triangle(tri, false);
    }
}

export function createClassFactoryFromMovement (values: number[], origin: number[], development: number[],
        originSize?: number, developmentSize?: number): TriangleFactory {
    if (values.length != origin.length || origin.length != development.length)
        throw Error('The passed arrays are not of the same lenght.');
    if (originSize == undefined)
        originSize = Math.max(...origin) + 1;
    if (developmentSize == undefined) {
        let max_dev: number = Math.max(...origin, ...development) + 1;
        developmentSize = max_dev;
    }
    let tri: number[][] = Array.apply(null, new Array(originSize)).map(
        ()=> Array.apply(null, new Array(developmentSize)).map(()=> 0)
        );
    for (let i: number = 0; i < values.length; i++) {
        let row = origin[i];
        let col = development[i];
        tri[row][col] += values[i];
    }
    return new TriangleFactory(tri);
}