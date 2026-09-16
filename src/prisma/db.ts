import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

// Set up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;

// Create a new connection pool using the provided connection string.
const pool = new Pool({ connectionString: process.env['DATABASE_URL'] });

export const db = postgres<Contract>({
  contractJson,
  // Pass the Neon connection pool to Prisma Next
  pg: pool as any,
});
