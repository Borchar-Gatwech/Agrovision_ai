-- Add region and soil_moisture columns to weather_data table
ALTER TABLE public.weather_data 
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS soil_moisture DECIMAL(5, 2);

-- Create soil_conditions table
CREATE TABLE IF NOT EXISTS public.soil_conditions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL,
  nutrient TEXT NOT NULL,
  level INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_insights table
CREATE TABLE IF NOT EXISTS public.ai_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.soil_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies for soil_conditions (public read)
CREATE POLICY "Anyone can view soil conditions"
  ON public.soil_conditions FOR SELECT
  USING (true);

-- RLS Policies for ai_insights (public read)
CREATE POLICY "Anyone can view AI insights"
  ON public.ai_insights FOR SELECT
  USING (true);

-- Insert sample weather data for different regions
INSERT INTO public.weather_data (location, forecast_date, temperature, rainfall, humidity, region, soil_moisture) VALUES
-- Rift Valley
('Nakuru', CURRENT_DATE, 24.5, 10.2, 65.0, 'Rift Valley', 65.0),
('Nakuru', CURRENT_DATE + INTERVAL '1 day', 26.0, 8.0, 58.0, 'Rift Valley', 60.0),
('Nakuru', CURRENT_DATE + INTERVAL '2 days', 22.8, 15.5, 72.0, 'Rift Valley', 70.0),
('Nakuru', CURRENT_DATE + INTERVAL '3 days', 25.0, 12.0, 68.0, 'Rift Valley', 68.0),
('Nakuru', CURRENT_DATE + INTERVAL '4 days', 23.5, 18.0, 75.0, 'Rift Valley', 72.0),
('Nakuru', CURRENT_DATE + INTERVAL '5 days', 27.0, 5.0, 55.0, 'Rift Valley', 58.0),
('Nakuru', CURRENT_DATE + INTERVAL '6 days', 24.0, 20.0, 78.0, 'Rift Valley', 75.0),
-- Western
('Kisumu', CURRENT_DATE, 23.0, 12.0, 68.0, 'Western', 70.0),
('Kisumu', CURRENT_DATE + INTERVAL '1 day', 25.0, 10.0, 65.0, 'Western', 68.0),
('Kisumu', CURRENT_DATE + INTERVAL '2 days', 22.0, 15.0, 72.0, 'Western', 73.0),
('Kisumu', CURRENT_DATE + INTERVAL '3 days', 24.0, 14.0, 70.0, 'Western', 71.0),
('Kisumu', CURRENT_DATE + INTERVAL '4 days', 26.0, 8.0, 62.0, 'Western', 65.0),
('Kisumu', CURRENT_DATE + INTERVAL '5 days', 28.0, 6.0, 58.0, 'Western', 62.0),
('Kisumu', CURRENT_DATE + INTERVAL '6 days', 24.0, 16.0, 75.0, 'Western', 74.0),
-- Eastern
('Meru', CURRENT_DATE, 25.0, 8.0, 62.0, 'Eastern', 65.0),
('Meru', CURRENT_DATE + INTERVAL '1 day', 27.0, 5.0, 58.0, 'Eastern', 60.0),
('Meru', CURRENT_DATE + INTERVAL '2 days', 24.0, 12.0, 68.0, 'Eastern', 68.0),
('Meru', CURRENT_DATE + INTERVAL '3 days', 26.0, 10.0, 65.0, 'Eastern', 66.0),
('Meru', CURRENT_DATE + INTERVAL '4 days', 28.0, 6.0, 58.0, 'Eastern', 61.0),
('Meru', CURRENT_DATE + INTERVAL '5 days', 29.0, 4.0, 55.0, 'Eastern', 58.0),
('Meru', CURRENT_DATE + INTERVAL '6 days', 25.0, 11.0, 70.0, 'Eastern', 69.0),
-- Northern
('Garissa', CURRENT_DATE, 30.0, 3.0, 50.0, 'Northern', 55.0),
('Garissa', CURRENT_DATE + INTERVAL '1 day', 32.0, 2.0, 48.0, 'Northern', 52.0),
('Garissa', CURRENT_DATE + INTERVAL '2 days', 31.0, 5.0, 52.0, 'Northern', 58.0),
('Garissa', CURRENT_DATE + INTERVAL '3 days', 33.0, 1.0, 45.0, 'Northern', 50.0),
('Garissa', CURRENT_DATE + INTERVAL '4 days', 29.0, 4.0, 55.0, 'Northern', 57.0),
('Garissa', CURRENT_DATE + INTERVAL '5 days', 34.0, 0.0, 42.0, 'Northern', 48.0),
('Garissa', CURRENT_DATE + INTERVAL '6 days', 31.0, 6.0, 58.0, 'Northern', 62.0),
-- Coast
('Mombasa', CURRENT_DATE, 28.5, 5.0, 75.0, 'Coast', 72.0),
('Mombasa', CURRENT_DATE + INTERVAL '1 day', 29.0, 4.0, 73.0, 'Coast', 70.0),
('Mombasa', CURRENT_DATE + INTERVAL '2 days', 27.0, 8.0, 78.0, 'Coast', 75.0),
('Mombasa', CURRENT_DATE + INTERVAL '3 days', 28.0, 6.0, 76.0, 'Coast', 73.0),
('Mombasa', CURRENT_DATE + INTERVAL '4 days', 30.0, 3.0, 72.0, 'Coast', 69.0),
('Mombasa', CURRENT_DATE + INTERVAL '5 days', 31.0, 2.0, 70.0, 'Coast', 67.0),
('Mombasa', CURRENT_DATE + INTERVAL '6 days', 29.0, 7.0, 77.0, 'Coast', 74.0);

