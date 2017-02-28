var requirejs = require("requirejs");

function Example2NodeAppRun(packed = false) {
    requirejs.config({
        nodeRequire: require,
        paths: {
        "examples/Example2": (!packed) ? "examples/Example2" : "examples/Example2packed"
        },
        baseUrl: "output"
    });

    requirejs(['examples/Example2'],
    function (main: any) {
        console.log(`\n ${(!packed) ? 'Normal' : 'Packed'} module:`);
        main.nodejsRun();
    });
}

Example2NodeAppRun(false);
Example2NodeAppRun(true);
