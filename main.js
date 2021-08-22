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
const filterAutocompleteElement = document.getElementById('history');

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
  const filter = e.target.value;
  const filteredOrders = filterOrders(filter, orders);

  if (filteredOrders.length < 1) {
    renderNotFound(app);
  } else {
    renderOrders(app, filteredOrders);
  }
  addFilterToHistory(filter, filterAutocompleteElement);
}, 500);

function addFilterToHistory(filter, historyElement) {
  if (!filter) return;

  const HISTORY_KEY = 'filterHistory';
  const oldHistory = localStorage.getItem(HISTORY_KEY);
  const newFilter = filter.toLowerCase(); // Ensure case insensitivity to have a cleaner history

  const newHistory = [newFilter];

  if (oldHistory) {
    const history = JSON.parse(oldHistory);
    if (!history.includes(newFilter)) {
      newHistory.push(...history);
    }
  }

  historyElement.innerHTML = newHistory
    .map((f) => `<option value="${f}"></option>`)
    .join('');
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

filter.addEventListener('input', reRenderOrdersWithFilter);
