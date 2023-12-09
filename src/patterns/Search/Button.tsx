import { ButtonHTMLAttributes, ElementType } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType
}

export const Button: React.FC<ButtonProps> = ({icon: Icon, ...props}) => {
  return (
    <button {...props}>
      <Icon size={30} />
    </button>
  )
}