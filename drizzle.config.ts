import { type Config } from 'drizzle-kit';

import { env } from '@/env';

export default {
  schema: './src/server/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ['bananalens_*'],
  verbose: true,
  strict: true,
} satisfies Config;
