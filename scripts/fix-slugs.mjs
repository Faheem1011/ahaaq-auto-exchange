import { createClient } from '@supabase/supabase-js';
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

const supabase = createClient(envVars.SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

async function fixSlugs() {
  const { data: vehicles, error } = await supabase.from('vehicles').select('*');
  if (error) {
    console.error('Error fetching vehicles:', error);
    return;
  }

  console.log(`Found ${vehicles.length} vehicles in database:`);
  for (const v of vehicles) {
    console.log(`- ID: ${v.id} | ${v.year} ${v.make} ${v.model} | Current Slug: "${v.slug}"`);
    const cleanSlug = `${v.year}-${v.make.toLowerCase()}-${v.model.toLowerCase()}`
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    if (v.slug !== cleanSlug) {
      console.log(`  -> Updating slug to: "${cleanSlug}"`);
      const { error: updateErr } = await supabase.from('vehicles').update({ slug: cleanSlug }).eq('id', v.id);
      if (updateErr) {
        console.error('  -> Failed to update:', updateErr);
      } else {
        console.log('  -> Updated successfully!');
      }
    } else {
      console.log('  -> Slug already clean.');
    }
  }

  const { data: updatedVehicles } = await supabase.from('vehicles').select('id, year, make, model, slug');
  console.log('\nFinal DB vehicles state:', updatedVehicles);
}

fixSlugs();
