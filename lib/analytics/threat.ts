// Threat scoring engine - Demo Mode
// Heuristics for NTRO use case: bot + toxicity + virality + keyword sensitivity

const sensitiveKeywords = [
  'national security', 'border', 'defense', 'election', 'cyber attack',
  'protest', 'misinformation', 'influence operation', 'phishing'
]

export function calculateThreatLevel(post: {
  content: string
  toxicity?: number
  botScore?: number
  likes?: number
  shares?: number
  isBot?: boolean
}): { level: 'low' | 'medium' | 'high' | 'critical', score: number, reasons: string[] } {
  let score = 0
  const reasons: string[] = []
  const text = post.content.toLowerCase()

  sensitiveKeywords.forEach(kw => {
    if (text.includes(kw)) {
      score += 15
      reasons.push(`Sensitive keyword: ${kw}`)
    }
  })

  if ((post.toxicity || 0) > 0.6) {
    score += 20
    reasons.push(`High toxicity: ${post.toxicity?.toFixed(2)}`)
  }
  if ((post.botScore || 0) > 0.7) {
    score += 25
    reasons.push(`High bot probability: ${post.botScore?.toFixed(2)}`)
  }
  if (post.isBot) {
    score += 15
    reasons.push('Account flagged as bot')
  }

  const virality = (post.likes || 0) + (post.shares || 0) * 2
  if (virality > 2000) {
    score += 20
    reasons.push(`High virality: ${virality} engagement`)
  } else if (virality > 500) {
    score += 10
    reasons.push(`Moderate virality`)
  }

  // Coordination signals
  if (text.includes('coordinated') || text.includes('inauthentic') || text.includes('spike')) {
    score += 20
    reasons.push('Coordination indicators detected')
  }

  let level: 'low' | 'medium' | 'high' | 'critical' = 'low'
  if (score >= 70) level = 'critical'
  else if (score >= 45) level = 'high'
  else if (score >= 25) level = 'medium'
  else level = 'low'

  return { level, score: Math.min(100, score), reasons }
}
