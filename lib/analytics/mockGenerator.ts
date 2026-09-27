// Demo Mode Mock Data Generator for Voxentra
// Simulates social media posts for NTRO analytics without real API keys

export type MockPost = {
  id: string
  platform: 'twitter' | 'reddit' | 'telegram' | 'instagram'
  author: string
  authorId: string
  content: string
  timestamp: string
  likes: number
  shares: number
  comments: number
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed'
  sentimentScore: number
  toxicity: number
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  isBot: boolean
  botScore: number
  hashtags: string[]
  keywords: string[]
  location: string
  language: string
  url: string
}

const platforms = ['twitter', 'reddit', 'telegram', 'instagram'] as const
const authors = [
  'defense_analyst', 'news_wire_in', 'citizen_reporter', 'geo_pol_tracker',
  'cyber_sec_watch', 'osint_india', 'factcheck_team', 'viral_trends',
  'anonymous_source_42', 'bot_account_9182', 'influencer_politics', 'regional_news'
]
const locations = ['New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Unknown', 'Global']
const hashtagsPool = [
  '#NationalSecurity', '#India', '#Election2025', '#CyberSecurity', '#Misinformation',
  '#OSINT', '#Geopolitics', '#Breaking', '#FactCheck', '#Viral', '#Protest', '#Defense'
]

const contentTemplates = [
  { text: "Unverified reports circulating about {keyword} near border areas. Need cross-verification from multiple sources. #OSINT", threat: 'medium', sentiment: 'neutral' },
  { text: "Massive spike in bot activity detected pushing narrative around {keyword}. Coordinated inauthentic behavior suspected.", threat: 'high', sentiment: 'negative' },
  { text: "Positive sentiment surge observed for national initiative on {keyword}. Organic growth 73% vs bot 27%.", threat: 'low', sentiment: 'positive' },
  { text: "ALERT: Potential misinformation campaign targeting {keyword}. Same text pattern across 200+ accounts in 2 hours.", threat: 'critical', sentiment: 'negative' },
  { text: "Citizen discussion on {keyword} shows mixed reactions. Fact-check required for viral claims.", threat: 'medium', sentiment: 'mixed' },
  { text: "Breaking: {keyword} trending with 50K+ mentions. Sentiment analysis shows polarized debate.", threat: 'medium', sentiment: 'mixed' },
  { text: "Cyber threat intel: Phishing links disguised as {keyword} news circulating on Telegram channels.", threat: 'high', sentiment: 'negative' },
  { text: "Analysis: Foreign influence operation detected amplifying divisive content on {keyword}.", threat: 'critical', sentiment: 'negative' },
  { text: "Community response to {keyword} initiative overwhelmingly positive. High civic engagement metrics.", threat: 'low', sentiment: 'positive' },
  { text: "Viral video claim about {keyword} debunked. Original footage from 2019, out of context reuse.", threat: 'high', sentiment: 'neutral' },
]

const keywordsPool = ['national security', 'election integrity', 'cyber attack', 'border tensions', 'misinformation', 'defense procurement', 'digital sovereignty']

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateMockPost(id: number): MockPost {
  const template = randomItem(contentTemplates)
  const keyword = randomItem(keywordsPool)
  const platform = randomItem([...platforms])
  const isBot = Math.random() < 0.22 // 22% bots
  const toxicity = Math.random() * (template.threat === 'critical' ? 0.9 : 0.6)
  const botScore = isBot ? 0.7 + Math.random() * 0.3 : Math.random() * 0.4

  return {
    id: `post_${id}_${Date.now()}`,
    platform,
    author: randomItem(authors) + (isBot ? `_bot_${randomInt(100,999)}` : ''),
    authorId: `user_${randomInt(10000,99999)}`,
    content: template.text.replace('{keyword}', keyword),
    timestamp: new Date(Date.now() - randomInt(0, 48*3600000)).toISOString(),
    likes: randomInt(0, isBot ? 5000 : 1200),
    shares: randomInt(0, 800),
    comments: randomInt(0, 400),
    sentiment: template.sentiment as any,
    sentimentScore: template.sentiment === 'positive' ? 0.6 + Math.random()*0.4 : template.sentiment === 'negative' ? -0.8 + Math.random()*0.4 : (Math.random()-0.5)*0.5,
    toxicity,
    threatLevel: template.threat as any,
    isBot,
    botScore,
    hashtags: Array.from({length: randomInt(1,4)}, () => randomItem(hashtagsPool)),
    keywords: [keyword, randomItem(keywordsPool)],
    location: randomItem(locations),
    language: Math.random() < 0.8 ? 'en' : randomItem(['hi', 'en']),
    url: `https://${platform}.com/post/${randomInt(1000000,9999999)}`
  }
}

export function generateMockFeed(count = 50): MockPost[] {
  return Array.from({ length: count }, (_, i) => generateMockPost(i))
}

export function generateSentimentTimeSeries(days = 7) {
  const data = []
  const now = new Date()
  for (let i = days-1; i >=0; i--) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      positive: randomInt(30, 60),
      negative: randomInt(15, 45),
      neutral: randomInt(20, 40),
      mixed: randomInt(5, 20),
      threatScore: randomInt(20, 90),
    })
  }
  return data
}

export function generateTrendData() {
  return [
    { name: 'national security', value: 450, growth: 12 },
    { name: 'election', value: 380, growth: -5 },
    { name: 'misinformation', value: 320, growth: 34 },
    { name: 'cyber attack', value: 280, growth: 18 },
    { name: 'border', value: 220, growth: 7 },
    { name: 'defense', value: 180, growth: 22 },
    { name: 'protest', value: 150, growth: -12 },
    { name: 'OSINT', value: 120, growth: 15 },
  ]
}

export function generateNetworkData() {
  const nodes = Array.from({length: 25}, (_, i) => ({
    id: `node_${i}`,
    label: i < 5 ? `influencer_${i}` : `user_${i}`,
    group: i < 3 ? 'influencer' : i < 8 ? 'amplifier' : i < 15 ? 'bot_cluster' : 'organic',
    size: i < 3 ? randomInt(30,50) : i < 8 ? randomInt(15,25) : randomInt(5,15),
    threat: randomItem(['low','medium','high','critical']),
  }))
  const links = Array.from({length: 40}, () => ({
    source: `node_${randomInt(0,24)}`,
    target: `node_${randomInt(0,24)}`,
    value: randomInt(1,10),
    type: randomItem(['retweet','mention','reply'])
  })).filter(l => l.source !== l.target)
  return { nodes, links }
}

export function generateThreatAlerts() {
  return [
    { id: '1', type: 'bot_spike', title: 'Bot spike detected: #NationalSecurity', severity: 'high', description: '300% increase in bot accounts pushing coordinated narrative in last 2h', time: '2m ago' },
    { id: '2', type: 'misinformation', title: 'Viral misinformation: Out-of-context video', severity: 'critical', description: 'Video from 2019 reused with false claims about border incident. 50K shares.', time: '12m ago' },
    { id: '3', type: 'sentiment_shift', title: 'Sentiment shift: Election topic', severity: 'medium', description: 'Negative sentiment increased 45% in 6h around election keywords', time: '34m ago' },
    { id: '4', type: 'foreign_influence', title: 'Possible foreign influence operation', severity: 'high', description: 'Cluster of accounts with foreign creation patterns amplifying divisive content', time: '1h ago' },
    { id: '5', type: 'viral', title: 'Viral content: Defense news', severity: 'low', description: 'Positive defense achievement trending organically with high engagement', time: '2h ago' },
  ]
}
