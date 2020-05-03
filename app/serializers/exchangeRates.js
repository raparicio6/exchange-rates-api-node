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

exports.serializeExchangeRates = ({ docs, totalDocs, limit, page, totalPages, prevPage, nextPage }) => ({
  exchangeRates: docs.map(
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
  ),
  limit,
  page,
  prevPage,
  nextPage,
  totalPages,
  totalExchangeRates: totalDocs
});
