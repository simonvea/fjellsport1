import 'normalize.css';
import './style.css';
import { orders } from '/data/orderExamples.json';
import { ordersToHtml } from './js/htmlFunctions';
import { filterOrders } from './js/filter';

const app = document.getElementById('app');
const filter = document.querySelector('.filter');

renderOrders(orders);

function renderOrders(orders) {
  const html = ordersToHtml(orders);

  app.innerHTML = html;
}

filter.addEventListener('input', (e) => {
  const filteredOrders = filterOrders(e.target.value, orders);

  renderOrders(filteredOrders);
});
