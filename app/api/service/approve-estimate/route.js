import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { trackingCode, action, customerNotes } = body;

    if (!trackingCode || !action) {
      return NextResponse.json(
        { success: false, error: 'Tracking code and approval action are required.' },
        { status: 400 }
      );
    }

    const isApproved = action === 'approve';
    const supabase = await createClient();

    // Verify work order exists
    const { data: wo, error: findError } = await supabase
      .from('work_orders')
      .select('id, tracking_code, status, total_amount')
      .ilike('tracking_code', trackingCode)
      .single();

    if (findError || !wo) {
      return NextResponse.json(
        { success: false, error: 'Work order not found.' },
        { status: 404 }
      );
    }

    const newApprovalStatus = isApproved ? 'approved' : 'declined';
    const newWorkOrderStatus = isApproved ? 'approved' : 'customer_approval_pending';
    const newProgress = isApproved ? 40 : 25;

    const { error: updateError } = await supabase
      .from('work_orders')
      .update({
        customer_approval_status: newApprovalStatus,
        customer_approved_at: new Date().toISOString(),
        status: newWorkOrderStatus,
        progress_percentage: newProgress,
        public_status_notes: isApproved 
          ? 'Estimate approved by customer. Technician is preparing parts and starting repair.' 
          : 'Customer requested contact regarding estimate. Service advisor will call shortly.',
        updated_at: new Date().toISOString()
      })
      .eq('id', wo.id);

    if (updateError) {
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      approvalStatus: newApprovalStatus,
      message: isApproved
        ? 'Thank you! Your repair estimate has been approved. Our team is proceeding with the authorized work.'
        : 'Your response has been noted. A service advisor will contact you to discuss your options.'
    });
  } catch (err) {
    console.error('API approve estimate error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
