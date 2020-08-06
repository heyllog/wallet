import formatBalance from './formatBalance';

export default (value) => {
  let formattedValue = formatBalance(value.toFixed(2));
  formattedValue = formattedValue.split('');

  if (value >= 0) formattedValue.unshift('+');

  formattedValue.splice(1, 0, ' ');
  return formattedValue;
};
