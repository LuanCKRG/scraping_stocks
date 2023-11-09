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
      stocks: {
        Row: {
          created_at: string
          date: string
          href: string
          id: number
          recomendation: string
          src: string
          target_price: string
          ticker: string
        }
        Insert: {
          created_at?: string
          date?: string
          href?: string
          id?: number
          recomendation?: string
          src?: string
          target_price?: string
          ticker?: string
        }
        Update: {
          created_at?: string
          date?: string
          href?: string
          id?: number
          recomendation?: string
          src?: string
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
          favorite_stocks: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          favorite_stocks?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          favorite_stocks?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
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
      org: "Inter Invest" | "XP" | "BTG Pactual" | "Banco Safra"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
