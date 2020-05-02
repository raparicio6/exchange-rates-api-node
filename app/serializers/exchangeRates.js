exports.serializeExchangeRates = exchangeRates => ({
  exchangeRates: exchangeRates.map(
    ({
      baseCurrency,
      targetCurrency,
      originalValue,
      feePercentage,
      createdAt,
      feeAmount,
      valueWithFeeApplied
    }) => ({
      baseCurrency,
      targetCurrency,
      originalValue,
      feePercentage,
      createdAt,
      feeAmount,
      valueWithFeeApplied
    })
  )
});
