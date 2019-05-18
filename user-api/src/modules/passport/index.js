const passport = require("passport");

module.exports = app => {
  app.use(passport.initialize());
  passport.use("local-signup", require("./signup"));
  passport.use("local-login", require("./login"));
};
