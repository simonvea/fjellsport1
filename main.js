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

  renderOrders(orders);
} catch (err) {
  console.error(err);
  app.innerHTML = `
    <p>
      Klarte ikke hente ordre.{' '}
      <button onClick="window.location.reload(false)">
        Vennligst prøv igjen.
      </button>
    </p>
  )`;
}

function renderLoading(element, message) {
  element.innerHTML = `
    <section class="container">
      <div class="spinner"></div>
      <p>${message || ''}</p>
    </section>
  `;
}

function renderOrders(orders) {
  const html = ordersToHtml(orders);

  app.innerHTML = html;
}

const reRenderOrdersWithFilter = debounce((e) => {
  const filteredOrders = filterOrders(e.target.value, orders);

  renderOrders(filteredOrders);
}, 500);

filter.addEventListener('input', reRenderOrdersWithFilter);
