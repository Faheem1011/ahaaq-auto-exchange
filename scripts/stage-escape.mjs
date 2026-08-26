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

const srcDir = path.resolve('../car 4-2012 ford escape xlt clean 3900');
const destDir = path.resolve('public/images/inventory/ford-escape-2012');

async function stageEscape() {
  console.log('Staging 2012 Ford Escape XLT media...');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  const imageNames = [];

  // 1. Copy all images to public/images/inventory/ford-escape-2012/
  for (const file of files) {
    if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${file} to public/images/inventory/ford-escape-2012/`);
      imageNames.push(file);

      // Main hero beauty shot
      if (file.includes('10.54.21 PM')) {
        const featuredDest = path.join(destDir, 'featured.jpeg');
        fs.copyFileSync(srcFile, featuredDest);
        console.log('Created featured.jpeg');
      }
    }
  }

  // Ensure featured.jpeg exists
  const featuredPath = path.join(destDir, 'featured.jpeg');
  if (!fs.existsSync(featuredPath) && imageNames.length > 0) {
    fs.copyFileSync(path.join(srcDir, imageNames[0]), featuredPath);
    console.log('Created fallback featured.jpeg');
  }

  // 2. Upload images to Supabase Storage (vehicle-images)
  console.log('\nUploading images to Supabase Storage (vehicle-images)...');
  const uploadedUrls = [];

  // Featured first
  if (fs.existsSync(featuredPath)) {
    const featuredBuffer = fs.readFileSync(featuredPath);
    const { error: featErr } = await supabase.storage
      .from('vehicle-images')
      .upload('ford-escape-2012/featured.jpeg', featuredBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    if (featErr) console.error('Error uploading featured.jpeg:', featErr.message);
    else {
      const { data: pubData } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl('ford-escape-2012/featured.jpeg');
      uploadedUrls.push(pubData.publicUrl);
      console.log('Uploaded featured.jpeg ->', pubData.publicUrl);
    }
  }

  // Other gallery images
  for (const img of imageNames) {
    const imgPath = path.join(destDir, img);
    const imgBuffer = fs.readFileSync(imgPath);
    const storageKey = `ford-escape-2012/${encodeURIComponent(img)}`;
    const { error: upErr } = await supabase.storage
      .from('vehicle-images')
      .upload(storageKey, imgBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    if (upErr) console.error(`Error uploading ${img}:`, upErr.message);
    else {
      const { data: pubData } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(storageKey);
      uploadedUrls.push(pubData.publicUrl);
      console.log(`Uploaded ${img} -> ${pubData.publicUrl}`);
    }
  }

  // 3. Upsert 2012 Ford Escape XLT in Supabase DB
  console.log('\nUpserting 2012 Ford Escape XLT in Supabase database...');
  const escapeData = {
    make: 'Ford',
    model: 'Escape XLT',
    year: 2012,
    price: 3900,
    mileage: 172952,
    vin: '1FMCU0C76CKC60675',
    status: 'available',
    slug: '2012-ford-escape-xlt',
    tags: [
      'Clean SUV',
      'Under $4,000',
      'Fuel Efficient 2.5L',
      'Ice Cold AC',
      'Automatic',
      'Spacious Cargo',
      'Alloy Wheels',
      'Keyless Entry',
      'Clean Title'
    ],
    seo_title: '2012 Ford Escape XLT For Sale Jacksonville FL | Clean SUV $3,900 | Ahaaq Auto Exchange',
    seo_description: 'Clean 2012 Ford Escape XLT SUV for sale in Jacksonville, FL for only $3,900! Reliable 2.5L 4-cylinder, smooth automatic transmission, ice cold AC, power options, and clean title. Test drive at Ahaaq Auto Exchange.',
    body_type: 'SUV',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    description: 'Super clean 2012 Ford Escape XLT compact SUV in great condition inside and out! Priced at an unbeatable $3,900. Powered by a dependable and fuel-efficient 2.5L 4-cylinder engine paired with a smooth automatic transmission. Features ice-cold air conditioning, clean tan cloth interior, power windows, power locks, power mirrors, keyless entry, alloy wheels with strong tires, factory audio system, and 60/40 split folding rear seats for ample cargo space. Fully inspected and road-ready for Jacksonville drivers. Contact Ahaaq Auto Exchange today for a test drive!',
    videoUrl: null,
    images: uploadedUrls.length > 0 ? uploadedUrls : [
      '/images/inventory/ford-escape-2012/featured.jpeg',
      ...imageNames.map(name => `/images/inventory/ford-escape-2012/${encodeURIComponent(name)}`)
    ]
  };

  // Check if exists
  const { data: existing } = await supabase
    .from('vehicles')
    .select('id')
    .or(`vin.eq.1FMCU0C76CKC60675,slug.eq.2012-ford-escape-xlt,and(make.eq.Ford,model.ilike.%Escape%,year.eq.2012)`);

  if (existing && existing.length > 0) {
    const { error: updErr } = await supabase
      .from('vehicles')
      .update(escapeData)
      .eq('id', existing[0].id);
    if (updErr) console.error('Error updating Ford Escape in DB:', updErr);
    else console.log('✓ Successfully updated 2012 Ford Escape XLT in Supabase DB! ID:', existing[0].id);
  } else {
    const { data: insData, error: insErr } = await supabase
      .from('vehicles')
      .insert([escapeData])
      .select();
    if (insErr) console.error('Error inserting Ford Escape into DB:', insErr);
    else console.log('✓ Successfully inserted 2012 Ford Escape XLT into Supabase DB! ID:', insData?.[0]?.id);
  }

  console.log('\n✓ 2012 Ford Escape XLT Staging and Database Synchronization Complete!');
}

stageEscape();
