export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      healthcheck_logs: {
        Row: {
          created_at: string
          healthcheck_id: string
          id: string
          response: Json | null
          status: string
        }
        Insert: {
          created_at?: string
          healthcheck_id: string
          id?: string
          response?: Json | null
          status: string
        }
        Update: {
          created_at?: string
          healthcheck_id?: string
          id?: string
          response?: Json | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthcheck_logs_healthcheck_id_fkey"
            columns: ["healthcheck_id"]
            isOneToOne: false
            referencedRelation: "healthchecks"
            referencedColumns: ["id"]
          },
        ]
      }
      healthchecks: {
        Row: {
          created_at: string
          expected_response: Json | null
          id: string
          interval: number
          name: string
          status: string
          timeout: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          expected_response?: Json | null
          id?: string
          interval: number
          name: string
          status: string
          timeout: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          expected_response?: Json | null
          id?: string
          interval?: number
          name?: string
          status?: string
          timeout?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      organization_healthchecks: {
        Row: {
          created_at: string
          healthcheck_id: string
          id: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          healthcheck_id: string
          id?: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          healthcheck_id?: string
          id?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_healthchecks_healthcheck_id_fkey"
            columns: ["healthcheck_id"]
            isOneToOne: false
            referencedRelation: "healthchecks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_healthchecks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_users: {
        Row: {
          created_at: string
          id: string
          is_admin: boolean
          organization_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_admin?: boolean
          organization_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          color_mode: Database["public"]["Enums"]["color_modes"] | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_admin: boolean
          last_name: string | null
          phone_number: string | null
        }
        Insert: {
          color_mode?: Database["public"]["Enums"]["color_modes"] | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          is_admin?: boolean
          last_name?: string | null
          phone_number?: string | null
        }
        Update: {
          color_mode?: Database["public"]["Enums"]["color_modes"] | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_admin?: boolean
          last_name?: string | null
          phone_number?: string | null
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
      color_modes: "system" | "light" | "dark"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

