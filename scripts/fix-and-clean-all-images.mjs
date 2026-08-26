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

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

// 1. Clean and Stage 2012 Ford Escape
async function fixEscape() {
  console.log('\n========================================');
  console.log('Fixing 2012 Ford Escape Images...');
  console.log('========================================');

  const srcDir = path.resolve('../car 4-2012 ford escape xlt clean 3900');
  const destDir = path.resolve('public/images/inventory/ford-escape-2012');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const rawFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
  
  // Hero shot is 10.54.21 PM
  const heroFile = rawFiles.find(f => f.includes('10.54.21 PM')) || rawFiles[0];
  fs.copyFileSync(path.join(srcDir, heroFile), path.join(destDir, 'featured.jpeg'));

  const cleanFileNames = ['featured.jpeg'];
  let idx = 1;

  for (const raw of rawFiles) {
    const cleanName = `escape-${String(idx).padStart(2, '0')}.jpeg`;
    fs.copyFileSync(path.join(srcDir, raw), path.join(destDir, cleanName));
    cleanFileNames.push(cleanName);
    idx++;
  }

  // Upload to Supabase Storage
  console.log('Uploading clean Escape images to Supabase Storage...');
  const uploadedUrls = [];

  for (const cleanName of cleanFileNames) {
    const filePath = path.join(destDir, cleanName);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `ford-escape-2012/${cleanName}`;

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
      
      const ok = await testUrl(data.publicUrl);
      console.log(`[${ok ? '200 OK' : 'FAILED'}] ${cleanName} -> ${data.publicUrl}`);
      uploadedUrls.push(data.publicUrl);
    }
  }

  // Update Supabase DB
  const { data: vRecord } = await supabase
    .from('vehicles')
    .select('id')
    .eq('slug', '2012-ford-escape-xlt')
    .single();

  if (vRecord) {
    const { error: updErr } = await supabase
      .from('vehicles')
      .update({ images: uploadedUrls })
      .eq('id', vRecord.id);

    if (updErr) console.error('DB Update error:', updErr);
    else console.log('✓ Successfully updated Ford Escape image URLs in Supabase DB!');
  }
}

// 2. Clean and Stage 2006 Acura TL
async function fixAcura() {
  console.log('\n========================================');
  console.log('Fixing 2006 Acura TL Images...');
  console.log('========================================');

  const srcDir = path.resolve('../car 3-2006 Acura tl');
  const destDir = path.resolve('public/images/inventory/acura-tl-2006');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const rawFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
  
  // Hero shot is 1.50.46 AM (2)
  const heroFile = rawFiles.find(f => f.includes('1.50.46 AM (2)')) || rawFiles[0];
  fs.copyFileSync(path.join(srcDir, heroFile), path.join(destDir, 'featured.jpeg'));

  const cleanFileNames = ['featured.jpeg'];
  let idx = 1;

  for (const raw of rawFiles) {
    const cleanName = `acura-${String(idx).padStart(2, '0')}.jpeg`;
    fs.copyFileSync(path.join(srcDir, raw), path.join(destDir, cleanName));
    cleanFileNames.push(cleanName);
    idx++;
  }

  // Upload to Supabase Storage
  console.log('Uploading clean Acura images to Supabase Storage...');
  const uploadedUrls = [];

  for (const cleanName of cleanFileNames) {
    const filePath = path.join(destDir, cleanName);
    const buffer = fs.readFileSync(filePath);
    const storagePath = `acura-tl-2006/${cleanName}`;

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
      
      const ok = await testUrl(data.publicUrl);
      console.log(`[${ok ? '200 OK' : 'FAILED'}] ${cleanName} -> ${data.publicUrl}`);
      uploadedUrls.push(data.publicUrl);
    }
  }

  // Update Supabase DB
  const { data: vRecord } = await supabase
    .from('vehicles')
    .select('id')
    .eq('slug', '2006-acura-tl')
    .single();

  if (vRecord) {
    const { error: updErr } = await supabase
      .from('vehicles')
      .update({ images: uploadedUrls })
      .eq('id', vRecord.id);

    if (updErr) console.error('DB Update error:', updErr);
    else console.log('✓ Successfully updated Acura TL image URLs in Supabase DB!');
  }
}

