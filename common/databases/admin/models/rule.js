const mongoose = require('mongoose');
const connection = require('../connection');

const RuleSchema = new mongoose.Schema({
  path: {type: String},
  method: {type: String},
  controller: {type: String},
  action: {type: String},
  created: {type: Date, default: Date.now},
  modified: {type: Date},
});

module.exports = connection.model('Rule', RuleSchema);
