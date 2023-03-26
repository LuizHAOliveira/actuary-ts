import { Triangle, Vector } from "./basic-classes";
export declare class DFMFactors {
    cdf: number[];
    df: number[];
    private tail_;
    set tail(newTail: number);
    get tail(): number;
    constructor(df: number[], /*period: number,*/ tail?: number);
    private calculateCDF;
}
export declare class DFCalculator {
    triangle: Triangle;
    dfsTriangle: number[][];
    selections: number[][];
    constructor(triangle: Triangle);
    private calculateDFTriangle;
    private initializeSelections;
    calculate(): DFMFactors;
}
export declare function calculateDFMUltimate(triangle: Triangle, factors: DFMFactors): Vector;
