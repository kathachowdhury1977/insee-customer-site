export const commaFormatter = (num, formatDigit) => {
  const number = num ? num : 0;
  let formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: formatDigit,
  });

  return formatter.format(parseFloat(number).toFixed(formatDigit));
};

//  export const commaFormatter = (num, formatDigit) => {
//   const number = num ? num : 0
//    let formatter = new Intl.NumberFormat("en-US", {
//      minimumFractionDigits: formatDigit,
//    });
//    return formatter.format(Number(number).toFixed(formatDigit));
//  };

export const sortingDateFormatter = (date) => {
  const formatDate = date && date?.split("-").reverse().join("-");
  // console.log('hello', date, {formatDate}, new Date(formatDate));
  return date && new Date(formatDate);
};
