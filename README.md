# Actuary-TS

## Overview
The purpose of this library is to be a reserving tool written in typescript. As typescript is transpiled into JS, it will let this code to be executed in several different environments, making it possible to build both  web or desktop applications, or even be used in scripts alone. It still in development, so there are going to be a lot of improvements and changes to be made.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install actuary-ts.

```bash
npm install actuary-ts
```
## Usage

A simple use case is shown below. The steps can be described as:
1. Load the data inside a factory;
2. Choose an approprited period of analysis; for the Triangle
3. Load the Triangle into the DFMCalculator;
4. Calculate the DF factors;
5. With the factors, calculate the DFM Ultimate;
```typescript
import { Vector, Triangle, TriangleFactory } from "actuary-ts";
import { DFCalculator, DFMFactors, calculateDFMUltimate } from "actuary-ts";

let data: number[][] = [
    [4654,	1862,	1862,	70,	65,	61],
    [5250,	2100,	2100,	79,	73,	0],
    [5090,	2036,	2036,	77,	0,	0],
    [4763,	1905,	1905,	0,	0,	0],
    [5373,	2149,	0,	    0,	0,	0],
    [5299,	0,      0,	    0,	0,	0]
];
// Let build the Factory and the Triangle
let fac = new TriangleFactory(data);
let tri: Triangle = fac.buildMovementTriangle(2, 2);
tri.changeToCumulative();
console.log('The Triangle', tri.values);

// Let get some DFMs
let dfm: DFCalculator = DFCalculator(tri);
let dfFactors: DFMFactors = dfm.calculate();
// Use dfm.selections to change the datapoints used in estimation

let ultimate: Vector = calculateDFMUltimate(triangle: Triangle, factors: DFMFactors);
console.log('Calculated Ultimate', ultimate.values);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)