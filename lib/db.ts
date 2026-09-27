let prismaInstance: any = null
let prismaFailed = false

function createMockPrisma() {
  // In-memory fallback for Demo Mode when Prisma engine binary unavailable (offline CI)
  console.warn('[Voxentra] Prisma engine unavailable, using in-memory mock DB for Demo Mode')
  const users: any[] = [
    {
      id: 'demo_admin',
      email: 'admin@voxentra.ntro',
      name: 'NTRO Admin',
      // bcrypt hash for Voxentra@2025
      password: '$2a$10$7QJ6Z8K1e5v9X8Y9Z9Z9Zu9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9',
      role: 'admin',
    },
    {
      id: 'demo_analyst',
      email: 'analyst@voxentra.local',
      name: 'Demo Analyst',
      password: '$2a$10$7QJ6Z8K1e5v9X8Y9Z9Z9Zu9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9',
      role: 'analyst',
    },
  ]
  // Pre-hash correctly using bcryptjs sync if needed
  try {
    const bcrypt = require('bcryptjs')
    const hash = bcrypt.hashSync('Voxentra@2025', 10)
    users.forEach(u => u.password = hash)
  } catch {}

  return {
    user: {
      findUnique: async ({ where }: any) => {
        if (where.email) return users.find(u => u.email === where.email) || null
        if (where.id) return users.find(u => u.id === where.id) || null
        return null
      },
      create: async ({ data }: any) => {
        const newUser = { id: `user_${Date.now()}`, ...data }
        users.push(newUser)
        return newUser
      },
      upsert: async ({ where, create }: any) => {
        const existing = users.find(u => u.email === where.email)
        if (existing) return existing
        const newUser = { id: `user_${Date.now()}`, ...create }
        users.push(newUser)
        return newUser
      },
    },
    socialPost: {
      findMany: async () => [],
      create: async ({ data }: any) => data,
    },
    investigation: {
      findMany: async () => [],
    },
    alert: {
      findMany: async () => [],
    },
    keywordTrack: {
      findMany: async () => [],
      upsert: async ({ create }: any) => create,
    },
    $connect: async () => {},
    $disconnect: async () => {},
  }
}

try {
  // Dynamically import to catch engine errors
  const { PrismaClient } = require('@prisma/client')
  const globalForPrisma = globalThis as unknown as { prisma: any | undefined }
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
} catch (e) {
  console.warn('[Voxentra] PrismaClient init failed, falling back to mock:', (e as Error).message)
  prismaFailed = true
  prismaInstance = createMockPrisma()
}

export const prisma = prismaInstance
export const isMockDb = prismaFailed
export default prisma
