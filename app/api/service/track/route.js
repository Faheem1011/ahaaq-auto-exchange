import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code')?.trim();
    const phone = searchParams.get('phone')?.trim()?.replace(/[^0-9]/g, '');

    if (!code && !phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide a tracking number, work order code, or phone number.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    let query = supabase.from('work_orders').select('*');

    if (code) {
      const cleanCode = code.toUpperCase();
      query = query.or(`tracking_code.ilike.%${cleanCode}%,work_order_number.ilike.%${cleanCode}%`);
    } else if (phone) {
      query = query.ilike('customer_phone', `%${phone.slice(-10)}%`);
    }

    const { data: workOrders, error } = await query.order('created_at', { ascending: false }).limit(5);

    if (error) {
      console.error('Track work order error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!workOrders || workOrders.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No active work order found matching your inquiry. Please verify the tracking code or call our service desk at (904) 502-9709.'
      }, { status: 404 });
    }

    // Sanitize response to omit sensitive internal notes
    const sanitized = workOrders.map(wo => ({
      id: wo.id,
      workOrderNumber: wo.work_order_number,
      trackingCode: wo.tracking_code,
      customerName: wo.customer_name,
      vehicleTitle: wo.vehicle_title,
      vehicleVin: wo.vehicle_vin ? wo.vehicle_vin.slice(-8) : null,
      department: wo.department,
      primaryConcern: wo.primary_concern,
      status: wo.status,
      progressPercentage: wo.progress_percentage || 15,
      technicianName: wo.technician_name || 'Assigned Certified Tech',
      bayNumber: wo.bay_number || 'Service Bay',
      laborItems: wo.labor_items || [],
      partsItems: wo.parts_items || [],
      subtotalAmount: wo.subtotal_amount || 0,
      taxAmount: wo.tax_amount || 0,
      totalAmount: wo.total_amount || 0,
      customerApprovalStatus: wo.customer_approval_status || 'pending',
      estimatedCompletion: wo.estimated_completion,
      publicStatusNotes: wo.public_status_notes,
      createdAt: wo.created_at,
      updatedAt: wo.updated_at
    }));

    return NextResponse.json({
      success: true,
      workOrders: sanitized
    });
  } catch (err) {
    console.error('API service track error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
