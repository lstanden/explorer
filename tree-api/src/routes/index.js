/**
 * Module dependencies
 */

const cladeRouter = require("./clade");
module.exports = app => {
  app.use("/", cladeRouter);
};
