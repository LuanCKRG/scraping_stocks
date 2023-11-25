"use client"

import {z} from "zod"
import { BiSearchAlt } from "react-icons/bi"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import {useRouter, usePathname, useParams} from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const searchStockSchema = z.object({
  search: z.string()
    .toLowerCase()
    .min(5, "O mínimo de caracteres é 5")
    .max(6, "O máximo de caracteres é 6")
})

type searchStockType = z.infer<typeof searchStockSchema>

export const SearchBar = () => {
  const {replace} = useRouter()
  const searchStockForm = useForm<searchStockType>({
    resolver: zodResolver(searchStockSchema)
  })

  const { handleSubmit, register, formState: {errors} } = searchStockForm

  const supabase = createClientComponentClient()

  const handleSearchStock: SubmitHandler<searchStockType> = async ({search}) => {
    await supabase.from("querys").insert({ticker: search})
    replace(`/dashboard/stocks/${search}`)
  }

  return (
    <form onSubmit={handleSubmit(handleSearchStock)} className="flex flex-col justify-center items-center gap-2 m-4">
      <div className="flex justify-center items-center mx-auto px-2 max-w-xs sm:max-w-md border-black border-2 rounded-lg">
        <input {...register("search")} autoComplete="off" placeholder="Digite uma ação. Ex.: PETR4, GGBR4, ALUP11" type="text" className="w-full p-2 rounded-l-lg bg-inherit focus:outline-none" />
        <button type="submit" className="flex justify-center cursor-pointer px-2 items-center rounded-r-lg">
          <BiSearchAlt size={30} />
        </button>
      </div>

      {
        errors.search &&
        <span className="text-left text-red-500 text-xs">
          {errors.search.message}
        </span>
      }
    </form>
  )
}