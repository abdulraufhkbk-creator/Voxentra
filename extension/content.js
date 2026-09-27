// Voxentra Content Script - On-page analysis for Twitter/X and Reddit
// Demo Mode: Adds threat badges to posts

function addBadgeToPost(postElement, analysis) {
  if (postElement.querySelector('.voxentra-badge')) return;

  const badge = document.createElement('div');
  badge.className = 'voxentra-badge';
  const level = analysis.threat?.level || 'low';
  const color = level === 'critical' ? '#dc2626' : level === 'high' ? '#f97316' : level === 'medium' ? '#eab308' : '#22c55e';

  badge.innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:9999px;background:${color};color:${level==='medium'?'black':'white'};font-size:10px;font-weight:700;">
      <span>VOXENTRA</span><span>${level.toUpperCase()}</span><span>${analysis.threat?.score || 0}</span>
    </div>
    <div style="font-size:10px;color:#a1a1aa;margin-top:2px;">${(analysis.threat?.reasons || []).slice(0,2).join(' • ')}</div>
  `;
  badge.style.cssText = 'margin:8px 0;padding:6px;border:1px solid #27272a;border-radius:8px;background:#09090b;';

  // Insert at top of post
  postElement.prepend(badge);
}

function analyzeVisiblePosts() {
  // Twitter/X selectors
  const tweetSelectors = ['article[data-testid="tweet"]', 'div[data-testid="cellInnerDiv"] article'];
  // Reddit selectors
  const redditSelectors = ['div[data-testid="post-container"]', 'shreddit-post'];

  const allSelectors = [...tweetSelectors, ...redditSelectors];
  let posts = [];
  allSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => posts.push(el));
  });

  posts.slice(0, 10).forEach(postEl => {
    const text = postEl.innerText?.slice(0, 500) || '';
    if (text.length < 20) return;

    chrome.runtime.sendMessage({ type: 'ANALYZE_POST', payload: { content: text, author: 'page', likes: 0, shares: 0 } }, (res) => {
      if (res?.success) {
        addBadgeToPost(postEl, res.result);
      }
    });
  });
}

// Run on load and on scroll (debounced)
let debounceTimer;
function debouncedAnalyze() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(analyzeVisiblePosts, 1000);
}

window.addEventListener('load', () => {
  setTimeout(analyzeVisiblePosts, 2000);
});

window.addEventListener('scroll', debouncedAnalyze);

const observer = new MutationObserver(debouncedAnalyze);
observer.observe(document.body, { childList: true, subtree: true });

console.log('Voxentra content script active - Demo Mode');
