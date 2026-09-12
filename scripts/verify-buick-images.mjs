import https from 'https';
import fs from 'fs';
import path from 'path';

const remoteUrls = [
  "https://duzuzlbvjaxbidrblwbh.supabase.co/storage/v1/object/public/vehicle-images/buick-lacrosse-2011/featured.jpeg",
  ...Array.from({ length: 11 }, (_, i) => 
    `https://duzuzlbvjaxbidrblwbh.supabase.co/storage/v1/object/public/vehicle-images/buick-lacrosse-2011/buick-${String(i + 1).padStart(2, '0')}.jpeg`
  )
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let bytes = 0;
      res.on('data', chunk => { bytes += chunk.length; });
      res.on('end', () => {
        resolve({ url, status: res.statusCode, bytes });
      });
    });
    req.on('error', (err) => resolve({ url, status: 'ERROR', error: err.message }));
  });
}

async function run() {
  console.log('Testing all 12 Buick images on Supabase Storage:');
  let allOk = true;
  for (const u of remoteUrls) {
    const r = await checkUrl(u);
    const fname = u.split('/').pop();
    if (r.status === 200 && r.bytes > 10000) {
      console.log(`✓ ${fname.padEnd(16)} HTTP ${r.status} (${(r.bytes / 1024).toFixed(1)} KB)`);
    } else {
      console.error(`✗ ${fname} failed! Status: ${r.status}`);
      allOk = false;
    }
  }

  console.log('\nChecking local fallback images on disk:');
  const localDir = path.resolve('public/images/inventory/buick-lacrosse-2011');
  const files = fs.readdirSync(localDir);
  console.log(`Found ${files.length} local files in ${localDir}`);

  if (allOk) {
    console.log('\n>>> ALL BUICK IMAGES OPEN AND VERIFIED 100% OK! <<<');
  } else {
    console.error('\n>>> SOME IMAGES FAILED! <<<');
    process.exit(1);
  }
}

run();
