
function create2dArray(rowSize: number, colSize: number): number[][] {
    let arr = Array.apply(null, new Array(rowSize)).map(
        ()=> Array.apply(null, new Array(colSize)).map(()=> 0)
        );
    return arr;
}
/*interface TrianglePeriods {
    origin: number,
    development: number
}
*/
class VerticalHeader {

}
class HorizontalHeader {

}

export class Triangle {
    values: number[][];
    //months_span: list # (ori, dev)
    //ref_date: date
    v_header: VerticalHeader;
    h_header: HorizontalHeader;
    cumulative: boolean;
    shape: number[];
    periods: number[];
    constructor (values: number[][], cumulative: boolean, periods: number[]) {
        this.values = values;
        this.cumulative = cumulative;
        this.periods = periods;
        this.shape = [values.length, values[0].length];
    }
    maxColIndex(row: number): number {
        let devOriRatio: number = Math.floor(this.periods[0] / this.periods[1]);
        let index: number = this.shape[1] - row * devOriRatio - 1
        return index;
    } 
    toggleCumulative() {
        if (this.cumulative)
            this.changeToMovement();
        else
            this.changeToCumulative();
    }
    changeToCumulative () {
        if (this.cumulative)
            return;
        let newTri: number[][] = create2dArray(this.shape[0], this.shape[1]);
        for (let i: number = 0; i < this.shape[0]; i++) {
            newTri[i][0] = this.values[i][0];
            for (let j: number = 1; j < this.maxColIndex(i) + 1; j++) {
                newTri[i][j] = newTri[i][j-1] + this.values[i][j];
            }
        }
        this.values = newTri;
    }
    changeToMovement () {
        if (!this.cumulative)
            return;
        let newTri: number[][] = create2dArray(this.shape[0], this.shape[1]);
        for (let i: number = 0; i < this.shape[0]; i++) {
            newTri[i][0] = this.values[i][0];
            for (let j: number = 1; j < this.maxColIndex(i) + 1; j++) {
                newTri[i][j] =  this.values[i][j] -  this.values[i][j-1];
            }
        }
        this.values = newTri;
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
        let tri: number[][] = create2dArray(originSize, devSize);
        let newI: number; let newJ: number; let relMonths: number;
        for (let i: number = 0; i < shape[0]; i++) {
            for (let j: number = 0; j < shape[1] - i; j++) {
                newI = Math.floor(i / originPeriod);
                relMonths = i % originPeriod + j;
                newJ = Math.floor((relMonths - leftOvers) / developmentPeriod) + correction;
                tri[newI][newJ] += this.base_triangle[i][j];
            }
        }
        return new Triangle(tri, false, [originPeriod, developmentPeriod]);
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
    
    let tri: number[][] = create2dArray(originSize, developmentSize);
    for (let i: number = 0; i < values.length; i++) {
        let row = origin[i];
        let col = development[i];
        tri[row][col] += values[i];
    }
    return new TriangleFactory(tri);
}