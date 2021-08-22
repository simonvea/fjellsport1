import 'normalize.css';
import './style.css';
import { filterOrders } from './js/filter';
import { debounce } from './js/helpers';
import { getOrderHistory } from './js/api';
import {
  renderFetchError,
  renderLoading,
  renderNotFound,
  renderOrders,
} from './js/renderFunctions';

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

const reRenderOrdersWithFilter = debounce((e) => {
  const filteredOrders = filterOrders(e.target.value, orders);

  if (filteredOrders.length < 1) {
    renderNotFound(app);
  } else {
    renderOrders(app, filteredOrders);
  }
}, 500);

filter.addEventListener('input', reRenderOrdersWithFilter);