// 3. Clean and Stage 2012 Hyundai Santa Fe
async function fixSantaFe() {
  console.log('\n========================================');
  console.log('Fixing 2012 Hyundai Santa Fe Images...');
  console.log('========================================');

  const srcDir = path.resolve('../car 2-2012 Santa fe Price 5900');
  const destDir = path.resolve('public/images/inventory/santa-fe-2012');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  if (fs.existsSync(srcDir)) {
    const rawFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
    const heroFile = rawFiles[0];
    fs.copyFileSync(path.join(srcDir, heroFile), path.join(destDir, 'featured.jpeg'));

    const cleanFileNames = ['featured.jpeg'];
    let idx = 1;

    for (const raw of rawFiles) {
      const cleanName = `santafe-${String(idx).padStart(2, '0')}.jpeg`;
      fs.copyFileSync(path.join(srcDir, raw), path.join(destDir, cleanName));
      cleanFileNames.push(cleanName);
      idx++;
    }

    console.log('Uploading clean Santa Fe images to Supabase Storage...');
    const uploadedUrls = [];

    for (const cleanName of cleanFileNames) {
      const filePath = path.join(destDir, cleanName);
      const buffer = fs.readFileSync(filePath);
      const storagePath = `santa-fe-2012/${cleanName}`;

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
        
        const ok = await testUrl(data.publicUrl);
        console.log(`[${ok ? '200 OK' : 'FAILED'}] ${cleanName} -> ${data.publicUrl}`);
        uploadedUrls.push(data.publicUrl);
      }
    }

    const { data: vRecord } = await supabase
      .from('vehicles')
      .select('id')
      .eq('slug', '2012-hyundai-santa-fe')
      .single();

    if (vRecord) {
      const { error: updErr } = await supabase
        .from('vehicles')
        .update({ images: uploadedUrls })
        .eq('id', vRecord.id);

      if (updErr) console.error('DB Update error:', updErr);
      else console.log('✓ Successfully updated Santa Fe image URLs in Supabase DB!');
    }
  }
}

// 4. Clean and Stage 2010 Toyota Corolla
async function fixCorolla() {
  console.log('\n========================================');
  console.log('Fixing 2010 Toyota Corolla Images...');
  console.log('========================================');

  const srcDir = path.resolve('../car 1-2010 toyota  corolla  price 4900');
  const destDir = path.resolve('public/images/inventory/corolla-2010');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  if (fs.existsSync(srcDir)) {
    const rawFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));
    const heroFile = rawFiles[0];
    fs.copyFileSync(path.join(srcDir, heroFile), path.join(destDir, 'featured.jpeg'));

    const cleanFileNames = ['featured.jpeg'];
    let idx = 1;

    for (const raw of rawFiles) {
      const cleanName = `corolla-${String(idx).padStart(2, '0')}.jpeg`;
      fs.copyFileSync(path.join(srcDir, raw), path.join(destDir, cleanName));
      cleanFileNames.push(cleanName);
      idx++;
    }

    console.log('Uploading clean Corolla images to Supabase Storage...');
    const uploadedUrls = [];

    for (const cleanName of cleanFileNames) {
      const filePath = path.join(destDir, cleanName);
      const buffer = fs.readFileSync(filePath);
      const storagePath = `corolla-2010/${cleanName}`;

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
        
        const ok = await testUrl(data.publicUrl);
        console.log(`[${ok ? '200 OK' : 'FAILED'}] ${cleanName} -> ${data.publicUrl}`);
        uploadedUrls.push(data.publicUrl);
      }
    }

    const { data: vRecord } = await supabase
      .from('vehicles')
      .select('id')
      .eq('slug', '2010-toyota-corolla')
      .single();

    if (vRecord) {
      const { error: updErr } = await supabase
        .from('vehicles')
        .update({ images: uploadedUrls })
        .eq('id', vRecord.id);

      if (updErr) console.error('DB Update error:', updErr);
      else console.log('✓ Successfully updated Corolla image URLs in Supabase DB!');
    }
  }
}

async function run() {
  await fixEscape();
  await fixAcura();
  await fixSantaFe();
  await fixCorolla();
  console.log('\n========================================');
  console.log('ALL VEHICLE IMAGES CLEANED & SYNCHRONIZED!');
  console.log('========================================\n');
}

run();
