export function ordersToHtml(orders) {
  return orders
    .map((order) => {
      const dateString = new Date(order.orderDate).toLocaleDateString();
      const orderStatus = getOrderStatus(order);
      const priceTotal = getPriceTotal(order.lineItems);
      const priceTotalString = toCurrencyString(priceTotal);
      const paymentStatus = getPaymentStatus(order);
      const shipmentStatus = getShipmentStatus(order);
      const itemsQuantity = getItemsQuantity(order.lineItems);
      const itemsHtml = lineItemsToHtml(order.lineItems);

      return `
      <article class="order">
        <section class="order__info">
          <section class="order__header">
            <h3 class="order__date">Dato: <time>${dateString}</time></h3>
            <h2 class="order__status">${orderStatus}</h2>
          </section>
          <section class="items">
            <ul class="items__list">
              ${itemsHtml}
            </ul>
            <section class="order__details">
              <table>
                <tr>
                  <th scope="row" class="details__header">Totalt</th>
                  <td class="details__data">${priceTotalString}</td>
                </tr>
              </table>
            </section>
          </section>
        </section>
        <details class="order__items">
          <summary class="items__summary">Mer informasjon</summary>
          <table>
            <tr>
              <th scope="row" class="details__header">Ordrenummer</th>
              <td class="details__data">
                ${order.orderId}
              </td>
            </tr>
            <tr>
              <th scope="row" class="details__header">Betalingsstatus</th>
              <td class="details__data">${paymentStatus}</td>
            </tr>
            <tr>
              <th scope="row" class="details__header">Leveringsstatus</th>
              <td class="details__data">${shipmentStatus}</td>
            </tr>
            <tr>
              <th scope="row" class="details__header">Antall varer</th>
              <td class="details__data">${itemsQuantity}</td>
            </tr>
          </table>
        </details>
      </article>
  `;
    })
    .join('');
}

function getOrderStatus(order) {
  const translations = {
    Open: 'Åpen',
    Closed: 'Ferdig',
  };

  return translations[order.orderStatus];
}

function getPriceTotal(items) {
  return items.reduce((total, curr) => total + curr.qty * curr.price, 0);
}

function getPaymentStatus(order) {
  return order.paymentState === 'Paid' ? 'Betalt' : 'Venter';
}

function getShipmentStatus(order) {
  switch (order.shipmentState) {
    case 'Shipped':
      return 'Sendt';
    case 'Pending':
      return 'Venter';
    default:
      return 'Venter';
  }
}

function getItemsQuantity(items) {
  return items.reduce((total, current) => total + current.qty, 0);
}

function lineItemsToHtml(lineItems) {
  return lineItems
    .map((item) => {
      const price = toCurrencyString(item.price);
      return `
        <li class="list__item">
          <article class="item">
            <img
              class="item__image"
              src="${item.image}"
              alt="Bilde av ${item.name}"
            />
            <h2 class="item__title">${item.name}</h2>
            <p class="item__quantity">${item.qty} x ${price}</p>
          </article>
        </li>
        `;
    })
    .join('');
}

function toCurrencyString(price) {
  return `${price} kr`;
}
