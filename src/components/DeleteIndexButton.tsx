"use client"

import { ButtonHTMLAttributes } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Database } from "@/types"

import { FaTrashAlt } from "react-icons/fa"

interface DeleteIndexButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  id: string
  indexes: string[]
}

export const DeleteIndexButton = ({name, id, indexes, ...props}: DeleteIndexButtonProps) => {
  const supabase = createClientComponentClient<Database>()
  const { refresh } = useRouter()

  
  const deleteIndex = async () => {
    const newIndexes = indexes.filter(index => index != name)

    await supabase.from("user").upsert({ id, indexes: newIndexes })
    refresh()
  }

  return (
    <button {...props} onClick={deleteIndex}>
      <FaTrashAlt size={15}/>
    </button>
  )
}