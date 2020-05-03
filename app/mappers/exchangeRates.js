exports.mapFixerRespToExchangeRates = ({ base, date, rates }) => ({
  base,
  date,
  rates
});

exports.mapFixerRespToConcurrencies = ({ symbols }) => symbols;
