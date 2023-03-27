# Actuary-TS

## Overview
The purpose of this library is to be a reserving tool written in typescript. As typescript is transpiled into JS, it will let this code to be executed in several different environments, making it possible to build both  web or desktop applications, or even be used in scripts alone. It still in development, so there are going to be a lot of improvements and changes to be made.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install actuary-ts.

```bash
npm install actuary-ts
```
## Usage

```typescript
import { Triangle, TriangleFactory } from "actuary-ts";

let data: number[][] = [
    [4654.44, 6516.21, 8377.99, 8447.99, 8513.10, 8573.95],
    [5249.70, 7349.57, 9449.45, 9528.41, 9601.84, 0],
    [5089.61, 7125.46, 9161.30, 9237.85, 0,       0],
    [4763.19, 6668.46, 8573.74, 0,       0,   	  0],
    [5372.87, 7522.02, 0,       0,       0,   	  0],
    [5299.05, 0,       0,       0,       0,   	  0]
];
let fac = new TriangleFactory(data);
let tri: Triangle = fac.buildMovementTriangle(2, 2);

console.log(tri);
tri.changeToCumulative();
console.log(tri);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)