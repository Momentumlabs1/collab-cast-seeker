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
      canva_designs: {
        Row: {
          canva_url: string | null
          created_at: string
          design_number: number
          export_status: string
          export_zip_url: string | null
          id: string
          max_slides: number
          project_id: string
          slide_count: number
          updated_at: string
        }
        Insert: {
          canva_url?: string | null
          created_at?: string
          design_number: number
          export_status?: string
          export_zip_url?: string | null
          id?: string
          max_slides?: number
          project_id: string
          slide_count?: number
          updated_at?: string
        }
        Update: {
          canva_url?: string | null
          created_at?: string
          design_number?: number
          export_status?: string
          export_zip_url?: string | null
          id?: string
          max_slides?: number
          project_id?: string
          slide_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "canva_designs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      export_settings: {
        Row: {
          created_at: string
          element_type: string | null
          export_as_separate_page: boolean
          id: string
          notes: string | null
          page_name: string | null
          scene_id: string
        }
        Insert: {
          created_at?: string
          element_type?: string | null
          export_as_separate_page?: boolean
          id?: string
          notes?: string | null
          page_name?: string | null
          scene_id: string
        }
        Update: {
          created_at?: string
          element_type?: string | null
          export_as_separate_page?: boolean
          id?: string
          notes?: string | null
          page_name?: string | null
          scene_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "export_settings_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes"
            referencedColumns: ["id"]
          },
        ]
      }
      frame_plans: {
        Row: {
          created_at: string
          end_frame_description: string | null
          end_frame_image_url: string | null
          id: string
          scene_id: string
          start_frame_description: string | null
          start_frame_image_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_frame_description?: string | null
          end_frame_image_url?: string | null
          id?: string
          scene_id: string
          start_frame_description?: string | null
          start_frame_image_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_frame_description?: string | null
          end_frame_image_url?: string | null
          id?: string
          scene_id?: string
          start_frame_description?: string | null
          start_frame_image_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "frame_plans_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes"
            referencedColumns: ["id"]
          },
        ]
      }
      frame_steps: {
        Row: {
          created_at: string
          description: string
          estimated_slides: number | null
          frame_plan_id: string
          id: string
          step_number: number
        }
        Insert: {
          created_at?: string
          description: string
          estimated_slides?: number | null
          frame_plan_id: string
          id?: string
          step_number: number
        }
        Update: {
          created_at?: string
          description?: string
          estimated_slides?: number | null
          frame_plan_id?: string
          id?: string
          step_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "frame_steps_frame_plan_id_fkey"
            columns: ["frame_plan_id"]
            isOneToOne: false
            referencedRelation: "frame_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          status: Database["public"]["Enums"]["project_status"]
          team_member_id: string
          title: string
          total_slides: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          status?: Database["public"]["Enums"]["project_status"]
          team_member_id: string
          title: string
          total_slides?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          status?: Database["public"]["Enums"]["project_status"]
          team_member_id?: string
          title?: string
          total_slides?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_team_member_id_fkey"
            columns: ["team_member_id"]
            isOneToOne: false
            referencedRelation: "team_members"
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
      scenes: {
        Row: {
          canva_design_id: string | null
          created_at: string
          duration_seconds: number | null
          end_frame: number | null
          id: string
          order_index: number
          positioning: Database["public"]["Enums"]["positioning_type"]
          project_id: string
          script_text: string | null
          start_frame: number | null
          title: string
          updated_at: string
        }
        Insert: {
          canva_design_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          end_frame?: number | null
          id?: string
          order_index: number
          positioning?: Database["public"]["Enums"]["positioning_type"]
          project_id: string
          script_text?: string | null
          start_frame?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          canva_design_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          end_frame?: number | null
          id?: string
          order_index?: number
          positioning?: Database["public"]["Enums"]["positioning_type"]
          project_id?: string
          script_text?: string | null
          start_frame?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scenes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      script_words: {
        Row: {
          animation_notes: string | null
          animation_type: string | null
          created_at: string
          end_slide: number | null
          has_animation: boolean
          id: string
          order_index: number
          scene_id: string
          start_slide: number | null
          word_text: string
        }
        Insert: {
          animation_notes?: string | null
          animation_type?: string | null
          created_at?: string
          end_slide?: number | null
          has_animation?: boolean
          id?: string
          order_index: number
          scene_id: string
          start_slide?: number | null
          word_text: string
        }
        Update: {
          animation_notes?: string | null
          animation_type?: string | null
          created_at?: string
          end_slide?: number | null
          has_animation?: boolean
          id?: string
          order_index?: number
          scene_id?: string
          start_slide?: number | null
          word_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "script_words_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes"
            referencedColumns: ["id"]
          },
        ]
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
      workflow_assets: {
        Row: {
          created_at: string
          file_path: string | null
          file_url: string | null
          id: string
          is_animated: boolean
          metadata: Json | null
          name: string
          project_id: string
          scene_id: string | null
          type: string
        }
        Insert: {
          created_at?: string
          file_path?: string | null
          file_url?: string | null
          id?: string
          is_animated?: boolean
          metadata?: Json | null
          name: string
          project_id: string
          scene_id?: string | null
          type: string
        }
        Update: {
          created_at?: string
          file_path?: string | null
          file_url?: string | null
          id?: string
          is_animated?: boolean
          metadata?: Json | null
          name?: string
          project_id?: string
          scene_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_assets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_assets_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes"
            referencedColumns: ["id"]
          },
        ]
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
