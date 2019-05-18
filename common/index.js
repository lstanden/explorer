const { S3, SES } = require("./aws");

module.exports = {
  Database: {
    Admin: require("./databases/admin"),
    Public: require("./databases/public")
  },
  S3,
  SES
};
