import CircularDependency = require('examples/Example2Module3');

export function getSomeStringArray(): string[] {
  return ['Example2Module2 visit 1'].concat(CircularDependency.getSomeStringArray2());
}

export function getSomeString2() {
  return 'Example2Module2 visit 2';
}