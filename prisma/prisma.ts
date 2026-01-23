// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!,
// });

// const prisma = new PrismaClient({ adapter });

/** @format */

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Super Admin Database Configuration
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrationsSA',
  },
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});

