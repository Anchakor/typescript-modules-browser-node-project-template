const child_process = require('child_process');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const echo = console.log;
const args = process.argv.slice(1);

// config files like examples/build-Example1.json
const mainModules = ['Example1', 'Example2'];

function mainRun(moduleConfig) {
  switch (args[1]) {
    case 'debug':
      sh('tsc', ['-p', '.']) &&
      rJsPack(moduleConfig, true) &&
      echo("Debug build successful");
      break;
    case 'release':
      sh('tsc', ['-p', '.']) &&
      rJsPack(moduleConfig, false) &&
      echo("Release build successful");
      break;
    case 'simple':
      sh('tsc', ['-p', '.']) &&
      echo("Simple build successful");
      break;
    case 'clean':
      rmDir(moduleConfig.outputDir, false);
      echo(`Output directory '${moduleConfig.outputDir}' was wiped`);
      break;
    default:
      echo('To build use `node build.js debug` (or "release", "simple" or "clean").');
      echo('To run a node module use `node build.js run`.');
  }
}

function sh(command, args) {
  var p = child_process.spawnSync(command, args)
  if (p.stdout) { process.stdout.write(p.stdout); }
  if (p.stderr) { process.stderr.write(p.stderr); }
  return (p.status == 0)
}

function rJsPack(moduleConfig, noOptimize) {
  var args = ['node_modules/requirejs/bin/r.js', '-o', 
    'baseUrl='+moduleConfig.outputDir, 
    'name='+moduleConfig.mainModule, 
    'out='+moduleConfig.packOutputFilePath];
  if (noOptimize) {
    args.push("optimize=none")
  }
  return sh("node", args);
}

function rmDir(dirPath, removeSelf) {
  if (removeSelf === undefined)
    removeSelf = true;
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rmDir(filePath);
    }
  if (removeSelf)
    fs.rmdirSync(dirPath);
}

class Config {
  constructor() {
    this.outputDir = 'output';
    this.packOutputFileName = 'app_client.js';
    this.mainModule = 'examples/Example1';
    this.nodeApp = 'examples/Example1NodeApp.js';
    //this.packOutputFilePath = path.join(outputDir, packOutputFileName)
    //this.nodeAppPath = path.join(outputDir, nodeApp)
  }
}

function getModuleConfig(moduleName) {
  const moduleConfigFile = path.join('', 'build-'+moduleName+'.json');
  const fileContents = fs.readFileSync(moduleConfigFile);
  var moduleConfig = JSON.parse(fileContents); // as Config
  moduleConfig.packOutputFilePath = path.join(moduleConfig.outputDir, moduleConfig.packOutputFileName)
  moduleConfig.nodeAppPath = path.join(moduleConfig.outputDir, moduleConfig.nodeApp);
  return moduleConfig;
}

function run() {
  echo('Select number of module to run:');
  for (var i = 0; i < mainModules.length; i++) {
    echo(`${i+1}: ${mainModules[i]}`);
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
  rl.question('', (answer) => {
    const moduleNumber = parseInt(answer, 10);
    if (moduleNumber > 0 && moduleNumber <= mainModules.length) {
      const moduleConfig = getModuleConfig(mainModules[moduleNumber-1]);
      sh('node', [moduleConfig.nodeAppPath]);
    } else {
      echo('Not a valid number of module');
    }
    rl.close();
  });
}

function main() {
  //sh("echo", ["arguments:"].concat(process.argv));
  if (args[1] == 'run') {
    run();
  } else {
    mainModules.forEach(function(moduleName) {
      const moduleConfig = getModuleConfig(moduleName);
      mainRun(moduleConfig);
    }, this);
  }
}

main();
