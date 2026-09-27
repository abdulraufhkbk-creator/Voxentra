// Bot detection heuristics - Demo Mode
// Real implementation would use ML + behavioral analysis

export function detectBot(post: {
  author: string
  content: string
  likes: number
  shares: number
  timestamp: string
}): { isBot: boolean, score: number, signals: string[] } {
  const signals: string[] = []
  let score = 0

  // Username patterns
  if (/\d{3,}$/.test(post.author) || post.author.includes('bot_') || /anonymous/.test(post.author)) {
    score += 0.25
    signals.push('Suspicious username pattern')
  }

  // Engagement anomaly: high likes low comments
  const ratio = post.likes / (post.shares + 1)
  if (ratio > 20 && post.likes > 1000) {
    score += 0.2
    signals.push('Engagement anomaly: high likes/low shares')
  }

  // Repetitive content patterns (mock check)
  if (post.content.length < 50 || /(.)\1{3,}/.test(post.content)) {
    score += 0.15
    signals.push('Low content entropy')
  }

  // Posting time burst (mock)
  const hour = new Date(post.timestamp).getHours()
  if (hour >= 2 && hour <= 5) {
    score += 0.1
    signals.push('Unusual posting hour cluster')
  }

  // Coordination keywords
  if (/coordinated|inauthentic|amplifying/.test(post.content.toLowerCase())) {
    // this is actually meta detection, but for demo we add signal
    score += 0.05
  }

  score += Math.random() * 0.2 // noise

  return {
    isBot: score > 0.6,
    score: Math.min(0.99, score),
    signals
  }
}
