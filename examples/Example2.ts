import AnotherModule = require('examples/Example2Module2');

export function browserRun(f: (x: string) => void) {
  f('Example 2 test'+AnotherModule.getSomeStringArray().join(" <br /> "));
}

export function nodejsRun() {
  console.log('Example 2 test in console!');
  console.log(AnotherModule.getSomeStringArray().join("\n"));
}

export function getSomeString() {
  return 'Example2 base visit 2'
}