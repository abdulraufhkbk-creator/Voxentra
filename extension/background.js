// Voxentra Background Service Worker - MV3
// Handles API communication with Voxentra backend

const VOXENTRA_API = 'http://localhost:3000/api/analytics/feed';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'ANALYZE_POST') {
    // Demo Mode analysis - in production would call backend
    analyzePost(msg.payload).then(result => {
      sendResponse({ success: true, result });
    }).catch(err => {
      sendResponse({ success: false, error: err.message });
    });
    return true; // async
  }
  if (msg.type === 'GET_SETTINGS') {
    chrome.storage.local.get(['voxentra_api', 'demo_mode'], (res) => {
      sendResponse(res);
    });
    return true;
  }
});

async function analyzePost(payload) {
  // Try backend first, fallback to local heuristic
  try {
    const res = await fetch(VOXENTRA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('API failed');
  } catch (e) {
    // Local fallback heuristic
    return localHeuristic(payload.content || '');
  }
}

function localHeuristic(text) {
  const lower = text.toLowerCase();
  let threatScore = 0;
  const reasons = [];
  if (lower.includes('national security') || lower.includes('border')) { threatScore += 20; reasons.push('Sensitive keyword'); }
  if (lower.includes('bot') || lower.includes('coordinated')) { threatScore += 15; reasons.push('Coordination signal'); }
  if (text.length < 30) { threatScore += 10; reasons.push('Low entropy'); }

  let level = 'low';
  if (threatScore >= 50) level = 'critical';
  else if (threatScore >= 30) level = 'high';
  else if (threatScore >= 15) level = 'medium';

  return {
    threat: { level, score: threatScore, reasons },
    sentiment: { sentiment: threatScore > 20 ? 'negative' : 'neutral', score: 0 },
    bot: { isBot: threatScore > 25, score: threatScore / 100 },
    mode: 'local_fallback'
  };
}

console.log('Voxentra background loaded - Demo Mode');
