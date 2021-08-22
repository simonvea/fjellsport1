const HISTORY_KEY = 'filterHistory';

export function addFilterToHistory(filter, historyElement) {
  if (!filter) return;

  const oldHistory = localStorage.getItem(HISTORY_KEY);
  const newFilter = filter.toLowerCase(); // Ensure case insensitivity to have a cleaner history

  const newHistory = [];

  if (oldHistory) {
    const history = JSON.parse(oldHistory);
    newHistory.push(...history);
  }

  if (newHistory.includes(newFilter)) {
    // Filter does not need to be refreshed.
    return;
  }

  newHistory.push(newFilter);

  historyElement.innerHTML = newHistory
    .map((f) => `<option value="${f}"></option>`)
    .join('');
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

export function populateHistory(historyElement) {
  const oldHistory = localStorage.getItem(HISTORY_KEY);

  if (oldHistory) {
    const history = JSON.parse(oldHistory);

    historyElement.innerHTML = history
      .map((f) => `<option value="${f}"></option>`)
      .join('');
  }
}
