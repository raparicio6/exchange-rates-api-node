/* eslint-disable func-names */
const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema(
  {
    baseCurrency: String,
    targetCurrency: String,
    originalValue: Number,
    feePercentage: Number,
    createdAt: Date,
    isLastRateOfPair: Boolean
  },
  { toJSON: { virtuals: true } }
);

exchangeRateSchema.virtual('feeAmount').get(function() {
  return (this.originalValue * this.feePercentage) / 100;
});
exchangeRateSchema.virtual('valueWithFeeApplied').get(function() {
  return this.originalValue + this.feeAmount;
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);
