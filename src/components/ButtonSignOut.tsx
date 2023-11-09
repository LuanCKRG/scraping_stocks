"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export const ButtonSignOut: React.FC<ButtonProps> = ({text, ...props}) => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  
  return (
    <button onClick={signOut} {...props}>
      {text}
    </button>
  )
}