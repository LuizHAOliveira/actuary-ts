"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassFactoryFromMovement = exports.TriangleFactory = exports.Triangle = exports.Vector = exports.create2dArray = void 0;
function create2dArray(rowSize, colSize) {
    let arr = Array.apply(null, new Array(rowSize)).map(() => Array.apply(null, new Array(colSize)).map(() => 0));
    return arr;
}
exports.create2dArray = create2dArray;
class Vector {
    constructor(values, period) {
        this.values = values;
        this.period = period;
        this.shape = values.length;
    }
}
exports.Vector = Vector;
class Triangle {
    constructor(values, cumulative, periods) {
        this.values = values;
        this.cumulative = cumulative;
        this.periods = periods;
        this.shape = [values.length, values[0].length];
    }
    maxColIndex(row) {
        let devOriRatio = Math.floor(this.periods[0] / this.periods[1]);
        let index = this.shape[1] - row * devOriRatio - 1;
        return index;
    }
    getDiagonal(diagonalIndex) {
        if (diagonalIndex == undefined)
            diagonalIndex = 0;
        else if (diagonalIndex < 0)
            throw Error('The value of \'diagonalIndex\' must be non-negative.');
        ;
        let diagonal = Array.apply(null, new Array(this.shape[0])).map(() => 0);
        let index;
        for (let i = 0; i < this.shape[0]; i++) {
            index = this.maxColIndex(i) - diagonalIndex;
            if (index >= 0)
                diagonal[i] = this.values[i][index];
            else
                diagonal[i] = 0;
        }
        return new Vector(diagonal, this.periods[0]);
    }
    toggleCumulative() {
        if (this.cumulative)
            this.changeToMovement();
        else
            this.changeToCumulative();
    }
    changeToCumulative() {
        if (this.cumulative)
            return;
        let newTri = create2dArray(this.shape[0], this.shape[1]);
        for (let i = 0; i < this.shape[0]; i++) {
            newTri[i][0] = this.values[i][0];
            for (let j = 1; j < this.maxColIndex(i) + 1; j++) {
                newTri[i][j] = newTri[i][j - 1] + this.values[i][j];
            }
        }
        this.cumulative = true;
        this.values = newTri;
    }
    changeToMovement() {
        if (!this.cumulative)
            return;
        let newTri = create2dArray(this.shape[0], this.shape[1]);
        for (let i = 0; i < this.shape[0]; i++) {
            newTri[i][0] = this.values[i][0];
            for (let j = 1; j < this.maxColIndex(i) + 1; j++) {
                newTri[i][j] = this.values[i][j] - this.values[i][j - 1];
            }
        }
        this.cumulative = false;
        this.values = newTri;
    }
}
exports.Triangle = Triangle;
class TriangleFactory {
    constructor(base_triangle) {
        this.base_triangle = base_triangle;
        this.shape = [base_triangle.length, base_triangle[0].length];
    }
    checkValidPeriods(originPeriod, developmentPeriod) {
        if (originPeriod % developmentPeriod == 0)
            return true;
        return false;
    }
    buildMovementTriangle(originPeriod, developmentPeriod) {
        if (!this.checkValidPeriods(originPeriod, developmentPeriod))
            throw Error('Invalid period combination');
        let shape = this.shape;
        let originSize = Math.floor(shape[0] / originPeriod) + Math.min(shape[0] % originPeriod, 1);
        let devSize = Math.floor(shape[1] / developmentPeriod) + Math.min(shape[1] % developmentPeriod, 1);
        let leftOvers = shape[1] % developmentPeriod;
        let correction = leftOvers > 0 ? 1 : 0;
        let tri = create2dArray(originSize, devSize);
        let newI;
        let newJ;
        let relMonths;
        for (let i = 0; i < shape[0]; i++) {
            for (let j = 0; j < shape[1] - i; j++) {
                newI = Math.floor(i / originPeriod);
                relMonths = i % originPeriod + j;
                newJ = Math.floor((relMonths - leftOvers) / developmentPeriod) + correction;
                tri[newI][newJ] += this.base_triangle[i][j];
            }
        }
        return new Triangle(tri, false, [originPeriod, developmentPeriod]);
    }
}
exports.TriangleFactory = TriangleFactory;
function createClassFactoryFromMovement(values, origin, development, originSize, developmentSize) {
    if (values.length != origin.length || origin.length != development.length)
        throw Error('The passed arrays are not of the same length.');
    if (originSize == undefined)
        originSize = Math.max(...origin) + 1;
    if (developmentSize == undefined) {
        let max_dev = Math.max(...origin, ...development) + 1;
        developmentSize = max_dev;
    }
    let tri = create2dArray(originSize, developmentSize);
    for (let i = 0; i < values.length; i++) {
        let row = origin[i];
        let col = development[i];
        tri[row][col] += values[i];
    }
    return new TriangleFactory(tri);
}
exports.createClassFactoryFromMovement = createClassFactoryFromMovement;
