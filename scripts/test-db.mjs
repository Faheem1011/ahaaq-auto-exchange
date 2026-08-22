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

async function check() {
  console.log('Connecting to Supabase at:', envVars.SUPABASE_URL);
  
  const { data: vehicles, error: vErr } = await supabase.from('vehicles').select('*');
  console.log('Vehicles:', vehicles?.length, vErr || '');
  if (vehicles && vehicles.length > 0) console.log(JSON.stringify(vehicles, null, 2));

  const { data: users, error: uErr } = await supabase.auth.admin.listUsers();
  console.log('Users count:', users?.users?.length, uErr || '');
  if (users?.users) {
    console.log('Users:', users.users.map(u => ({ id: u.id, email: u.email, created_at: u.created_at })));
  }

  const { data: contact, error: cErr } = await supabase.from('contact_submissions').select('*');
  console.log('contact_submissions:', contact?.length, cErr ? cErr.message : 'OK');

  const { data: contactMsg, error: cmErr } = await supabase.from('contact_messages').select('*');
  console.log('contact_messages:', contactMsg?.length, cmErr ? cmErr.message : 'OK');

  const { data: finance, error: fErr } = await supabase.from('finance_applications').select('*');
  console.log('finance_applications:', finance?.length, fErr ? fErr.message : 'OK');

  const { data: preQual, error: pqErr } = await supabase.from('pre_qualify_submissions').select('*');
  console.log('pre_qualify_submissions:', preQual?.length, pqErr ? pqErr.message : 'OK');

  const { data: tradeIn, error: tiErr } = await supabase.from('trade_in_submissions').select('*');
  console.log('trade_in_submissions:', tradeIn?.length, tiErr ? tiErr.message : 'OK');

  const { data: socialLogs, error: slErr } = await supabase.from('social_post_logs').select('*');
  console.log('social_post_logs:', socialLogs?.length, slErr ? slErr.message : 'OK');

  const { data: socialTokens, error: stErr } = await supabase.from('social_tokens').select('*');
  console.log('social_tokens:', socialTokens?.length, stErr ? stErr.message : 'OK');

  const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
  console.log('Storage Buckets:', buckets?.map(b => ({ id: b.id, name: b.name, public: b.public })), bErr || '');
}

check();
