/**
 * Module dependencies
 */

const authCheckMiddleware = require("../middleware/AuthCheck");

module.exports = app => {
  app.use("/", require("./auth"));
  app.use("/", authCheckMiddleware, require("./users"));
  app.use("/", authCheckMiddleware, require("./roles"));
  app.use("/", authCheckMiddleware, require("./rules"));
  app.use("/", authCheckMiddleware, require("./settings"));
  app.use("/", authCheckMiddleware, require("./transactions"));
  app.use("/", authCheckMiddleware, require("./assets"));
};
