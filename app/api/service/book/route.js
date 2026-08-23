import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      serviceType = 'auto_repair',
      serviceSubType,
      customerName,
      customerPhone,
      customerEmail,
      preferredContact = 'phone',
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleVin,
      vehicleMileage,
      symptoms,
      preferredDate,
      preferredTime = 'morning'
    } = body;

    if (!customerName || !customerPhone || !preferredDate) {
      return NextResponse.json(
        { success: false, error: 'Customer name, phone number, and preferred date are required.' },
        { status: 400 }
      );
    }

    // Generate unique human-readable booking number: AHAQ-BK-XXXXX
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const bookingNumber = `AHAQ-BK-${randomSuffix}`;

    const supabase = await createClient();
    const { data: inserted, error } = await supabase
      .from('service_bookings')
      .insert([
        {
          booking_number: bookingNumber,
          service_type: serviceType,
          service_sub_type: serviceSubType || null,
          customer_name: String(customerName).trim().slice(0, 100),
          customer_phone: String(customerPhone).trim().slice(0, 30),
          customer_email: customerEmail ? String(customerEmail).trim().slice(0, 150) : null,
          preferred_contact: preferredContact,
          vehicle_year: vehicleYear ? parseInt(vehicleYear) : null,
          vehicle_make: vehicleMake ? String(vehicleMake).trim().slice(0, 50) : null,
          vehicle_model: vehicleModel ? String(vehicleModel).trim().slice(0, 50) : null,
          vehicle_vin: vehicleVin ? String(vehicleVin).trim().toUpperCase().slice(0, 20) : null,
          vehicle_mileage: vehicleMileage ? parseInt(vehicleMileage) : null,
          symptoms: symptoms ? String(symptoms).trim().slice(0, 1000) : null,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          status: 'pending'
        }
      ])
      .select('id, booking_number, preferred_date, preferred_time')
      .single();

    if (error) {
      console.error('Service booking insertion error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      bookingNumber: inserted.booking_number,
      message: 'Service appointment successfully requested! Our service concierge will contact you shortly to confirm your slot.'
    });
  } catch (err) {
    console.error('API service book error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
