# AgroVision AI - Backend Documentation

## 🌾 Overview

AgroVision AI uses **Lovable Cloud** (powered by Supabase) for a complete backend infrastructure including:
- PostgreSQL database for storing farmer profiles, weather data, crop recommendations, marketplace listings, and learning content
- Email/password authentication for user management
- Edge functions for serverless backend logic
- Row Level Security (RLS) for secure data access

## 📊 Database Schema

### Tables

#### 1. `farmers`
Stores farmer profile information linked to authenticated users.
```sql
- id: UUID (Primary Key)
- user_id: UUID (References auth.users)
- name: TEXT
- location: TEXT
- language: TEXT (default: 'en')
- created_at: TIMESTAMP
```

#### 2. `marketplace`
Marketplace listings for buyers, cooperatives, and local markets.
```sql
- id: UUID (Primary Key)
- product: TEXT
- price: DECIMAL(10, 2)
- buyer: TEXT
- image_url: TEXT (optional)
- location: TEXT (optional)
- contact_email: TEXT (optional)
- contact_phone: TEXT (optional)
- created_at: TIMESTAMP
```

#### 3. `crop_recommendations`
AI-generated crop recommendations based on soil and weather conditions.
```sql
- id: UUID (Primary Key)
- farmer_id: UUID (References farmers)
- soil_type: TEXT
- rainfall: DECIMAL(6, 2)
- temperature: DECIMAL(5, 2)
- recommended_crops: TEXT[] (Array)
- created_at: TIMESTAMP
```

#### 4. `weather_data`
Weather forecast data by location.
```sql
- id: UUID (Primary Key)
- location: TEXT
- forecast_date: DATE
- temperature: DECIMAL(5, 2)
- rainfall: DECIMAL(6, 2)
- humidity: DECIMAL(5, 2)
- created_at: TIMESTAMP
```

#### 5. `learning_content`
Educational content for farmers with multilingual support (English/Swahili).
```sql
- id: UUID (Primary Key)
- title: TEXT
- title_sw: TEXT (Swahili)
- description: TEXT
- description_sw: TEXT (Swahili)
- category: TEXT
- video_url: TEXT (optional)
- image_url: TEXT (optional)
- content: TEXT
- content_sw: TEXT (Swahili)
- created_at: TIMESTAMP
```

## 🔒 Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **farmers**: Users can only view/edit their own profiles
- **marketplace**: Public read, authenticated write
- **crop_recommendations**: Users can only view their own recommendations
- **weather_data**: Public read access
- **learning_content**: Public read access

## 🔐 Authentication

Email/password authentication is enabled with auto-confirm for testing purposes.

### Sign Up Flow
1. User registers with email, password, name, and location
2. A farmer profile is automatically created
3. User can immediately sign in

### Protected Routes
Certain features require authentication:
- Creating crop recommendations
- Viewing personal recommendations
- Creating marketplace listings

## 🚀 Edge Functions

### `crop-recommend`
Serverless function that provides AI-powered crop recommendations.

**Endpoint**: `/functions/v1/crop-recommend`

**Request Body**:
```json
{
  "soilType": "loam",
  "rainfall": 45.5,
  "temperature": 24.0,
  "farmerId": "uuid-here"
}
```

**Response**:
```json
{
  "success": true,
  "recommendations": ["Maize", "Beans", "Millet"],
  "data": { /* saved recommendation record */ }
}
```

## 📦 API Integration

The frontend uses helper functions in `src/lib/supabase.ts`:

### Weather API
```typescript
import { weatherAPI } from "@/lib/supabase";

const forecast = await weatherAPI.getForecast("Nairobi");
```

### Crops API
```typescript
import { cropsAPI } from "@/lib/supabase";

const recommendations = await cropsAPI.getRecommendations(farmerId);
await cropsAPI.createRecommendation({
  farmer_id: farmerId,
  soil_type: "loam",
  rainfall: 45.5,
  temperature: 24.0,
  recommended_crops: ["Maize", "Beans"]
});
```

### Marketplace API
```typescript
import { marketplaceAPI } from "@/lib/supabase";

const listings = await marketplaceAPI.getListings();
await marketplaceAPI.createListing({
  product: "Fresh Maize",
  price: 3500,
  buyer: "Local Cooperative",
  location: "Nairobi"
});
```

### Learning API
```typescript
import { learningAPI } from "@/lib/supabase";

const content = await learningAPI.getContent("Soil Management");
```

### Farmer API
```typescript
import { farmerAPI } from "@/lib/supabase";

const profile = await farmerAPI.getProfile(userId);
await farmerAPI.createProfile({
  user_id: userId,
  name: "John Farmer",
  location: "Eldoret",
  language: "en"
});
```

## 🔧 Authentication Hook

```typescript
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, signIn, signUp, signOut, isAuthenticated } = useAuth();
  
  // Use authentication state and methods
}
```

## 🌐 Backend Access

Access your backend dashboard to:
- View and manage database tables
- Check authentication users
- Monitor edge function logs
- View API usage and analytics

<lov-actions>
<lov-open-backend>View Backend Dashboard</lov-open-backend>
</lov-actions>

## 📈 Sample Data

The database is pre-populated with:
- 3 marketplace listings
- 3 learning content items
- 5 weather forecast records

## 🔮 Future Enhancements

- **Advanced AI Models**: Integrate TensorFlow models for more accurate predictions
- **Real-time Weather APIs**: Connect to Google Earth Engine or NASA climate datasets
- **File Storage**: Enable image uploads for marketplace products
- **Notifications**: Push notifications for weather alerts and market updates
- **Analytics**: Track farmer engagement and crop success rates

## 📚 Documentation

For more information about Lovable Cloud features:
- [Cloud Documentation](https://docs.lovable.dev/features/cloud)
- [Database Best Practices](https://docs.lovable.dev/features/cloud/database)
- [Edge Functions Guide](https://docs.lovable.dev/features/cloud/edge-functions)
