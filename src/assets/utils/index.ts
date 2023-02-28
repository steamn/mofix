export function rusEnding(
  x: number,
  first: string,
  second: string,
  third: string,
) {
  if (
    x === 1 ||
    x === 21 ||
    x === 31 ||
    x === 41 ||
    x === 51 ||
    x === 61 ||
    x === 71 ||
    x === 81 ||
    x === 91
  ) {
    return first;
  } else if (
    x === 2 ||
    x === 3 ||
    x == 4 ||
    x === 22 ||
    x === 23 ||
    x === 24 ||
    x === 32 ||
    x === 33 ||
    x === 34 ||
    x === 42 ||
    x === 43 ||
    x === 44 ||
    x === 52 ||
    x === 53 ||
    x === 54 ||
    x === 62 ||
    x === 63 ||
    x === 64 ||
    x === 72 ||
    x === 73 ||
    x === 74 ||
    x === 82 ||
    x === 83 ||
    x === 84
  ) {
    return second;
  } else {
    return third;
  }
}
