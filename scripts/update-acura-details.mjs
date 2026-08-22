import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

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

async function updateAcura() {
  console.log('Updating 2006 Acura TL details in Supabase...');

  const updatePayload = {
    mileage: 168000,
    status: 'available',
    tags: [
      'Clean Title',
      'Low Miles',
      'Ice Cold AC',
      'Chrome Rims',
      'Brand New Tires',
      'Automatic',
      '3.2L V6 VTEC',
      'Leather Seats',
      'Sunroof'
    ],
    description: 'Clean title, low miles — car got only 168k miles on it. Runs and drives perfect with no problem at all, everything runs perfect. Ice cold AC, Automatic engine, Automatic Transmission, super clean inside and out. Equipped with stunning chrome rims with brand new tires installed not even 3 months ago. Ready for immediate delivery at Ahaaq Auto Exchange in Jacksonville, FL.',
    seo_title: '2006 Acura TL for Sale in Jacksonville FL | Clean Title, Chrome Rims, Brand New Tires | Ahaaq Auto Exchange',
    seo_description: '2006 Acura TL for sale in Jacksonville FL. Clean title, only 168k miles, runs & drives perfect with ice cold AC, chrome rims with brand new tires, automatic transmission. Test drive today at Ahaaq Auto Exchange!'
  };

  // Check if record exists
  const { data: existing } = await supabase
    .from('vehicles')
    .select('id, make, model, year')
    .or('slug.eq.2006-acura-tl,make.eq.Acura')
    .limit(1);

  if (existing && existing.length > 0) {
    const id = existing[0].id;
    console.log(`Found existing Acura TL with ID: ${id}. Updating...`);
    const { error: updateErr } = await supabase
      .from('vehicles')
      .update(updatePayload)
      .eq('id', id);

    if (updateErr) {
      console.error('Update error:', updateErr);
    } else {
      console.log('Successfully updated Acura TL in Supabase!');
    }
  } else {
    console.log('Acura TL not found by slug/make, searching all vehicles...');
    const { data: all } = await supabase.from('vehicles').select('*');
    console.log('Vehicles in DB:', all);
  }
}

updateAcura().catch(console.error);
