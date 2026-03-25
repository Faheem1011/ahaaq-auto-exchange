import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
);

// Manual import of localVehicles to avoid complexity with relative paths in different environments
// We'll just define the data here or read the file as string and regex it if needed.
// Since we have the file content from previous step, let's just hardcode the migration data for these 2 cars.

const vehiclesToMigrate = [
    {
        make: "Toyota",
        model: "Corolla",
        year: 2010,
        price: 4900,
        mileage: 205051,
        vin: "Contact Dealer",
        description: "Very clean 2010 Toyota Corolla. Local trade-in, perfect commuter car with legendary reliability. Runs and drives excellent, ice cold AC.",
        images: [
            "/images/inventory/corolla-2010/featured.jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.09%20AM.jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM%20(1).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM%20(2).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM%20(3).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM%20(4).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM%20(6).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM%20(7).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM%20(8).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.11%20AM.jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.12%20AM%20(1).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.12%20AM%20(2).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.12%20AM%20(3).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.12%20AM%20(4).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.12%20AM%20(5).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.12%20AM%20(6).jpeg",
            "/images/inventory/corolla-2010/WhatsApp%20Image%202026-03-18%20at%2012.24.12%20AM.jpeg"
        ]
    },
    {
        make: "Hyundai",
        model: "Santa Fe",
        year: 2012,
        price: 5900,
        mileage: 104728,
        vin: "5XYZG3AB3CG135055",
        description: "Spacious 2012 Hyundai Santa Fe AWD. Great family vehicle ready for any weather. Well-maintained interior and smooth comfortable ride.",
        images: [
            "/images/inventory/santa-fe-2012/featured.jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.35%20AM.jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM%20(1).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM%20(2).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM%20(3).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM%20(4).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM%20(6).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM%20(7).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM%20(8).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.36%20AM.jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.37%20AM%20(1).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.37%20AM%20(2).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.37%20AM%20(3).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.37%20AM%20(4).jpeg",
            "/images/inventory/santa-fe-2012/WhatsApp%20Image%202026-03-18%20at%2012.22.37%20AM.jpeg"
        ]
    }
];

async function runMigration() {
    console.log("Starting migration...");
    for (const vehicle of vehiclesToMigrate) {
        console.log(`Migrating ${vehicle.year} ${vehicle.make} ${vehicle.model}...`);
        const { error } = await supabase
            .from('vehicles')
            .upsert(vehicle, { onConflict: 'vin' }) // Use VIN as natural key if possible
            .select();
        
        if (error) {
            console.error(`Error migrating ${vehicle.model}:`, error);
        } else {
            console.log(`Successfully migrated ${vehicle.model}.`);
        }
    }
    console.log("Migration complete!");
}

runMigration();
