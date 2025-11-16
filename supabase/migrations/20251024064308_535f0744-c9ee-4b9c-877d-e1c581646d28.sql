-- Create farmers table
CREATE TABLE public.farmers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create marketplace table
CREATE TABLE public.marketplace (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  buyer TEXT NOT NULL,
  image_url TEXT,
  location TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create crop_recommendations table
CREATE TABLE public.crop_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID REFERENCES public.farmers(id) ON DELETE CASCADE,
  soil_type TEXT NOT NULL,
  rainfall DECIMAL(6, 2),
  temperature DECIMAL(5, 2),
  recommended_crops TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create weather_data table for storing forecasts
CREATE TABLE public.weather_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  forecast_date DATE NOT NULL,
  temperature DECIMAL(5, 2),
  rainfall DECIMAL(6, 2),
  humidity DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning_content table
CREATE TABLE public.learning_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_sw TEXT,
  description TEXT NOT NULL,
  description_sw TEXT,
  category TEXT NOT NULL,
  video_url TEXT,
  image_url TEXT,
  content TEXT,
  content_sw TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for farmers table
CREATE POLICY "Users can view their own farmer profile"
  ON public.farmers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own farmer profile"
  ON public.farmers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own farmer profile"
  ON public.farmers FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for marketplace (public read, authenticated write)
CREATE POLICY "Anyone can view marketplace listings"
  ON public.marketplace FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create marketplace listings"
  ON public.marketplace FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for crop_recommendations
CREATE POLICY "Users can view their own crop recommendations"
  ON public.crop_recommendations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.farmers
      WHERE farmers.id = crop_recommendations.farmer_id
      AND farmers.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create crop recommendations"
  ON public.crop_recommendations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.farmers
      WHERE farmers.id = crop_recommendations.farmer_id
      AND farmers.user_id = auth.uid()
    )
  );

-- RLS Policies for weather_data (public read, admin write)
CREATE POLICY "Anyone can view weather data"
  ON public.weather_data FOR SELECT
  USING (true);

-- RLS Policies for learning_content (public read)
CREATE POLICY "Anyone can view learning content"
  ON public.learning_content FOR SELECT
  USING (true);

-- Insert sample data for marketplace
INSERT INTO public.marketplace (product, price, buyer, image_url, location, contact_email, contact_phone) VALUES
('Maize - Grade A', 3500.00, 'Green Valley Cooperative', NULL, 'Nairobi, Kenya', 'contact@greenvalley.co.ke', '+254 700 123 456'),
('Fresh Vegetables', 1200.00, 'Fresh Harvest Traders', NULL, 'Mombasa, Kenya', 'sales@freshharvest.co.ke', '+254 700 234 567'),
('Organic Beans', 4500.00, 'Agricultural Development Co.', NULL, 'Kisumu, Kenya', 'info@agridev.co.ke', '+254 700 345 678');

-- Insert sample learning content
INSERT INTO public.learning_content (title, title_sw, description, description_sw, category, content, content_sw) VALUES
('Soil Preparation Basics', 'Msingi wa Kuandaa Udongo', 'Learn the fundamentals of preparing your soil for planting', 'Jifunze misingi ya kuandaa udongo wako kwa kupanda', 'Soil Management', 'Proper soil preparation is crucial for successful farming...', 'Maandalizi sahihi ya udongo ni muhimu kwa kilimo chenye mafanikio...'),
('Water Conservation Techniques', 'Mbinu za Uhifadhi wa Maji', 'Discover effective methods to conserve water in your farm', 'Gundua njia madhubuti za kuhifadhi maji kwenye shamba lako', 'Water Management', 'Water is a precious resource in agriculture...', 'Maji ni rasilimali ya thamani katika kilimo...'),
('Pest Control Methods', 'Njia za Kudhibiti Wadudu', 'Safe and effective pest control for your crops', 'Udhibiti salama na ufanisi wa wadudu kwa mazao yako', 'Crop Protection', 'Protecting your crops from pests is essential...', 'Kulinda mazao yako kutoka kwa wadudu ni muhimu...');

-- Insert sample weather data
INSERT INTO public.weather_data (location, forecast_date, temperature, rainfall, humidity) VALUES
('Nairobi', CURRENT_DATE, 24.5, 10.2, 65.0),
('Nairobi', CURRENT_DATE + INTERVAL '1 day', 26.0, 0.0, 58.0),
('Nairobi', CURRENT_DATE + INTERVAL '2 days', 22.8, 15.5, 72.0),
('Mombasa', CURRENT_DATE, 28.5, 5.0, 75.0),
('Kisumu', CURRENT_DATE, 23.0, 12.0, 68.0);