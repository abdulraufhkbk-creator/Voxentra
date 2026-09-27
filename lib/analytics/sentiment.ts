// Simple rule-based sentiment analyzer for Demo Mode
// In production, this would call a ML model or external API

const positiveWords = ['positive', 'good', 'great', 'excellent', 'support', 'achievement', 'success', 'progress', 'initiative', 'growth', 'organic', 'civic', 'engagement', 'overwhelmingly']
const negativeWords = ['threat', 'attack', 'misinformation', 'fake', 'bot', 'coordinated', 'inauthentic', 'phishing', 'divisive', 'alert', 'spike', 'suspicious', 'foreign', 'influence']
const toxicityIndicators = ['attack', 'fake', 'bot', 'phishing', 'divisive', 'threat', 'misinformation']

export function analyzeSentiment(text: string): { sentiment: string, score: number, toxicity: number } {
  const lower = text.toLowerCase()
  let pos = 0, neg = 0
  positiveWords.forEach(w => { if (lower.includes(w)) pos++ })
  negativeWords.forEach(w => { if (lower.includes(w)) neg++ })
  
  const total = pos + neg
  let sentiment = 'neutral'
  let score = 0
  if (total === 0) {
    sentiment = 'neutral'
    score = 0
  } else if (pos > neg * 1.5) {
    sentiment = 'positive'
    score = pos / (total + 1)
  } else if (neg > pos * 1.5) {
    sentiment = 'negative'
    score = -neg / (total + 1)
  } else {
    sentiment = 'mixed'
    score = (pos - neg) / (total + 2)
  }

  let tox = 0
  toxicityIndicators.forEach(w => { if (lower.includes(w)) tox += 0.15 })
  tox = Math.min(0.95, tox + Math.random()*0.1)

  return { sentiment, score, toxicity: tox }
}

export function batchAnalyze(posts: { content: string }[]) {
  return posts.map(p => analyzeSentiment(p.content))
}
