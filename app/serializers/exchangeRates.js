exports.serializeExchangeRate = ({
  baseCurrency,
  targetCurrency,
  originalValue,
  feePercentage,
  collectedAt,
  feeAmount,
  valueAfterFeeApplied
}) => ({
  exchangeRate: {
    baseCurrency,
    targetCurrency,
    originalValue,
    feePercentage,
    collectedAt,
    feeAmount,
    valueAfterFeeApplied
  }
});

exports.serializeExchangeRates = exchangeRates => ({
  exchangeRates: exchangeRates.map(
    ({
      baseCurrency,
      targetCurrency,
      originalValue,
      feePercentage,
      collectedAt,
      feeAmount,
      valueAfterFeeApplied
    }) => ({
      baseCurrency,
      targetCurrency,
      originalValue,
      feePercentage,
      collectedAt,
      feeAmount,
      valueAfterFeeApplied
    })
  )
});
