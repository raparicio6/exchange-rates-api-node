exports.fixerResponseToExchangeRates = ({ base, date, rates }) => ({
  base,
  date,
  rates
});

exports.fixerResponseToConcurrencies = ({ symbols }) => symbols;
