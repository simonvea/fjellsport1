export function getPriceTotal(items) {
  return items.reduce(
    (total, current) => total + current.qty * current.price,
    0
  );
}

export function getItemsQuantity(items) {
  return items.reduce((total, current) => total + current.qty, 0);
}

export function toCurrencyString(price) {
  return `${price} kr`;
}

export function debounce(work, wait) {
  let timeout;

  return (args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => work(args), wait);
  };
}
