import { filterOrders } from './filter';
import { ordersToHtml } from './htmlFunctions';

export function renderLoading(element, message) {
  element.innerHTML = `
    <section class="container">
      <div class="spinner"></div>
      <p>${message || ''}</p>
    </section>
  `;
}

export function renderFetchError(element) {
  element.innerHTML = `
    <p>
      Klarte ikke hente ordre.
      <button class="button" onClick="window.location.reload(false)">
        Vennligst prøv igjen.
      </button>
    </p>
  `;
}

export function renderOrders(element, orders) {
  const html = ordersToHtml(orders);

  element.innerHTML = html;
}

export function reRenderOrdersWithFilter(orders, filter) {
  const filteredOrders = filterOrders(filter, orders);

  if (filteredOrders.length < 1) {
    renderNotFound(app);
  } else {
    renderOrders(app, filteredOrders);
  }
}

function renderNotFound(element) {
  element.innerHTML = `
    <p>
      Beklager men vi kunne ikke finne noe som matchet ditt søk.
    </p>
  `;
}
