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
/*
base_triangle: np.array
ref_date: date
@classmethod
def from_movement_data(cls, val: np.array, ori: np.array, dev: np.array, **kwargs):
    """ Constructor when you have movements relative to a date. """
    if not (val.size == ori.size == dev.size):
        raise ArrayDifferentSizesError
    max_dev = max(ori + dev)
    ori_size = kwargs.get('ori_size', max(ori) + 1)
    dev_size = kwargs.get('dev_size', max_dev + 1)
    tri = np.zeros((ori_size, dev_size))
    for v, o, d in zip(val, ori, dev):
        if o > ori_size or o + d + 1 > dev_size:
            raise # Should put an error here
        tri[o, d] += v
    return cls(tri, kwargs.get('ref_date', _DEFAULT_DATE))

def __init__(self, base_triangle: np.array, ref_date: date = _DEFAULT_DATE):
    """ The 'true' constructor is the basic movement triangle. """
    self.base_triangle = np.array(base_triangle)
    self.ref_date = ref_date
def _check_valid_periods(self, origin_per, dev_per) -> bool:
    return origin_per % dev_per == 0

def build_movement_triangle(self, origin_period: int, dev_period: int) -> Triangle:
    if not self._check_valid_periods(origin_period, dev_period):
        raise InvalidPeriodCombinationError(origin_period, dev_period)
    one_size = self.base_triangle.shape
    origin_size = one_size[0] //  origin_period + min(one_size[0] % origin_period, 1)
    dev_size = one_size[1] //  dev_period + min(one_size[1] % dev_period, 1)
    tri_values = np.zeros((origin_size, dev_size))
    left_overs = self.base_triangle.shape[1] % dev_period
    correction = 1 if left_overs > 0 else 0
    for i in range(one_size[0]):
        for j in range(one_size[1] - i):
            i_new = i // origin_period
            rel_months = i % origin_period + j
            j_new = (rel_months - left_overs) // dev_period + correction
            tri_values[i_new, j_new] += self.base_triangle[i, j]
    return Triangle(tri_values, self.base_triangle.shape, (origin_period, dev_period), 0, self.ref_date)

def build_cumulative_triangle(self, origin_period: int, dev_period: int) -> Triangle:
    tri = self.build_movement_triangle(origin_period, dev_period)
    tri.toggle_cumulative()
    return tri

def json_save(self, name: str, path: str='.') -> None:
    json_info = self.to_json()
    folder = Path(path)
    with open(folder / name, 'w+') as f:
        json.dump(json_info, f)
@classmethod
def json_load(cls, name: str, path: str='.'):
    folder = Path(path)
    with open(folder / name, 'r') as f:
        json_info = json.load(f)
    json_info['ref_date'] = datetime.strptime(json_info['ref_date'], '%Y-%m').date()
    return cls(**json_info)
@classmethod
def from_json(cls, json_info: dict):
    if not isinstance(json_info['ref_date'], date):
        json_info['ref_date'] = datetime.strptime(json_info['ref_date'], '%Y-%m').date()
    return cls(**json_info)
def to_json(self) -> dict:
    return {'base_triangle': self.base_triangle.tolist(),
        'ref_date': self.ref_date.strftime('%Y-%m'),
        }
*/
