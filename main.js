import 'normalize.css';
import './style.css';
import { ordersToHtml } from './js/htmlFunctions';
import { filterOrders } from './js/filter';
import { debounce } from './js/helpers';
import { getOrderHistory } from './js/api';

const app = document.getElementById('app');
const filter = document.querySelector('.filter');

const orders = [];

try {
  renderLoading(app, 'Henter ordre...');

  const orderHistory = await getOrderHistory();

  orders.push(...orderHistory.orders);

  renderOrders(app, orders);
} catch (err) {
  console.error(err);
  renderFetchError(app);
}

function renderLoading(element, message) {
  element.innerHTML = `
    <section class="container">
      <div class="spinner"></div>
      <p>${message || ''}</p>
    </section>
  `;
}

function renderFetchError(element) {
  element.innerHTML = `
    <p>
      Klarte ikke hente ordre.
      <button onClick="window.location.reload(false)">
        Vennligst prøv igjen.
      </button>
    </p>
  )`;
}

function renderOrders(element, orders) {
  const html = ordersToHtml(orders);

  element.innerHTML = html;
}

const reRenderOrdersWithFilter = debounce((e) => {
  const filteredOrders = filterOrders(e.target.value, orders);

  if (filteredOrders.length < 1) {
    renderNotFound(app);
  } else {
    renderOrders(app, filteredOrders);
  }
}, 500);

function renderNotFound(element) {
  element.innerHTML = `
    <p>
      Beklager men vi kunne ikke finne noe som matchet ditt søk.
    </p>
  `;
}

filter.addEventListener('input', reRenderOrdersWithFilter);
