import { ButtonSignOut } from "@/components/ButtonSignOut"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const Dashboard = async () => {
  const supabase = createServerComponentClient({cookies})
  
  

  return (
    <div>
      <ButtonSignOut text="Sair" />
    </div>
  )
}

export default Dashboard