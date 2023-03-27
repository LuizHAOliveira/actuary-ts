export declare function create2dArray(rowSize: number, colSize: number): number[][];
export declare class Vector {
    values: number[];
    shape: number;
    period: number;
    constructor(values: number[], period: number);
}
export declare class Triangle {
    values: number[][];
    cumulative: boolean;
    shape: number[];
    periods: number[];
    constructor(values: number[][], cumulative: boolean, periods: number[]);
    maxColIndex(row: number): number;
    getDiagonal(diagonalIndex?: number): Vector;
    toggleCumulative(): void;
    changeToCumulative(): void;
    changeToMovement(): void;
}
export declare class TriangleFactory {
    base_triangle: number[][];
    shape: number[];
    constructor(base_triangle: number[][]);
    private checkValidPeriods;
    buildMovementTriangle(originPeriod: number, developmentPeriod: number): Triangle;
}
export declare function createTriangleFactoryFromMovement(values: number[], origin: number[], development: number[], originSize?: number, developmentSize?: number): TriangleFactory;
