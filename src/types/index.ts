export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exchanges: {
        Row: {
          created_at: string
          date: string | null
          href: string | null
          id: number
          src: string
          table: Json[]
          title: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          href?: string | null
          id?: number
          src: string
          table: Json[]
          title?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          href?: string | null
          id?: number
          src?: string
          table?: Json[]
          title?: string | null
        }
        Relationships: []
      }
      indexes: {
        Row: {
          created_at: string
          id: number
          name: string
          profitability: string
          sharpe_index: string
          type: Database["public"]["Enums"]["type"]
          volatility: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          profitability: string
          sharpe_index: string
          type: Database["public"]["Enums"]["type"]
          volatility: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          profitability?: string
          sharpe_index?: string
          type?: Database["public"]["Enums"]["type"]
          volatility?: string
        }
        Relationships: []
      }
      querys: {
        Row: {
          created_at: string
          id: number
          ticker: string
          type_search: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          ticker: string
          type_search?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          ticker?: string
          type_search?: string | null
        }
        Relationships: []
      }
      stocks: {
        Row: {
          created_at: string
          date: string
          href: string
          id: number
          recomendation: string
          src: Database["public"]["Enums"]["org"]
          target_price: string
          ticker: string
        }
        Insert: {
          created_at?: string
          date: string
          href: string
          id?: number
          recomendation: string
          src: Database["public"]["Enums"]["org"]
          target_price: string
          ticker: string
        }
        Update: {
          created_at?: string
          date?: string
          href?: string
          id?: number
          recomendation?: string
          src?: Database["public"]["Enums"]["org"]
          target_price?: string
          ticker?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          indexes: string[]
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          indexes?: string[]
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          indexes?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      org:
        | "Inter Invest"
        | "XP"
        | "BTG Pactual"
        | "Banco Safra"
        | "Tranding View"
      type: "stock" | "fii" | "etf" | "fundo" | "bdr" | "index"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
