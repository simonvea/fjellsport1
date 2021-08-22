import 'normalize.css';
import './style.css';
import { orders } from './orderExamples.json';
import { ordersToHtml } from './htmlFunctions';

const app = document.getElementById('app');

const html = ordersToHtml(orders);

app.innerHTML = html;
