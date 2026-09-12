import fs from 'fs';
import path from 'path';
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

const srcDir = path.resolve('../2016 Chevrolet cruze  limited edition');
const destDir = path.resolve('public/images/inventory/chevy-cruze-2016');

async function stageCruze() {
  console.log('========================================');
  console.log('Staging 2016 Chevrolet Cruze Limited LT Media...');
  console.log('========================================');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const rawFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Found ${rawFiles.length} images in source directory.`);

  // Choose the best hero beauty shot for featured.jpeg
  // WhatsApp Image 2026-09-02 at 8.42.24 PM (1).jpeg is the crisp front 3/4 angle
  const heroFile = rawFiles.find(f => f.includes('8.42.24 PM (1)')) || rawFiles[0];
  fs.copyFileSync(path.join(srcDir, heroFile), path.join(destDir, 'featured.jpeg'));
  console.log(`Created featured.jpeg from: ${heroFile}`);

  const cleanFileNames = ['featured.jpeg'];
  let idx = 1;

  for (const raw of rawFiles) {
    // 1. Copy raw file
    const srcFile = path.join(srcDir, raw);
    fs.copyFileSync(srcFile, path.join(destDir, raw));

    // 2. Copy as clean numbered name
    const cleanName = `cruze-${String(idx).padStart(2, '0')}.jpeg`;
    fs.copyFileSync(srcFile, path.join(destDir, cleanName));
    cleanFileNames.push(cleanName);
    idx++;
  }

  console.log(`Copied ${rawFiles.length} raw files and created ${cleanFileNames.length} standardized gallery files in ${destDir}`);

  // 2. Upload images to Supabase Storage (vehicle-images)
  console.log('\nUploading images to Supabase Storage (vehicle-images/chevy-cruze-2016)...');
  const uploadedUrls = [];

  for (const cleanName of cleanFileNames) {
    const filePath = path.join(destDir, cleanName);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `chevy-cruze-2016/${cleanName}`;

    const { error: upErr } = await supabase.storage
      .from('vehicle-images')
      .upload(storagePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (upErr) {
      console.error(`Upload error on ${cleanName}:`, upErr.message);
    } else {
      const { data } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(storagePath);
      uploadedUrls.push(data.publicUrl);
      console.log(`✓ Uploaded ${cleanName} -> ${data.publicUrl}`);
    }
  }

  // 3. Upsert 2016 Chevrolet Cruze Limited LT in Supabase DB
  console.log('\nUpserting 2016 Chevrolet Cruze Limited LT in Supabase database...');
  const cruzeData = {
    make: 'Chevrolet',
    model: 'Cruze Limited LT',
    year: 2016,
    price: 4900,
    mileage: 161852,
    vin: '1G1PE5SB2G7106794',
    status: 'available',
    slug: '2016-chevrolet-cruze-limited-lt',
    tags: [
      'Clean Title',
      'Under $5,000',
      'Fuel Efficient 1.4L Turbo',
      'Ice Cold AC',
      'Automatic',
      'ECOTEC Engine',
      'Alloy Wheels',
      'Clean In and Out',
      'Sedan',
      'Commuter Ready'
    ],
    seo_title: '2016 Chevrolet Cruze Limited LT For Sale Jacksonville FL | Clean Sedan $4,900 | Ahaaq Auto Exchange',
    seo_description: 'Clean 2016 Chevrolet Cruze Limited LT 1.4L Turbo Sedan for sale in Jacksonville, FL for only $4,900! 161k miles, clean title, ice cold AC, smooth automatic, alloy wheels, power options. Test drive at 6615 N Main St, Jacksonville FL.',
    body_type: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    description: 'Super clean 2016 Chevrolet Cruze Limited LT 4-door sedan in excellent condition inside and out! Priced at an unbeatable $4,900. Powered by a fuel-efficient and spirited 1.4L 4-cylinder ECOTEC Turbocharged engine paired with a smooth 6-speed automatic transmission with manual shift mode (FWD). Features ice-cold air conditioning, clean black premium cloth interior, power windows, power door locks, power adjustable side mirrors, keyless entry, alloy wheels with strong tires, factory sound system with CD/MP3/AUX/Bluetooth connectivity, steering wheel audio and cruise controls, and 60/40 split-folding rear seats with expansive trunk capacity. Clean title, runs and drives perfect with no problems at all. Fully inspected and road-ready for Jacksonville and North Florida drivers. Contact Ahaaq Auto Exchange today for a test drive!',
    videoUrl: null,
    images: uploadedUrls.length > 0 ? uploadedUrls : [
      '/images/inventory/chevy-cruze-2016/featured.jpeg',
      ...Array.from({ length: 21 }, (_, i) => `/images/inventory/chevy-cruze-2016/cruze-${String(i + 1).padStart(2, '0')}.jpeg`)
    ]
  };

  // Check if exists
  const { data: existing } = await supabase
    .from('vehicles')
    .select('id')
    .or(`vin.eq.1G1PE5SB2G7106794,slug.eq.2016-chevrolet-cruze-limited-lt,and(make.eq.Chevrolet,model.ilike.%Cruze%,year.eq.2016)`);

  if (existing && existing.length > 0) {
    const { error: updErr } = await supabase
      .from('vehicles')
      .update(cruzeData)
      .eq('id', existing[0].id);
    if (updErr) console.error('Error updating Chevrolet Cruze in DB:', updErr);
    else console.log('✓ Successfully updated 2016 Chevrolet Cruze Limited LT in Supabase DB! ID:', existing[0].id);
  } else {
    const { data: insData, error: insErr } = await supabase
      .from('vehicles')
      .insert([cruzeData])
      .select();
    if (insErr) console.error('Error inserting Chevrolet Cruze into DB:', insErr);
    else console.log('✓ Successfully inserted 2016 Chevrolet Cruze Limited LT into Supabase DB! ID:', insData?.[0]?.id);
  }

  console.log('\n✓ 2016 Chevrolet Cruze Limited LT Staging and Database Synchronization Complete!');
}

stageCruze();
