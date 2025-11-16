import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { soilType, rainfall, temperature, farmerId } = await req.json();

    console.log('Received recommendation request:', { soilType, rainfall, temperature, farmerId });

    // Simple AI logic for crop recommendations
    let crops: string[] = [];
    
    if (soilType.toLowerCase().includes('loam')) {
      if (temperature > 25 && rainfall > 50) {
        crops = ['Maize', 'Beans', 'Sorghum', 'Cotton'];
      } else if (temperature > 20 && rainfall > 30) {
        crops = ['Maize', 'Beans', 'Millet', 'Groundnuts'];
      } else {
        crops = ['Wheat', 'Barley', 'Chickpeas'];
      }
    } else if (soilType.toLowerCase().includes('clay')) {
      if (rainfall > 60) {
        crops = ['Rice', 'Sugarcane', 'Soybeans'];
      } else {
        crops = ['Cotton', 'Sunflower', 'Maize'];
      }
    } else if (soilType.toLowerCase().includes('sand')) {
      crops = ['Cassava', 'Sweet Potatoes', 'Groundnuts', 'Millet'];
    } else {
      crops = ['Maize', 'Beans', 'Vegetables'];
    }

    // Store recommendation in database
    const { data, error } = await supabase
      .from('crop_recommendations')
      .insert([{
        farmer_id: farmerId,
        soil_type: soilType,
        rainfall,
        temperature,
        recommended_crops: crops,
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Recommendation saved:', data);

    return new Response(
      JSON.stringify({
        success: true,
        recommendations: crops,
        data,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in crop-recommend function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
