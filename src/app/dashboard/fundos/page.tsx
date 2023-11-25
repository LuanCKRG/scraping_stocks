import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const Page = () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: {publicUrl: fundsUrl} } = supabase.storage.from("funds").getPublicUrl("public/funds_explorer.xlsx")
  const { data: {publicUrl: fundamentusUrl} } = supabase.storage.from("funds").getPublicUrl("public/fundamentus.xlsx")
 
  return (
    <div className="flex flex-col">
      <a className="underline" href={fundsUrl}>
        Download planilha fundsexplorer
      </a>
      <a className="underline mt-2" href={fundamentusUrl}>
        Download planilha fundamentus
      </a>
    </div>
  )
}

export default Page