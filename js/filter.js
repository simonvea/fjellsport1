export function filterOrders(filter, orders) {
  if (!filter) return orders;

  return orders.filter(
    (order) =>
      itemsHasMatch(order.lineItems, filter) || orderHasMatch(order, filter)
  );
}

function itemsHasMatch(items, toMatch) {
  return items.some(
    (item) =>
      nameIncludesString(item, toMatch) ||
      idIncludesString(item.productId, toMatch)
  );
}

function nameIncludesString(item, name) {
  const regExp = new RegExp(name, 'ig');

  return regExp.test(item.name);
}

function idIncludesString(id, filter) {
  return id.includes(filter);
}

function orderHasMatch(order, filter) {
  return idIncludesString(order.orderId, filter);
}
