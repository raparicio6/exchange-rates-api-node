const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  baseCurrency: String,
  targetCurrency: String,
  originalValue: Number,
  feePercentage: Number
});

module.exports = mongoose.model('Rate', rateSchema);
