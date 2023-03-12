"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassFactoryFromMovement = exports.TriangleFactory = exports.Triangle = void 0;
class VerticalHeader {
}
class HorizontalHeader {
}
class Triangle {
    constructor(values, cumulative) {
        this.values = values;
        this.cumulative = cumulative;
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
        let tri = Array.apply(null, new Array(originSize)).map(() => Array.apply(null, new Array(devSize)).map(() => 0));
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
        return new Triangle(tri, false);
    }
}
exports.TriangleFactory = TriangleFactory;
function createClassFactoryFromMovement(values, origin, development, originSize, developmentSize) {
    if (values.length != origin.length || origin.length != development.length)
        throw Error('The passed arrays are not of the same lenght.');
    if (originSize == undefined)
        originSize = Math.max(...origin) + 1;
    if (developmentSize == undefined) {
        let max_dev = Math.max(...origin, ...development) + 1;
        developmentSize = max_dev;
    }
    let tri = Array.apply(null, new Array(originSize)).map(() => Array.apply(null, new Array(developmentSize)).map(() => 0));
    for (let i = 0; i < values.length; i++) {
        let row = origin[i];
        let col = development[i];
        tri[row][col] += values[i];
    }
    return new TriangleFactory(tri);
}
exports.createClassFactoryFromMovement = createClassFactoryFromMovement;
