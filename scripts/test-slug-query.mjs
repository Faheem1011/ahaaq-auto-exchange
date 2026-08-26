import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { localVehicles } from '../lib/localVehicles.js';

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

async function getVehicleBySlug(slug) {
  if (!slug) return null;
  const rawSlug = decodeURIComponent(slug).trim();
  const normalizedSlug = rawSlug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rawSlug);

  try {
    let query = supabase.from('vehicles').select('*');
    
    if (isUuid) {
      query = query.or(`id.eq.${rawSlug},slug.eq.${rawSlug}`);
    } else {
      query = query.or(`slug.eq.${normalizedSlug},slug.eq.${rawSlug},slug.ilike.${normalizedSlug}`);
    }

    const { data: vList, error } = await query.limit(1);

    if (error) {
      console.warn('Supabase slug query error:', error.message);
    }

    let v = vList?.[0];

    // Fallback: check all supabase vehicles if specific query missed
    if (!v) {
      const { data: allV } = await supabase.from('vehicles').select('*');
      if (allV && allV.length > 0) {
        v = allV.find(item => {
          const itemSlug = (item.slug || '').toLowerCase().replace(/\s+/g, '-');
          return (
            item.id === rawSlug ||
            item.slug === rawSlug ||
            itemSlug === normalizedSlug ||
            itemSlug.includes(normalizedSlug) ||
            normalizedSlug.includes(itemSlug)
          );
        });
      }
    }

    if (v) {
      return {
        id: v.id,
        title: `${v.year} ${v.make} ${v.model}`,
        slug: v.slug || v.id,
        status: v.status || 'available',
        price: v.price
      };
    }
  } catch (err) {
    console.error('Error in getVehicleBySlug Supabase query:', err);
  }

  // 2. Fallback to localVehicles
  const local = localVehicles.find(item => {
    const itemSlug = (item.slug || '').toLowerCase().replace(/\s+/g, '-');
    return (
      item.id === rawSlug ||
      item.slug === rawSlug ||
      itemSlug === normalizedSlug ||
      itemSlug.includes(normalizedSlug) ||
      normalizedSlug.includes(itemSlug)
    );
  });

  if (local) {
    return {
      id: local.id,
      title: local.title,
      slug: local.slug,
      status: local.status,
      price: local.vehicleDetails?.price
    };
  }

  return null;
}

async function testAll() {
  const slugsToTest = [
    '2012-ford-escape-xlt',
    '2012-ford-escape',
    '2012 ford escape',
    '2012 ford escape xlt',
    'fb3043f7-6609-429f-a382-5c231b6e7a58',
    '2012-hyundai-santa-fe',
    '2012-hyundai-santa%20fe',
    '2012-hyundai-santa fe',
    '2012 hyundai santa fe',
    '2012 hyundai santa%20fe',
    '2006-acura-tl',
    '2006 acura tl',
    '2010-toyota-corolla',
    'b3e523a4-28bd-4330-8520-d711e78a6cef', // Santa Fe UUID
    'invalid-slug-123'
  ];

  for (const s of slugsToTest) {
    const res = await getVehicleBySlug(s);
    console.log(`Lookup "${s}" =>`, res ? `FOUND: ${res.title} ($${res.price}) [slug: ${res.slug}]` : 'NOT FOUND');
  }
}

testAll();
