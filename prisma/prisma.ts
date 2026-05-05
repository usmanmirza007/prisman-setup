import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
export const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
})

// Better connection test
async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1 as test`
    console.log('yoyoyoyo');

    console.log('✅ Prisma successfully connected to the database.')
  } catch (err: any) {
    console.error('❌ Connection failed:', err.message)
    if (err.meta?.driverAdapterError) {
      console.error('Driver error details:', err.meta.driverAdapterError)
    }
  }
}

testConnection()