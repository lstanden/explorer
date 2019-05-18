const { database: config } = require("../../config");
const dbFactory = require("../factory");

module.exports = dbFactory(
  config.public.user,
  config.public.password,
  config.hosts,
  config.public.name,
  config.ssl,
  config.replica_set,
  config.auth_source
);
