"use client"

import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const Input: React.FC<InputProps> = ({name, ...props}) => {
  const { register } = useFormContext()

  return (
    <input {...register(name)} {...props} autoComplete="off" className="w-full h-10 focus:outline-none"/>
  )
}