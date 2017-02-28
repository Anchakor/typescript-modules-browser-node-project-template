var requirejs = require("requirejs");

function Example1NodeAppRun(packed = false) {
    requirejs.config({
        nodeRequire: require,
        paths: {
        "examples/Example1": (!packed) ? "examples/Example1" : "examples/Example1packed"
        },
        baseUrl: "output"
    });

    requirejs(['examples/Example1'],
    function (main: any) {
        console.log(`\n ${(!packed) ? 'Normal' : 'Packed'} module:`);
        main.nodejsRun();
    });
}

Example1NodeAppRun(false);
Example1NodeAppRun(true);
