export default (value) => {
  let formattedValue = value.toFixed(2).split('');
  if (value >= 0) {
    formattedValue.unshift('+');
  }
  formattedValue.splice(1, 0, ' ');
  return formattedValue.join('') + '%';
};
