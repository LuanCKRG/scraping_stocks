import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Header } from "@/components/Header"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient({cookies})
  const {data: {session}} = await supabase.auth.getSession()

  if(!session) {
    redirect('/login')
  } else {
    return (
      <>
        <Header />
        {children}
      </>
    )
  }
}

export const dynamic = "force-dynamic"
export default DashboardLayout