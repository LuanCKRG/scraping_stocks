import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export const Button: React.FC<ButtonProps> = ({text, ...props}) => {
  return (
    <button {...props} className="w-full py-2 border-black border-2 rounded-lg btn relative inline-flex items-center justify-start overflow-hidden transition-all bg-white hover:bg-white group">
      <span className={`
        w-0
        h-0
        rounded
        absolute
        bg-black
        top-0
        left-0
        ease-out
        duration-500
        transition-all
        ${props.disabled ? "w-full h-full text-white" : "group-hover:w-full group-hover:h-full"}
        -z-1`
      } />
      <span className={`
        ${props.disabled ? "animate-pulse text-white" : "group-hover:text-white"}
        w-full
        text-center
        items-center
        text-black
        transition-colors
        duration-300
        ease-in-out
        z-10`
      }>
        {text}
      </span>
    </button>
  )
}