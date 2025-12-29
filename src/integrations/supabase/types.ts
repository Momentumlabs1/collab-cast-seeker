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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          contact_preference: string
          created_at: string
          experience: string | null
          file_urls: string[] | null
          id: string
          instagram: string | null
          location: string
          name: string
          other_tool: string | null
          portfolio_links: string[] | null
          selected_account: string
          status: string
          tools: string[] | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          contact_preference?: string
          created_at?: string
          experience?: string | null
          file_urls?: string[] | null
          id?: string
          instagram?: string | null
          location: string
          name: string
          other_tool?: string | null
          portfolio_links?: string[] | null
          selected_account: string
          status?: string
          tools?: string[] | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          contact_preference?: string
          created_at?: string
          experience?: string | null
          file_urls?: string[] | null
          id?: string
          instagram?: string | null
          location?: string
          name?: string
          other_tool?: string | null
          portfolio_links?: string[] | null
          selected_account?: string
          status?: string
          tools?: string[] | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      content_sections: {
        Row: {
          content_type: string
          created_at: string | null
          id: string
          order_index: number
          phase_id: string
          title: string
        }
        Insert: {
          content_type: string
          created_at?: string | null
          id?: string
          order_index: number
          phase_id: string
          title: string
        }
        Update: {
          content_type?: string
          created_at?: string | null
          id?: string
          order_index?: number
          phase_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_sections_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "workflow_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      downloadable_resources: {
        Row: {
          created_at: string | null
          description: string | null
          file_size_mb: number | null
          file_type: string | null
          file_url: string
          id: string
          section_id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_size_mb?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          section_id: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_size_mb?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          section_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "downloadable_resources_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "content_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      image_content: {
        Row: {
          caption: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          section_id: string
          title: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          section_id: string
          title?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          section_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "content_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          referred_contact: string
          referred_name: string
          referrer_contact: string
          referrer_name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          referred_contact: string
          referred_name: string
          referrer_contact: string
          referrer_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          referred_contact?: string
          referred_name?: string
          referrer_contact?: string
          referrer_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      shared_files: {
        Row: {
          created_at: string
          description: string | null
          file_type: string
          id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_type?: string
          id?: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_type?: string
          id?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          access_code: string
          created_at: string
          id: string
          is_active: boolean
          last_login_at: string | null
          name: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          access_code: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          name: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          access_code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      text_content: {
        Row: {
          content: string
          created_at: string | null
          id: string
          section_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          section_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "text_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "content_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          notes: string | null
          phase_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          phase_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          phase_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "workflow_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "team_members"
            referencedColumns: ["id"]
          },
        ]
      }
      video_content: {
        Row: {
          created_at: string | null
          description: string | null
          duration_seconds: number | null
          id: string
          section_id: string
          thumbnail_url: string | null
          title: string
          video_url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          section_id: string
          thumbnail_url?: string | null
          title: string
          video_url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_seconds?: number | null
          id?: string
          section_id?: string
          thumbnail_url?: string | null
          title?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_content_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "content_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_phases: {
        Row: {
          created_at: string | null
          difficulty: string | null
          estimated_time: string | null
          icon: string | null
          id: string
          is_published: boolean | null
          order_index: number
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          difficulty?: string | null
          estimated_time?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          order_index: number
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          difficulty?: string | null
          estimated_time?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          order_index?: number
          subtitle?: string | null
          title?: string
          updated_at?: string | null
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
      approval_status: "pending" | "approved" | "rejected"
      positioning_type: "side_by_side" | "closeup" | "no_characters"
      project_status: "draft" | "in_progress" | "review" | "completed"
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
    Enums: {
      approval_status: ["pending", "approved", "rejected"],
      positioning_type: ["side_by_side", "closeup", "no_characters"],
      project_status: ["draft", "in_progress", "review", "completed"],
    },
  },
} as const
