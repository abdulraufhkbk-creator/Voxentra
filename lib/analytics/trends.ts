export function extractHashtags(text: string): string[] {
  const matches = text.match(/#\w+/g)
  return matches ? matches.map(t => t.toLowerCase()) : []
}

export function extractKeywords(text: string, topK = 5): string[] {
  const stopwords = new Set(['the','is','are','and','or','about','for','with','this','that','from','near','need','shows','massive','potential'])
  const words = text.toLowerCase().replace(/[^\w\s]/g,'').split(/\s+/).filter(w => w.length > 3 && !stopwords.has(w))
  const freq: Record<string, number> = {}
  words.forEach(w => freq[w] = (freq[w]||0)+1)
  return Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, topK).map(([w]) => w)
}

export function clusterTrends(posts: { content: string, hashtags: string[] }[]) {
  const hashtagCount: Record<string, number> = {}
  const keywordCount: Record<string, number> = {}

  posts.forEach(p => {
    p.hashtags.forEach(h => hashtagCount[h] = (hashtagCount[h]||0)+1)
    extractKeywords(p.content, 3).forEach(k => keywordCount[k] = (keywordCount[k]||0)+1)
  })

  const topHashtags = Object.entries(hashtagCount).sort((a,b) => b[1]-a[1]).slice(0,10).map(([name,value]) => ({ name, value }))
  const topKeywords = Object.entries(keywordCount).sort((a,b) => b[1]-a[1]).slice(0,10).map(([name,value]) => ({ name, value }))

  return { topHashtags, topKeywords }
}
