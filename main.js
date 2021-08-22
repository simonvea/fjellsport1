import 'normalize.css';
import './style.css';
import { orders } from '/data/orderExamples.json';
import { ordersToHtml } from './js/htmlFunctions';
import { filterOrders } from './js/filter';
import { debounce } from './js/helpers';

const app = document.getElementById('app');
const filter = document.querySelector('.filter');

renderOrders(orders);

function renderOrders(orders) {
  const html = ordersToHtml(orders);

  app.innerHTML = html;
}

const reRenderOrders = debounce((e) => {
  const filteredOrders = filterOrders(e.target.value, orders);

  renderOrders(filteredOrders);
}, 500);

filter.addEventListener('input', reRenderOrders);
