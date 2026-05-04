import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
export const prisma = new PrismaClient({ adapter })