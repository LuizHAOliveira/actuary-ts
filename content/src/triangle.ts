
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
    constructor (base_triangle: number[][]) {
        this.base_triangle = base_triangle;
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