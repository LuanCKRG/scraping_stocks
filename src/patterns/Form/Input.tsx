"use client"

import { InputHTMLAttributes, RefAttributes, forwardRef } from "react"
import { useFormContext } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  name: string
  text: string
}

export const Input: React.FC<InputProps> = ({ id, name, text, ...props }) => {
  const { register } = useFormContext()
  return (
    <div className="relative">
      <input id={name} {...register(name)} {...props} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-400" />
      <label htmlFor={name!} className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-400 peer-focus:text-sm">
        {text}
      </label>
    </div>
  )
}