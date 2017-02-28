var requirejs = require("requirejs");

function Example3NodeAppRun() {
    requirejs.config({
        nodeRequire: require,
        paths: {
        "examples/Example3Server": "examples/Example3Server"
        },
        baseUrl: "output"
    });

    requirejs(['examples/Example3Server'],
    function (main: any) {
        main.nodejsRun();
    });
}

Example3NodeAppRun();
