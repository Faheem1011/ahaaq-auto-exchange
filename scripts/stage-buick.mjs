import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import https from 'https';

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

const srcDir = path.resolve('../2011 Buick Lacrosse Cxl Price 3900');
const destDir = path.resolve('public/images/inventory/buick-lacrosse-2011');

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function stageBuick() {
  console.log('========================================');
  console.log('Staging 2011 Buick LaCrosse CXL Media...');
  console.log('========================================');

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const rawFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
  console.log(`Found ${rawFiles.length} images in source directory: ${srcDir}`);

  // Sort files for consistent gallery order
  // WhatsApp Image 2026-09-08 at 5.46.10 PM.jpeg is the ideal front-angle hero beauty shot
  const heroFile = rawFiles.find(f => f.includes('5.46.10 PM')) || rawFiles[0];
  fs.copyFileSync(path.join(srcDir, heroFile), path.join(destDir, 'featured.jpeg'));
  console.log(`Created featured.jpeg from: ${heroFile}`);

  const cleanFileNames = ['featured.jpeg'];
  let idx = 1;

  for (const raw of rawFiles) {
    // 1. Copy raw file
    const srcFile = path.join(srcDir, raw);
    fs.copyFileSync(srcFile, path.join(destDir, raw));

    // 2. Copy as clean numbered name
    const cleanName = `buick-${String(idx).padStart(2, '0')}.jpeg`;
    fs.copyFileSync(srcFile, path.join(destDir, cleanName));
    cleanFileNames.push(cleanName);
    idx++;
  }

  console.log(`Copied ${rawFiles.length} raw files and created ${cleanFileNames.length} standardized gallery files in ${destDir}`);

  // 2. Upload images to Supabase Storage (vehicle-images)
  console.log('\nUploading images to Supabase Storage (vehicle-images/buick-lacrosse-2011)...');
  const uploadedUrls = [];

  for (const cleanName of cleanFileNames) {
    const filePath = path.join(destDir, cleanName);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `buick-lacrosse-2011/${cleanName}`;

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
      
      const isOk = await testUrl(data.publicUrl);
      if (isOk) {
        uploadedUrls.push(data.publicUrl);
        console.log(`✓ Uploaded and verified (200 OK): ${cleanName} -> ${data.publicUrl}`);
      } else {
        console.warn(`! Uploaded ${cleanName}, but HTTP verification returned non-200. URL: ${data.publicUrl}`);
        uploadedUrls.push(data.publicUrl);
      }
    }
  }

  // 3. Upsert 2011 Buick LaCrosse CXL in Supabase DB
  console.log('\nUpserting 2011 Buick LaCrosse CXL in Supabase database...');
  const buickData = {
    make: 'Buick',
    model: 'LaCrosse CXL',
    year: 2011,
    price: 3900,
    mileage: 191056,
    vin: '1G4GD5E32BF191056',
    status: 'available',
    slug: '2011-buick-lacrosse-cxl',
    tags: [
      'Clean Title',
      'Under $4,000',
      'Luxury Sedan',
      'Ice Cold AC',
      'Automatic',
      'CXL Luxury Trim',
      'Alloy Wheels',
      'Rear Parking Sensors',
      'Clean In and Out',
      'Jacksonville FL'
    ],
    seo_title: '2011 Buick LaCrosse CXL For Sale Jacksonville FL | Luxury Sedan $3,900 | Ahaaq Auto Exchange',
    seo_description: 'Clean 2011 Buick LaCrosse CXL luxury sedan for sale in Jacksonville, FL for only $3,900! Clean title, 191k miles, ice cold AC, smooth automatic transmission, alloy wheels, parking sensors. Test drive at 6615 N Main St, Jacksonville FL.',
    body_type: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    description: 'Super clean 2011 Buick LaCrosse CXL 4-door luxury sedan in excellent condition inside and out! Priced at an unbeatable $3,900. Powered by a dependable, smooth automatic engine paired with an effortless automatic transmission. Clean title, runs and drives perfect with no problems at all — everything works and runs smooth! Features ice-cold air conditioning, premium luxury interior, Buick signature waterfall chrome front grille, classic hood VentiPorts, multi-spoke factory alloy wheels with good tires, rear parking assist sensors, power windows, power door locks, power adjustable side mirrors with integrated turn signals, keyless entry, steering wheel audio controls, cruise control, and Driver Information Center (DIC) with digital speedometer. Completely clean inside and out, fully inspected and ready for immediate delivery in Jacksonville, FL. Visit Ahaaq Auto Exchange at 6615 N Main St, Jacksonville, FL 32208 or call (904) 502-9709 today!',
    videoUrl: null,
    images: uploadedUrls.length > 0 ? uploadedUrls : [
      '/images/inventory/buick-lacrosse-2011/featured.jpeg',
      ...Array.from({ length: 11 }, (_, i) => `/images/inventory/buick-lacrosse-2011/buick-${String(i + 1).padStart(2, '0')}.jpeg`)
    ]
  };

  // Check if exists
  const { data: existing } = await supabase
    .from('vehicles')
    .select('id')
    .or(`slug.eq.2011-buick-lacrosse-cxl,and(make.eq.Buick,model.ilike.%LaCrosse%,year.eq.2011)`);

  if (existing && existing.length > 0) {
    const { error: updErr } = await supabase
      .from('vehicles')
      .update(buickData)
      .eq('id', existing[0].id);
    if (updErr) console.error('Error updating Buick in DB:', updErr);
    else console.log('✓ Successfully updated 2011 Buick LaCrosse CXL in Supabase DB! ID:', existing[0].id);
  } else {
    const { data: insData, error: insErr } = await supabase
      .from('vehicles')
      .insert([buickData])
      .select();
    if (insErr) console.error('Error inserting Buick into DB:', insErr);
    else console.log('✓ Successfully inserted 2011 Buick LaCrosse CXL into Supabase DB! ID:', insData?.[0]?.id);
  }

  console.log('\n✓ 2011 Buick LaCrosse CXL Staging and Supabase DB Sync Complete!');
}

stageBuick();
