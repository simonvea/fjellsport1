export function getOrderStatus(order) {
  const translations = {
    Open: 'Åpen',
    Closed: 'Ferdig',
  };

  return translations[order.orderStatus];
}

export function getPaymentStatus(order) {
  return order.paymentState === 'Paid' ? 'Betalt' : 'Venter';
}

export function getShipmentStatus(order) {
  switch (order.shipmentState) {
    case 'Shipped':
      return 'Sendt';
    case 'Pending':
      return 'Venter';
    default:
      return 'Venter';
  }
}
