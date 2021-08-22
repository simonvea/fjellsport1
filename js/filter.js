export function filterOrders(filter, orders) {
  if (!filter) return orders;

  return orders.filter((order) => itemsHasMatch(order.lineItems, filter));
}

function itemsHasMatch(items, toMatch) {
  return items.some((item) => nameIncludesString(item, toMatch));
}

function nameIncludesString(item, name) {
  const regExp = new RegExp(name, 'ig');

  return regExp.test(item.name);
}
