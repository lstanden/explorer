const express = require("express");
const webpack = require("webpack");
const path = require("path");
const requireFromString = require("require-from-string");
const MemoryFS = require("memory-fs");

const serverConfig = require(path.resolve(
  __dirname,
  "..",
  "webpack.server.js"
));
const fs = new MemoryFS();

const outputErrors = (err, stats) => {
  if (err) {
    (err.stack || [err]).map(console.error);
    if (err.details) {
      err.details.map(console.error);
    }
    return;
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    info.errors.map(console.error);
  }

  if (stats.hasWarnings()) {
    info.warnings.map(console.warn);
  }
};

console.log("Initializating server application...");
const app = express();

console.log("Compiling bundle...");
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = fs;

serverCompiler.run((err, stats) => {
  outputErrors(err, stats);

  const contents = fs.readFileSync(
    path.resolve(serverConfig.output.path, serverConfig.output.filename),
    "utf8"
  );
  const app = requireFromString(contents, serverConfig.output.filename);
  app.get("*", app.default);
  app.listen(process.env.PORT);

  console.log("Server listening on port 3000");
});
