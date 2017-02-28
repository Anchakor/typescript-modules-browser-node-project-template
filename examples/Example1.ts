import AnotherModule = require('examples/Example1AnotherModule');

export function browserRun(f: (x: string) => void) {
  f('Example 1 test <br />'+AnotherModule.getSomeString());
}

export function nodejsRun() {
  console.log('Example 1 test in console!');
  console.log(AnotherModule.getSomeString());
}
