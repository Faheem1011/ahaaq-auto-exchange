import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Simple .env.local parser
function loadEnv() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const envPath = path.resolve(__dirname, '../.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            let value = match[2].trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1);
            }
            env[match[1].trim()] = value;
        }
    });
    return env;
}

const env = loadEnv();

async function applySchema() {
    const client = new Client({
        connectionString: env.POSTGRES_URL_NON_POOLING, // Non-pooling is better for migrations
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log("Connected to Postgres!");

        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const schemaPath = path.resolve(__dirname, '../supabase-schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

        // Split by semicolons for simple execution, or just run the whole blob
        // Given it's a bit complex with triggers and policies, execution of the whole blob is usually fine for pg client.
        console.log("Applying schema...");
        await client.query(schemaSql);
        console.log("Schema applied successfully!");
    } catch (err) {
        console.error("Error applying schema:", err);
    } finally {
        await client.end();
    }
}

applySchema();
