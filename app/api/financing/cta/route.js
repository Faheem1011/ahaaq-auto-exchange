import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { creditAcceptance } from '@/lib/services/financing/creditAcceptanceProvider';
import { localVehicles } from '@/lib/localVehicles';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      vehicleId,
      sourcePage = '/finance',
      source = 'website',
      language = 'en',
      customerName,
      customerEmail,
      customerPhone,
      utmSource,
      utmMedium,
      utmCampaign
    } = body;

    const preferredLanguage = language === 'es' ? 'es' : 'en';
    const redirectUrl = await creditAcceptance.getApplicationUrl({
      language: preferredLanguage,
      vehicleId
    });

    let vehicleContext = {
      vehicle_id: vehicleId || null,
      vehicle_vin: null,
      vehicle_title: null,
      vehicle_price: null
    };

    // 1. Resolve vehicle details securely server-side if vehicleId is provided
    if (vehicleId) {
      const supabase = await createClient();
      const cleanId = String(vehicleId).trim();
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);

      let query = supabase.from('vehicles').select('*');
      if (isUuid) {
        query = query.or(`id.eq.${cleanId},slug.eq.${cleanId}`);
      } else {
        query = query.or(`slug.eq.${cleanId},slug.ilike.${cleanId}`);
      }

      const { data: vList } = await query.limit(1);
      const v = vList?.[0];

      if (v) {
        vehicleContext = {
          vehicle_id: v.id,
          vehicle_vin: v.vin || 'Contact Dealer',
          vehicle_title: `${v.year} ${v.make} ${v.model}`,
          vehicle_price: v.price || null
        };
      } else {
        // Check localVehicles fallback
        const local = localVehicles.find(item => item.id === cleanId || item.slug === cleanId);
        if (local) {
          vehicleContext = {
            vehicle_id: local.id,
            vehicle_vin: local.vehicleDetails?.vin || 'Contact Dealer',
            vehicle_title: local.title,
            vehicle_price: local.vehicleDetails?.price ? parseFloat(local.vehicleDetails.price) : null
          };
        }
      }
    }

    // 2. Insert financing lead record into Supabase
    const supabase = await createClient();
    const userAgent = req.headers.get('user-agent') || '';

    const leadPayload = {
      preferred_language: preferredLanguage,
      source: source || 'website',
      source_page: sourcePage || '/finance',
      status: 'new',
      customer_name: customerName ? String(customerName).trim().slice(0, 100) : null,
      customer_email: customerEmail ? String(customerEmail).trim().slice(0, 150) : null,
      customer_phone: customerPhone ? String(customerPhone).trim().slice(0, 30) : null,
      vehicle_id: vehicleContext.vehicle_id,
      vehicle_vin: vehicleContext.vehicle_vin,
      vehicle_title: vehicleContext.vehicle_title,
      vehicle_price: vehicleContext.vehicle_price,
      utm_source: utmSource ? String(utmSource).slice(0, 50) : null,
      utm_medium: utmMedium ? String(utmMedium).slice(0, 50) : null,
      utm_campaign: utmCampaign ? String(utmCampaign).slice(0, 50) : null,
      user_agent: userAgent.slice(0, 255)
    };

    const { data: leadData, error: leadError } = await supabase
      .from('financing_leads')
      .insert([leadPayload])
      .select('id')
      .single();

    if (leadError) {
      console.warn('Financing lead record warning:', leadError.message);
    }

    return NextResponse.json({
      success: true,
      redirectUrl,
      leadId: leadData?.id || null,
      provider: 'Credit Acceptance'
    });
  } catch (error) {
    console.error('Error handling financing CTA:', error);
    // Even if tracking DB fails, still supply the valid Credit Acceptance URL so the customer is never blocked
    const fallbackUrl = await creditAcceptance.getApplicationUrl({ language: 'en' });
    return NextResponse.json({
      success: true,
      redirectUrl: fallbackUrl,
      leadId: null,
      provider: 'Credit Acceptance'
    });
  }
}
