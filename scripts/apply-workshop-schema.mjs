import pg from 'pg';
import fs from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

const connectionString = envVars.POSTGRES_URL_NON_POOLING || envVars.POSTGRES_URL;

async function applyWorkshopSchema() {
  console.log("Connecting to PostgreSQL at Supabase...");
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected successfully.");

    const sql = fs.readFileSync('supabase/setup_workshop_platform.sql', 'utf8');
    console.log("Applying workshop schema SQL...");
    await client.query(sql);
    console.log("Workshop schema applied successfully.");

    // Seed default specials if empty
    const { rows: existingSpecials } = await client.query('SELECT count(*) FROM public.service_specials');
    if (parseInt(existingSpecials[0].count) === 0) {
      console.log("Seeding default service specials...");
      const seedSql = `
        INSERT INTO public.service_specials (title, tag, discount_headline, description, promo_code, terms, display_order)
        VALUES 
        ('Synthetic Oil & Filter Service', 'OIL CHANGE', '$15 OFF', 'Includes premium full synthetic oil up to 5 quarts, OEM oil filter replacement, and complimentary 21-point safety inspection.', 'SYNTH15', 'Most cars & light trucks. Taxes and disposal extra.', 1),
        ('Complete Brake System Service', 'BRAKES', '$30 OFF PER AXLE', 'Pad replacement, rotor resurfacing or replacement, caliper inspection, and road test.', 'BRAKE30', 'Valid on front or rear brake service. Cannot combine with other offers.', 2),
        ('A/C System Performance Check & Recharge', 'A/C SERVICE', '$25 OFF', 'Complete pressure check, leak detection inspection, and refrigerant recharge for maximum cooling.', 'COOL25', 'R134a systems. 1234yf systems may vary.', 3),
        ('Full Vehicle Ceramic Window Tinting', 'TINT SPECIAL', '$50 OFF FULL TINT', 'High-heat ceramic film installation blocking 99% UV and up to 85% infrared solar heat.', 'CERAMIC50', 'Valid on complete 4-door vehicles. Rear window included.', 4);
      `;
      await client.query(seedSql);
      console.log("Seeded initial service specials.");
    }

    console.log("Workshop Database setup completed successfully!");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await client.end();
  }
}

applyWorkshopSchema();
