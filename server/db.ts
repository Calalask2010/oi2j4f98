import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Only initialize database if DATABASE_URL is provided
if (process.env.DATABASE_URL) {
  export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  export const db = drizzle({ client: pool, schema });
} else {
  console.log("No DATABASE_URL provided - database features will be disabled");
  export const pool = null;
  export const db = null;
}