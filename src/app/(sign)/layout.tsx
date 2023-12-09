import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const FormLayout = async ({children}: {children: React.ReactNode}) => {
  const supabase = createServerComponentClient({cookies})
  const {data: {session}} = await supabase.auth.getSession()

  if(session) {
    redirect('/dashboard')
  } else {
    return (
      <div className="flex w-screen h-screen">
        <div className="p-4 m-auto border-2 border-black rounded-lg">
          {children}
        </div>
      </div>
    )
  }
}

export const dynamic = "force-dynamic"
export default FormLayout