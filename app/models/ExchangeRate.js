const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
  baseCurrency: String,
  targetCurrency: String,
  originalValue: Number,
  feePercentage: Number
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
