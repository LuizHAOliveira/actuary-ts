interface TrianglePeriods {
    origin: number;
    development: number;
}
declare class VerticalHeader {
}
declare class HorizontalHeader {
}
export declare class Triangle {
    values: number[][];
    periods: TrianglePeriods;
    v_header: VerticalHeader;
    h_header: HorizontalHeader;
    cumulative: boolean;
    constructor(values: number[][], cumulative: boolean);
}
export declare class TriangleFactory {
    base_triangle: number[][];
    constructor(base_triangle: number[][]);
}
export declare function createClassFactoryFromMovement(values: number[], origin: number[], development: number[], originSize?: number, developmentSize?: number): TriangleFactory;
export {};
