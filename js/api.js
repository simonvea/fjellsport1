export async function getOrderHistory() {
  const url = 'https://fjellsport.github.io/frontend.case/order_history.json';

  const response = await fetch(url);

  if (!response.ok) throw new Error();

  const data = await response.json();

  return data;
}
