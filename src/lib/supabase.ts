import { supabase } from "@/integrations/supabase/client";

export { supabase };

// Helper functions for database operations
export const weatherAPI = {
  async getForecast(location: string) {
    const { data, error } = await supabase
      .from('weather_data')
      .select('*')
      .eq('location', location)
      .order('forecast_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },
};

export const cropsAPI = {
  async getRecommendations(farmerId: string) {
    const { data, error } = await supabase
      .from('crop_recommendations')
      .select('*')
      .eq('farmer_id', farmerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createRecommendation(recommendation: {
    farmer_id: string;
    soil_type: string;
    rainfall: number;
    temperature: number;
    recommended_crops: string[];
  }) {
    const { data, error } = await supabase
      .from('crop_recommendations')
      .insert([recommendation])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

export const marketplaceAPI = {
  async getListings() {
    const { data, error } = await supabase
      .from('marketplace')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createListing(listing: {
    product: string;
    price: number;
    buyer: string;
    location?: string;
    contact_email?: string;
    contact_phone?: string;
    image_url?: string;
  }) {
    const { data, error } = await supabase
      .from('marketplace')
      .insert([listing])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

export const learningAPI = {
  async getContent(category?: string) {
    let query = supabase
      .from('learning_content')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  },
};

export const farmerAPI = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // No profile found
      throw error;
    }
    return data;
  },

  async createProfile(profile: {
    user_id: string;
    name: string;
    location: string;
    language: string;
  }) {
    const { data, error } = await supabase
      .from('farmers')
      .insert([profile])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: {
    name?: string;
    location?: string;
    language?: string;
  }) {
    const { data, error } = await supabase
      .from('farmers')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
