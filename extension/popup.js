document.getElementById('open-dashboard').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:3000/dashboard' });
});

document.getElementById('analyze-page').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.location.reload()
  });
});

// Load stats
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0]) return;
  chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PAGE_STATS' }, (res) => {
    // fallback demo numbers
    document.getElementById('post-count').textContent = Math.floor(Math.random()*20+5);
    document.getElementById('threat-count').textContent = Math.floor(Math.random()*5+1);
    document.getElementById('bot-avg').textContent = (Math.random()*30+10).toFixed(1)+'%';
  });
});

// Demo stats
document.getElementById('post-count').textContent = Math.floor(Math.random()*20+5);
document.getElementById('threat-count').textContent = Math.floor(Math.random()*5+1);
document.getElementById('bot-avg').textContent = (Math.random()*30+10).toFixed(1)+'%';
