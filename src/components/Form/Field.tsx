import { HTMLAttributes } from "react"

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export const Field: React.FC<FieldProps> = (props) => {
  return (
    <div {...props} className="flex flex-col gap-2" />
  )
}