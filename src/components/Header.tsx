"use client"

import Link from "next/link"
import { useState } from "react"

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <header className="flex justify-between p-4 border-2 rounded-b-md border-black">
        <button onClick={() => setIsOpen((value) => !value)} className="flex flex-col justify-center items-center md:hidden group">
          <span className={`h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300 ${isOpen ? "rotate-45 translate-y-2 opacity-50 group-hover:opacity-100" : "opacity-50 group-hover:opacity-100" }`} />
          <span className={`h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300 ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"}`} />
          <span className={`h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2 opacity-50 group-hover:opacity-100" : "opacity-50 group-hover:opacity-100" }`} />
        </button>

        <h1 className="text-xl">
          Stocks
        </h1>

        <nav className="hidden md:flex gap-4">
          <Link href="/dashboard/stocks" className="bg-black text-white hover:bg-inherit hover:text-inherit rounded-md py-0.5 px-2 border-2 border-black">
            Ações
          </Link>

          <Link href="/dashboard/sheets" className="bg-black text-white hover:bg-inherit hover:text-inherit rounded-md py-0.5 px-2 border-2 border-black">
            Planilhas
          </Link>

          <Link href="/dashboard/fundos" className="bg-black text-white hover:bg-inherit hover:text-inherit rounded-md py-0.5 px-2 border-2 border-black">
            FII's
          </Link>
        </nav>
      </header>

      <nav className={`flex flex-col transition-all duration-200 h-0 md:hidden ${isOpen ? "opacity-100 h-fit" : "opacity-0 hidden"}`}>
        <Link href="/dashboard/stocks" className="text-center underline underline-offset-2">
          Ações
        </Link>

        <Link href="/dashboard/sheets" className="text-center underline underline-offset-2">
          Planilhas
        </Link>

        <Link href="/dashboard/fundos" className="text-center underline underline-offset-2">
          FII's
        </Link>
      </nav>
    </>
  )
}