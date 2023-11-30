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
      type: "stock" | "fii" | "etf"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
