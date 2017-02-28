import CircularDependency = require('examples/Example2');
import CircularDependency2 = require('examples/Example2Module2');

export function getSomeStringArray2(): string[] {
  var x = ['Example2Module3'];
  x.push(CircularDependency.getSomeString());
  x.push(CircularDependency2.getSomeString2());
  return x;
}