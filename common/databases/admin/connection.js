const { database: config } = require("../../config");
const dbFactory = require("../factory");

module.exports = dbFactory(
  config.admin.user,
  config.admin.password,
  config.hosts,
  config.admin.name,
  config.ssl,
  config.replica_set,
  config.auth_source
);
