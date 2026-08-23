import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const language = searchParams.get('language');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    let query = supabase
      .from('financing_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (language && language !== 'all') {
      query = query.eq('preferred_language', language);
    }

    if (search) {
      query = query.or(`customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%,vehicle_title.ilike.%${search}%,vehicle_vin.ilike.%${search}%`);
    }

    const { data: leads, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leads: leads || [] });
  } catch (err) {
    console.error('Error fetching financing leads:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, notes, assignedAdminId, nextFollowUpAt, creditAcceptanceStatus, creditAcceptanceReference } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing lead ID' }, { status: 400 });
    }

    const updatePayload = {
      updated_at: new Date().toISOString()
    };

    if (status !== undefined) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes;
    if (assignedAdminId !== undefined) updatePayload.assigned_admin_id = assignedAdminId;
    if (nextFollowUpAt !== undefined) updatePayload.next_follow_up_at = nextFollowUpAt;
    if (creditAcceptanceStatus !== undefined) updatePayload.credit_acceptance_status = creditAcceptanceStatus;
    if (creditAcceptanceReference !== undefined) updatePayload.credit_acceptance_reference = creditAcceptanceReference;

    const { data, error } = await supabase
      .from('financing_leads')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data });
  } catch (err) {
    console.error('Error updating financing lead:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
