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
