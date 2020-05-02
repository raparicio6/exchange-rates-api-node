exports.exampleExchangeRate = {
  baseCurrency: 'EUR',
  targetCurrency: 'USD',
  originalValue: 50,
  feePercentage: 10,
  collectedAt: '2020-05-01',
  isLastRateOfPair: true
};

exports.manyExchangeRates = [
  exports.exampleExchangeRate,
  {
    baseCurrency: 'ARS',
    targetCurrency: 'USD',
    originalValue: 20,
    feePercentage: 5,
    collectedAt: '2020-05-02',
    isLastRateOfPair: true
  },
  {
    baseCurrency: 'ARS',
    targetCurrency: 'EUR',
    originalValue: 40,
    feePercentage: 15,
    collectedAt: '2020-05-01',
    isLastRateOfPair: false
  }
];

exports.getExchangeRatesResponse = {
  exchangeRates: [
    {
      baseCurrency: 'EUR',
      targetCurrency: 'USD',
      originalValue: 50,
      feePercentage: 10,
      collectedAt: '2020-05-01T00:00:00.000Z',
      feeAmount: 5,
      valueAfterFeeApplied: 55
    },
    {
      baseCurrency: 'ARS',
      targetCurrency: 'USD',
      originalValue: 20,
      feePercentage: 5,
      collectedAt: '2020-05-02T00:00:00.000Z',
      feeAmount: 1,
      valueAfterFeeApplied: 21
    }
  ],
  limit: 10,
  page: 1,
  prevPage: null,
  nextPage: null,
  totalPages: 1,
  totalExchangeRates: 2
};
