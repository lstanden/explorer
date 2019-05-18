const FileManager = require("./s3/FileManager");
const EmailManager = require("./ses/EmailManager");

module.exports = {
  S3: new FileManager(),
  SES: new EmailManager()
};
