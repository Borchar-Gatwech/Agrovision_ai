export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      crop_recommendations: {
        Row: {
          created_at: string
          farmer_id: string | null
          id: string
          rainfall: number | null
          recommended_crops: string[]
          soil_type: string
          temperature: number | null
        }
        Insert: {
          created_at?: string
          farmer_id?: string | null
          id?: string
          rainfall?: number | null
          recommended_crops: string[]
          soil_type: string
          temperature?: number | null
        }
        Update: {
          created_at?: string
          farmer_id?: string | null
          id?: string
          rainfall?: number | null
          recommended_crops?: string[]
          soil_type?: string
          temperature?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crop_recommendations_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      farmers: {
        Row: {
          created_at: string
          id: string
          language: string
          location: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          language?: string
          location: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          language?: string
          location?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      learning_content: {
        Row: {
          category: string
          content: string | null
          content_sw: string | null
          created_at: string
          description: string
          description_sw: string | null
          id: string
          image_url: string | null
          title: string
          title_sw: string | null
          video_url: string | null
        }
        Insert: {
          category: string
          content?: string | null
          content_sw?: string | null
          created_at?: string
          description: string
          description_sw?: string | null
          id?: string
          image_url?: string | null
          title: string
          title_sw?: string | null
          video_url?: string | null
        }
        Update: {
          category?: string
          content?: string | null
          content_sw?: string | null
          created_at?: string
          description?: string
          description_sw?: string | null
          id?: string
          image_url?: string | null
          title?: string
          title_sw?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      marketplace: {
        Row: {
          buyer: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          image_url: string | null
          location: string | null
          price: number
          product: string
        }
        Insert: {
          buyer: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          location?: string | null
          price: number
          product: string
        }
        Update: {
          buyer?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          location?: string | null
          price?: number
          product?: string
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          created_at: string
          forecast_date: string
          humidity: number | null
          id: string
          location: string
          rainfall: number | null
          temperature: number | null
          region: string | null
          soil_moisture: number | null
        }
        Insert: {
          created_at?: string
          forecast_date: string
          humidity?: number | null
          id?: string
          location: string
          rainfall?: number | null
          temperature?: number | null
          region?: string | null
          soil_moisture?: number | null
        }
        Update: {
          created_at?: string
          forecast_date?: string
          humidity?: number | null
          id?: string
          location?: string
          rainfall?: number | null
          temperature?: number | null
          region?: string | null
          soil_moisture?: number | null
        }
        Relationships: []
      }
      soil_conditions: {
        Row: {
          id: string
          region: string
          nutrient: string
          level: number
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          region: string
          nutrient: string
          level: number
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          region?: string
          nutrient?: string
          level?: number
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      ai_insights: {
        Row: {
          id: string
          region: string
          title: string
          description: string
          type: string
          created_at: string
        }
        Insert: {
          id?: string
          region: string
          title: string
          description: string
          type: string
          created_at?: string
        }
        Update: {
          id?: string
          region?: string
          title?: string
          description?: string
          type?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
