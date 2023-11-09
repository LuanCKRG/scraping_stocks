import { ButtonSignOut } from "@/components/ButtonSignOut"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const Dashboard = async () => {  
  return (
    <div>
      <ButtonSignOut text="Sair" />
    </div>
  )
}

export default Dashboard