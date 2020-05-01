const mongoose = require('mongoose');
const { host, port, name, username, password } = require('../config').common.database;

const connectionString = username
  ? `mongodb://${username}:${password}@${host}:${port}/${name}`
  : `mongodb://${host}:${port}/${name}`;
module.exports = () =>
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
