import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL)
  throw new Error('DATABASE_URL not found in environment');

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client);
