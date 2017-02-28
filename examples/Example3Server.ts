import http = require("http");
import Config = require("examples/Example3Config");

export function nodejsRun() {
  console.log("Example 3: starting server at http://127.0.0.1:"+Config.portNumber+"/");

  run(Config.portNumber);
}

function run(portNumber: number) {
  http.createServer(/*options,*/ (req:any, res:any) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'});
    res.write('Hello world from Example 3 server\n');
    res.end();
  }).listen(portNumber);
}
