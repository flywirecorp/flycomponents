import { formatMoney, unformat } from 'accounting';

const toMoney = (number, options) => {
  const defaults = {
    cents: true,
    decimal: '.',
    thousand: ',',
    subunitToUnit: 100,
    symbol: '$',
    symbolFirst: true
  };

  const config = { ...defaults, ...options };
  const {
    cents,
    decimal,
    subunitToUnit,
    symbol,
    symbolFirst,
    thousand
  } = config;
  const precision = cents ? Math.log10(subunitToUnit) : 0;
  const amount = number / subunitToUnit;
  let format = '%v';
  if (symbol) {
    format = symbolFirst ? '%s%v' : '%v %s';
  }
  const settings = { format, decimal, symbol, precision, thousand };
  return formatMoney(amount, settings);
};

const toCents = (number, options) => {
  const defaults = {
    decimal: '.',
    subunitToUnit: 100
  };

  const config = { ...defaults, ...options };
  const { decimal, subunitToUnit } = config;

  return Math.round(unformat(number, decimal) * subunitToUnit);
};

export { toCents, toMoney };
