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

const srcDir = path.resolve('../car 3-2006 Acura tl');
const destDir = path.resolve('public/images/inventory/acura-tl-2006');

async function stageAcura() {
  console.log('Staging Acura TL media...');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  const imageNames = [];
  let featuredCopied = false;

  for (const file of files) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} to public/images/inventory/acura-tl-2006/`);

    if (file.endsWith('.jpeg') || file.endsWith('.jpg')) {
      imageNames.push(file);
      // Copy main beauty shot as featured.jpeg
      if (file.includes('1.50.46 AM (2)')) {
        const featuredDest = path.join(destDir, 'featured.jpeg');
        fs.copyFileSync(srcFile, featuredDest);
        console.log('Created featured.jpeg');
        featuredCopied = true;
      }
    }
  }

  if (!featuredCopied && imageNames.length > 0) {
    fs.copyFileSync(path.join(srcDir, imageNames[0]), path.join(destDir, 'featured.jpeg'));
  }

  // Upload images to Supabase Storage
  console.log('\nUploading images to Supabase Storage (vehicle-images)...');
  const uploadedUrls = [];
  
  // Featured first
  const featuredPath = path.join(destDir, 'featured.jpeg');
  if (fs.existsSync(featuredPath)) {
    const featuredBuffer = fs.readFileSync(featuredPath);
    const { data, error } = await supabase.storage
      .from('vehicle-images')
      .upload('acura-tl-2006/featured.jpeg', featuredBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    if (error) console.error('Error uploading featured.jpeg:', error);
    else {
      const { data: pubData } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl('acura-tl-2006/featured.jpeg');
      uploadedUrls.push(pubData.publicUrl);
      console.log('Uploaded featured.jpeg ->', pubData.publicUrl);
    }
  }

  for (const img of imageNames) {
    const imgPath = path.join(destDir, img);
    const imgBuffer = fs.readFileSync(imgPath);
    const storageKey = `acura-tl-2006/${encodeURIComponent(img)}`;
    const { error } = await supabase.storage
      .from('vehicle-images')
      .upload(storageKey, imgBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });
    if (error) console.error(`Error uploading ${img}:`, error.message);
    else {
      const { data: pubData } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(storageKey);
      uploadedUrls.push(pubData.publicUrl);
      console.log(`Uploaded ${img} -> ${pubData.publicUrl}`);
    }
  }

  // Insert or update Acura in Supabase DB
  console.log('\nUpserting 2006 Acura TL in Supabase database...');
  const acuraData = {
    make: 'Acura',
    model: 'TL',
    year: 2006,
    price: 4500,
    mileage: 164819,
    vin: '19UUA66266A000000', // Contact Dealer / Staged
    status: 'available',
    slug: '2006-acura-tl',
    tags: ['Luxury', 'Leather Interior', 'Sunroof', '3.2L V6 VTEC', 'Automatic', 'Heated Seats'],
    seo_title: '2006 Acura TL 3.2L V6 For Sale Jacksonville FL | Ahaaq Auto Exchange',
    seo_description: 'Clean 2006 Acura TL 3.2L VTEC Sedan in Jacksonville FL. Premium leather interior, sunroof, alloy wheels, smooth automatic transmission. Flexible financing available.',
    body_type: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    description: 'Immaculate 2006 Acura TL with 3.2L V6 VTEC power and smooth automatic transmission. Features gorgeous black leather interior with heated seats, power sunroof, premium sound system, dual exhaust, and alloy wheels. Cold AC and pristine mechanical condition. Ready for immediate delivery in Jacksonville, FL!',
    videoUrl: null,
    images: uploadedUrls.length > 0 ? uploadedUrls : [
      '/images/inventory/acura-tl-2006/featured.jpeg',
      ...imageNames.map(name => `/images/inventory/acura-tl-2006/${encodeURIComponent(name)}`)
    ]
  };

  // Check if exists
  const { data: existing } = await supabase
    .from('vehicles')
    .select('id')
    .eq('make', 'Acura')
    .eq('model', 'TL')
    .eq('year', 2006);

  if (existing && existing.length > 0) {
    const { error: updErr } = await supabase
      .from('vehicles')
      .update(acuraData)
      .eq('id', existing[0].id);
    if (updErr) console.error('Error updating Acura in DB:', updErr);
    else console.log('✓ Successfully updated 2006 Acura TL in Supabase DB!');
  } else {
    const { error: insErr } = await supabase
      .from('vehicles')
      .insert([acuraData]);
    if (insErr) console.error('Error inserting Acura into DB:', insErr);
    else console.log('✓ Successfully inserted 2006 Acura TL into Supabase DB!');
  }

  // Update existing vehicles with default status, slug, and tags if missing
  console.log('\nChecking other vehicles for status, slug, and tags...');
  const { data: allV } = await supabase.from('vehicles').select('*');
  for (const v of (allV || [])) {
    const updates = {};
    if (!v.status) updates.status = 'available';
    if (!v.slug) updates.slug = `${v.year}-${v.make.toLowerCase()}-${v.model.toLowerCase()}`;
    if (!v.tags || v.tags.length === 0) {
      if (v.make === 'Toyota') updates.tags = ['Reliable', 'Clean Commuter', 'Low Maintenance', 'Cold AC'];
      else if (v.make === 'Hyundai') updates.tags = ['AWD SUV', 'Spacious', 'Family Ready', 'Roof Rails'];
      else updates.tags = ['Featured Deal', 'Inspected'];
    }
    if (Object.keys(updates).length > 0) {
      await supabase.from('vehicles').update(updates).eq('id', v.id);
      console.log(`Updated tags/slug/status for ${v.year} ${v.make} ${v.model}`);
    }
  }

  console.log('\n✓ Acura TL Staging and Database Synchronization Complete!');
}

stageAcura();
