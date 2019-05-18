const mongoose = require("mongoose");
const querystring = require("querystring");

module.exports = function databaseFactory(
  user,
  pass,
  hosts,
  dbName,
  ssl,
  replicaSet,
  authSource
) {
  let query = { ssl };
  if (replicaSet) query["replicaSet"] = replicaSet;
  if (authSource) query["authSource"] = authSource;

  let connectionString =
    hosts + "/" + dbName + "?" + querystring.stringify(query);

  mongoose.set("debug", true);

  let fullConnectionString = "";

  if (user && pass) {
    fullConnectionString =
      "mongodb://" + user + ":" + pass + "@" + connectionString;
  } else {
    fullConnectionString = "mongodb://" + connectionString;
  }

  const db = mongoose.createConnection(fullConnectionString, {
    useNewUrlParser: true
  });

  db.on("connected", function() {
    console.log(`Connected to ${connectionString} with user ${user}`);
  });

  db.on("error", function(err) {
    console.log(
      `Failed to connect to ${connectionString} -- ${err} with user ${user}`
    );
  });

  db.on("disconnected", function() {
    console.log(`Disconnected from ${connectionString} with user ${user}`);
  });

  return db;
};
