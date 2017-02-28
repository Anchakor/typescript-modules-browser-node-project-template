# typescript-modules-browser-node-project-template

A TypeScript project template/scaffolding, allowing to use modules shared in both client and server (browser and Node.js) using RequireJS, with hierarchical absolute paths as module names (like namespaces in C++/C# etc.; not relative paths).

## Building

1. Clone the repo
2. Run `npm install` to pull dependencies
3. Run `node build.js debug` (for simple build you can just do `tsc -p .`)
4. (Explore build options by `node build.js`)

Simple build doesn't use RequireJS optimizer tool, which also packs all modules in one JS file using UglifyJS, which you will mostly likely want for browser, to keep the number of HTTP requests low.

## Running examples

For the server part (Node.js) run `node output/examples/Example1NodeApp.js` for example (replace the number for other examples).

For the client part (web browser) open the respective HTML files in the `output/examples/` directory.

### Example 1

Basic example loading 1 module which requires 1 other module.

### Example 2

Test of circular dependencies between modules (allowed).

### Example 3

Node.js HTTP server, which is queried from the client side.
This is probably the example you will want to base your code on.
It properly separates client and server code - the RequireJS optimizer will not work for requires of Node modules.
You can share modules between client and server which don't require Node modules.
