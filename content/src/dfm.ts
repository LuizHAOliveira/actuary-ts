import { Triangle } from "./basic-classes";


class DFMFactors {
    cdf: number[];
    //period: number;
    df: number[];
    tail: number;
    constructor (df: number[], period: number, tail?: number) {
        this.df = df;
        //this.period = period;
        if (tail == undefined)
            tail = 0;
        this.tail = tail;
        this.calculateCDF()
    }
    private calculateCDF () {
        this.cdf = new Array(this.df.length+1);
        this.cdf[this.df.length] = 1 + this.tail;
        for (let i: number = this.df.length - 1; i >= 0; i--) {
            this.cdf[i] = this.cdf[i+1] * this.df[i];
        }
    }
}
class DFCalculator {
    triangle: Triangle
    dfs_triangle: number[][]
    selection_tri: number[][]
}
/*
class DFCalculator:
    triangle: Triangle
    dfs_triangle: np.array
    selection_tri: np.array

    def __init__(self, triangle: Triangle) -> None:
        self.triangle = triangle
        self._calculate_dfs_triangle()

    def _calculate_dfs_triangle(self) -> None:
        shape = self.triangle.shape
        self.triangle.change_to_cumulative()
        tri = self.triangle.values
        self.dfs_triangle = np.full(shape, np.nan)
        for i in range(shape[0]):
            for j in range(self.triangle.maxcol_index(i)):
                self.dfs_triangle[i, j] = tri[i, j+1] / tri[i, j]
        self.selection_tri = self.dfs_triangle / self.dfs_triangle

    def calculate(self) -> DFMFactors:
        self.triangle.change_to_cumulative()
        tri_below = self.triangle.values
        tri_above = np.roll(tri_below, -1, 1)
        df = np.nansum(tri_above * self.selection_tri, 0) / np.nansum(tri_below * self.selection_tri, 0)
        df = df[:-1]
        df[np.isnan(df)] = 1
        return DFMFactors(df, self.triangle.months_span[1], self.triangle.periods[1])
*/