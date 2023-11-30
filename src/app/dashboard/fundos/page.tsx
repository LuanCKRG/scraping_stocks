import { Database } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Image from "next/image"
import bcb1 from "@/assets/bcb1.png"
import bcb2 from "@/assets/bcb2.png"

const Page = () => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: {publicUrl: fundsUrl} } = supabase.storage.from("funds").getPublicUrl("public/funds_explorer.xlsx")
  const { data: {publicUrl: fundamentusUrl} } = supabase.storage.from("funds").getPublicUrl("public/fundamentus.xlsx")
  const { data: {publicUrl: bcbUrl} } = supabase.storage.from("funds").getPublicUrl("public/bcb.pdf")
 
  return (
    <div className="flex flex-col">
      <Image src={bcb1} alt={"Banco central dados"} />
      <Image src={bcb2} alt={"Banco central dados"} />
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