import { Triangle, Vector, create2dArray } from "./basic-classes";


export class DFMFactors {
    cdf: number[];
    //period: number;
    df: number[];
    private tail_: number;
    set tail(newTail: number) {
        if (newTail < -1) 
            throw Error('The tail of a DFM cannot assume values below 100%.');
        this.tail_ = newTail;
        this.calculateCDF()
    }
    get tail(): number {
        return this.tail_;
    }
    constructor (df: number[], /*period: number,*/ tail?: number) {
        this.df = df;
        //this.period = period;
        if (tail == undefined)
            tail = 0;
        this.tail_ = tail;
        this.calculateCDF()
    }
    private calculateCDF () {
        this.cdf = new Array(this.df.length+1);
        this.cdf[this.df.length] = 1 + this.tail_;
        for (let i: number = this.df.length - 1; i >= 0; i--) {
            this.cdf[i] = this.cdf[i+1] * this.df[i];
        }
    }
}
export class DFCalculator {
    triangle: Triangle;
    dfsTriangle: number[][];
    selections: number[][];

    constructor (triangle: Triangle) {
        triangle.changeToCumulative(); // Should change this variable to be passed by value
        this.triangle = triangle;
        this.calculateDFTriangle();
        this.initializeSelections();
    }
    private calculateDFTriangle () {
        let dfsTriangle: number[][] = create2dArray(this.triangle.shape[0]-1, this.triangle.shape[1]-1);
        this.triangle.changeToCumulative()
        for (let i: number = 0; i < dfsTriangle.length; i++) {
            for (let j: number = 0; j < this.triangle.maxColIndex(i); j++) {
                dfsTriangle[i][j] = this.triangle.values[i][j+1] / this.triangle.values[i][j];
            }
        }
        this.dfsTriangle = dfsTriangle;
    }
    private initializeSelections () {
        let selections: number[][] = create2dArray(this.triangle.shape[0]-1, this.triangle.shape[1]-1);
        this.triangle.changeToCumulative()
        for (let i: number = 0; i < selections.length; i++) {
            for (let j: number = 0; j < this.triangle.maxColIndex(i); j++) {
                if (this.triangle.values[i][j] > 0)
                    selections[i][j] = 1;
            }
        }
        this.selections = selections;
    }
    calculate (): DFMFactors {
        this.triangle.changeToCumulative();
        let factors: number[] = Array.apply(null, new Array(this.triangle.shape[1]-1)).map(()=> 0);
        let numerator: number;
        let denominator: number;

        for (let j: number = 0; j < this.triangle.shape[1]-1; j++) {
            numerator = 0;
            denominator = 0;
            let i: number = 0;
            while (j < this.triangle.maxColIndex(i)) {
                numerator += this.triangle.values[i][j+1] * this.selections[i][j];
                denominator += this.triangle.values[i][j] * this.selections[i][j];
                i++;
            }
            factors[j] = numerator / denominator;
        }
        return new DFMFactors(factors);
    }

}
export function calculateDFMUltimate(triangle: Triangle, factors: DFMFactors) {
    // Since we are not storing the information related to periods and month spans
    // We are suposing that they match between the triangle and the CDF
    triangle.changeToCumulative();
    let ultimateVals: number[] = Array.apply(null, new Array(triangle.shape[0])).map(()=> 0);
    let diagonal: Vector = triangle.getDiagonal();
    for (let i: number = 0; i < triangle.shape[0]; i++) {
        console.log(diagonal.values[i], factors.cdf[triangle.shape[0]-i-1]);
        ultimateVals[i] = diagonal.values[i] * factors.cdf[triangle.shape[0]-i-1];
    }
    return new Vector(ultimateVals, triangle.periods[0]);
}
