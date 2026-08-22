process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import pg from 'pg';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n');
const envVars = {};
for (const line of lines) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    envVars[match[1].trim()] = val;
  }
}

const pool = new pg.Pool({
  connectionString: envVars.POSTGRES_URL_NON_POOLING || envVars.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

async function inspectSchema() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);
    console.log('Columns in public schema:');
    let currentTable = '';
    for (const row of res.rows) {
      if (row.table_name !== currentTable) {
        currentTable = row.table_name;
        console.log(`\n--- TABLE: ${currentTable} ---`);
      }
      console.log(`  ${row.column_name} (${row.data_type}) nullable: ${row.is_nullable}`);
    }
  } catch (err) {
    console.error('Error querying schema:', err);
  } finally {
    client.release();
    pool.end();
  }
}

inspectSchema();
