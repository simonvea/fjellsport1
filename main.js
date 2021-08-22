import 'normalize.css';
import './style.css';
import { orders } from '/data/orderExamples.json';
import { ordersToHtml } from './js/htmlFunctions';

const app = document.getElementById('app');

const html = ordersToHtml(orders);

app.innerHTML = html;
