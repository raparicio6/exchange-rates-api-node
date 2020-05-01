const mongoose = require('mongoose');
const { host, port, name, username, password } = require('../config').common.database;

const connectionString = `mongodb://${username}:${password}@${host}:${port}/${name}`;
module.exports = () =>
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
