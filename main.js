import 'normalize.css';
import './style.css';
import { debounce } from './js/helpers';
import { getOrderHistory } from './js/api';
import {
  renderFetchError,
  renderLoading,
  renderOrders,
  reRenderOrdersWithFilter,
} from './js/renderFunctions';
import { addFilterToHistory, populateHistory } from './js/filterHistory';

const app = document.getElementById('app');
const filter = document.querySelector('.filter');
const filterAutocompleteElement = document.getElementById('history');

const orders = [];

(async function init() {
  populateHistory(filterAutocompleteElement);

  try {
    renderLoading(app, 'Henter ordre...');

    const orderHistory = await getOrderHistory();

    orders.push(...orderHistory.orders);

    renderOrders(app, orders);
  } catch (err) {
    console.error(err);
    renderFetchError(app);
  }
})();

const handleFilterChange = debounce((e) => {
  const filter = e.target.value;

  reRenderOrdersWithFilter(orders, filter);

  addFilterToHistory(filter, filterAutocompleteElement);
}, 500);

filter.addEventListener('input', handleFilterChange);
