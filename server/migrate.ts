import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL not set');
}

async function migrate() {
  const client = postgres(connectionString!);
  
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, '../drizzle/0000_initial.sql'),
      'utf-8'
    );
    
    await client.unsafe(sql);
    console.log('✅ Migration completed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await client.end();
  }
}

migrate();