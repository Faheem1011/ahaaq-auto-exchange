import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      customerName,
      customerPhone,
      customerEmail,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleVin,
      damageDescription,
      accidentDate,
      isDrivable = true,
      insuranceInvolved = false,
      insuranceCompany,
      claimNumber,
      photoUrls = [],
      preferredAppointmentDate,
      customerNotes
    } = body;

    if (!customerName || !customerPhone || !damageDescription) {
      return NextResponse.json(
        { success: false, error: 'Customer name, phone number, and damage description are required.' },
        { status: 400 }
      );
    }

    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const estimateNumber = `AHAQ-EST-${randomSuffix}`;

    const supabase = await createClient();
    const { data: inserted, error } = await supabase
      .from('body_shop_estimates')
      .insert([
        {
          estimate_number: estimateNumber,
          customer_name: String(customerName).trim().slice(0, 100),
          customer_phone: String(customerPhone).trim().slice(0, 30),
          customer_email: customerEmail ? String(customerEmail).trim().slice(0, 150) : null,
          vehicle_year: vehicleYear ? parseInt(vehicleYear) : null,
          vehicle_make: vehicleMake ? String(vehicleMake).trim().slice(0, 50) : null,
          vehicle_model: vehicleModel ? String(vehicleModel).trim().slice(0, 50) : null,
          vehicle_vin: vehicleVin ? String(vehicleVin).trim().toUpperCase().slice(0, 20) : null,
          damage_description: String(damageDescription).trim().slice(0, 2000),
          accident_date: accidentDate || null,
          is_drivable: Boolean(isDrivable),
          insurance_involved: Boolean(insuranceInvolved),
          insurance_company: insuranceCompany ? String(insuranceCompany).trim().slice(0, 100) : null,
          claim_number: claimNumber ? String(claimNumber).trim().slice(0, 50) : null,
          photo_urls: Array.isArray(photoUrls) ? photoUrls : [],
          preferred_appointment_date: preferredAppointmentDate || null,
          customer_notes: customerNotes ? String(customerNotes).trim().slice(0, 1000) : null,
          status: 'pending_review'
        }
      ])
      .select('id, estimate_number')
      .single();

    if (error) {
      console.error('Body shop estimate insertion error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      estimateNumber: inserted.estimate_number,
      message: 'Body shop damage estimate request received! An estimator will review your photos and details.'
    });
  } catch (err) {
    console.error('API body shop estimate error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
