import translations from '../data/translations.json';

export function translateOrderStatus(status) {
  return translations.orderStatus[status];
}

export function translatePaymentState(state) {
  // Fallback to pending if no known translation of state
  return (
    translations.paymentState[state] || translations.paymentState['Pending']
  );
}

export function translateShipmentState(state) {
  return translations.shipmentState[state];
}
