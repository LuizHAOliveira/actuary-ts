"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDFMUltimate = exports.DFCalculator = exports.DFMFactors = void 0;
const basic_classes_1 = require("./basic-classes");
class DFMFactors {
    set tail(newTail) {
        if (newTail < -1)
            throw Error('The tail of a DFM cannot assume values below 100%.');
        this.tail_ = newTail;
        this.calculateCDF();
    }
    get tail() {
        return this.tail_;
    }
    constructor(df, /*period: number,*/ tail) {
        this.df = df;
        //this.period = period;
        if (tail == undefined)
            tail = 0;
        this.tail_ = tail;
        this.calculateCDF();
    }
    calculateCDF() {
        this.cdf = new Array(this.df.length + 1);
        this.cdf[this.df.length] = 1 + this.tail_;
        for (let i = this.df.length - 1; i >= 0; i--) {
            this.cdf[i] = this.cdf[i + 1] * this.df[i];
        }
    }
}
exports.DFMFactors = DFMFactors;
class DFCalculator {
    constructor(triangle) {
        triangle.changeToCumulative(); // Should change this variable to be passed by value
        this.triangle = triangle;
        this.calculateDFTriangle();
        this.initializeSelections();
    }
    calculateDFTriangle() {
        let dfsTriangle = (0, basic_classes_1.create2dArray)(this.triangle.shape[0] - 1, this.triangle.shape[1] - 1);
        this.triangle.changeToCumulative();
        for (let i = 0; i < dfsTriangle.length; i++) {
            for (let j = 0; j < this.triangle.maxColIndex(i); j++) {
                dfsTriangle[i][j] = this.triangle.values[i][j + 1] / this.triangle.values[i][j];
            }
        }
        this.dfsTriangle = dfsTriangle;
    }
    initializeSelections() {
        let selections = (0, basic_classes_1.create2dArray)(this.triangle.shape[0] - 1, this.triangle.shape[1] - 1);
        this.triangle.changeToCumulative();
        for (let i = 0; i < selections.length; i++) {
            for (let j = 0; j < this.triangle.maxColIndex(i); j++) {
                if (this.triangle.values[i][j] > 0)
                    selections[i][j] = 1;
            }
        }
        this.selections = selections;
    }
    calculate() {
        this.triangle.changeToCumulative();
        let factors = Array.apply(null, new Array(this.triangle.shape[1] - 1)).map(() => 0);
        let numerator;
        let denominator;
        for (let j = 0; j < this.triangle.shape[1] - 1; j++) {
            numerator = 0;
            denominator = 0;
            let i = 0;
            while (j < this.triangle.maxColIndex(i)) {
                numerator += this.triangle.values[i][j + 1] * this.selections[i][j];
                denominator += this.triangle.values[i][j] * this.selections[i][j];
                i++;
            }
            factors[j] = numerator / denominator;
        }
        return new DFMFactors(factors);
    }
}
exports.DFCalculator = DFCalculator;
function calculateDFMUltimate(triangle, factors) {
    // Since we are not storing the information related to periods and month spans
    // We are suposing that they match between the triangle and the CDF
    triangle.changeToCumulative();
    let ultimateVals = Array.apply(null, new Array(triangle.shape[0])).map(() => 0);
    let diagonal = triangle.getDiagonal();
    for (let i = 0; i < triangle.shape[0]; i++) {
        console.log(diagonal.values[i], factors.cdf[triangle.shape[0] - i - 1]);
        ultimateVals[i] = diagonal.values[i] * factors.cdf[triangle.shape[0] - i - 1];
    }
    return new basic_classes_1.Vector(ultimateVals, triangle.periods[0]);
}
exports.calculateDFMUltimate = calculateDFMUltimate;