-- Insert sample soil conditions data
INSERT INTO public.soil_conditions (region, nutrient, level, status) VALUES
-- Rift Valley
('Rift Valley', 'Nitrogen', 75, 'Good'),
('Rift Valley', 'Phosphorus', 60, 'Moderate'),
('Rift Valley', 'Potassium', 85, 'Excellent'),
('Rift Valley', 'pH Level', 70, 'Good'),
-- Western
('Western', 'Nitrogen', 70, 'Good'),
('Western', 'Phosphorus', 65, 'Moderate'),
('Western', 'Potassium', 80, 'Excellent'),
('Western', 'pH Level', 68, 'Good'),
-- Eastern
('Eastern', 'Nitrogen', 68, 'Good'),
('Eastern', 'Phosphorus', 55, 'Moderate'),
('Eastern', 'Potassium', 78, 'Good'),
('Eastern', 'pH Level', 65, 'Moderate'),
-- Northern
('Northern', 'Nitrogen', 58, 'Moderate'),
('Northern', 'Phosphorus', 48, 'Low'),
('Northern', 'Potassium', 62, 'Moderate'),
('Northern', 'pH Level', 55, 'Moderate'),
-- Coast
('Coast', 'Nitrogen', 72, 'Good'),
('Coast', 'Phosphorus', 62, 'Moderate'),
('Coast', 'Potassium', 82, 'Excellent'),
('Coast', 'pH Level', 72, 'Good');

-- Insert sample AI insights data
INSERT INTO public.ai_insights (region, title, description, type) VALUES
-- Rift Valley
('Rift Valley', 'Heavy Rain Expected', 'Significant rainfall predicted on Wednesday. Consider postponing irrigation.', 'warning'),
('Rift Valley', 'Optimal Planting Window', 'Next 5 days show ideal conditions for planting maize.', 'success'),
('Rift Valley', 'Soil Moisture Alert', 'Saturday shows low moisture levels. Plan irrigation accordingly.', 'info'),
-- Western
('Western', 'Consistent Rainfall', 'Good rainfall distribution expected this week. Maintain current irrigation schedule.', 'success'),
('Western', 'Temperature Stable', 'Moderate temperatures forecasted. Good conditions for crop growth.', 'success'),
('Western', 'High Humidity Warning', 'High humidity levels may increase disease risk. Monitor crops closely.', 'warning'),
-- Eastern
('Eastern', 'Dry Conditions Ahead', 'Low rainfall expected. Plan irrigation schedule early.', 'warning'),
('Eastern', 'Temperature Spike', 'Higher temperatures predicted mid-week. Ensure adequate water supply.', 'warning'),
('Eastern', 'Optimal Planting Time', 'Conditions are favorable for planting drought-resistant crops.', 'success'),
-- Northern
('Northern', 'Drought Conditions', 'Very low rainfall expected. Consider water conservation measures.', 'warning'),
('Northern', 'High Temperature Alert', 'Extreme temperatures forecasted. Provide shade for sensitive crops.', 'warning'),
('Northern', 'Irrigation Required', 'Immediate irrigation needed due to low soil moisture.', 'warning'),
-- Coast
('Coast', 'Stable Weather', 'Consistent weather conditions expected. Good for ongoing farm operations.', 'success'),
('Coast', 'High Humidity', 'Elevated humidity levels may require increased ventilation in greenhouses.', 'info'),
('Coast', 'Moderate Rainfall', 'Expected rainfall is suitable for most crops without additional irrigation.', 'success');

