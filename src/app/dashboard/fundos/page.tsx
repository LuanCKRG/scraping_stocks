import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const Page = () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: {publicUrl} } = supabase.storage.from("funds").getPublicUrl("public/funds_explorer.xlsx")
 
  return (
    <div>
      <a className="underline" href={publicUrl}>
        Download planilha fundsexplorer
      </a>
    </div>
  )
}

export default Page