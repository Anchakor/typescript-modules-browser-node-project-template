import Config = require("examples/Example3Config");


export function browserRun(f: (x: string) => void) {
  var request = new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:"+Config.portNumber+"/");
  request.send();
  request.addEventListener('load', function (this: XMLHttpRequest) {
    f('Example 3 test <br />'+this.responseText)
  });
}


