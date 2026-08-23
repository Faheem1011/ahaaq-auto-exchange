import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

async function applyFinancingSchema() {
    const connectionString = env.POSTGRES_URL_NON_POOLING || env.POSTGRES_URL || env.DATABASE_URL;
    if (!connectionString) {
        console.error("No Postgres connection string found in .env.local");
        return;
    }

    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log("Connected to Supabase Postgres database!");

        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const schemaPath = path.resolve(__dirname, '../supabase/setup_financing_leads.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

        console.log("Applying financing leads and integration events schema...");
        await client.query(schemaSql);
        console.log("Financing schema applied successfully!");
    } catch (err) {
        console.error("Error applying financing schema:", err);
    } finally {
        await client.end();
    }
}

applyFinancingSchema();
