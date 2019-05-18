const fs = require("fs");
module.exports = {
  Template: {
    TemplateName: "PasswordResetCode",
    SubjectPart: "Password Reset -- Phylogeny Explorer",
    HtmlPart: fs.readFileSync(__dirname + "/html/password-reset.html", {
      encoding: "utf8"
    }),
    TextPart: fs.readFileSync(__dirname + "/text/password-reset.txt", {
      encoding: "utf8"
    })
  }
};
