import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Voxentra...')

  const hashed = await bcrypt.hash('Voxentra@2025', 10)

  await prisma.user.upsert({
    where: { email: 'admin@voxentra.ntro' },
    update: {},
    create: {
      email: 'admin@voxentra.ntro',
      name: 'NTRO Admin',
      password: hashed,
      role: 'admin',
    }
  })

  await prisma.user.upsert({
    where: { email: 'analyst@voxentra.local' },
    update: {},
    create: {
      email: 'analyst@voxentra.local',
      name: 'Demo Analyst',
      password: hashed,
      role: 'analyst',
    }
  })

  const keywords = [
    { keyword: 'national security', category: 'security' },
    { keyword: 'election', category: 'political' },
    { keyword: 'misinformation', category: 'threat' },
    { keyword: 'cyber attack', category: 'security' },
    { keyword: 'protest', category: 'social' },
    { keyword: '#India', category: 'general' },
  ]

  for (const k of keywords) {
    await prisma.keywordTrack.upsert({
      where: { keyword: k.keyword },
      update: {},
      create: k
    })
  }

  console.log('Seed complete')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(() => prisma.$disconnect())
