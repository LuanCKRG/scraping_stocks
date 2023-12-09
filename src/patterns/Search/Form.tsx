import { FormHTMLAttributes, HTMLAttributes } from "react"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {

}

export const Form: React.FC<FormProps> = ({children, ...props}) => {
  return (
    <form {...props} className="flex justify-center items-center mx-auto px-2 max-w-xs sm:max-w-md border-black border-2 rounded-lg">
      {children}
    </form>
  )
}