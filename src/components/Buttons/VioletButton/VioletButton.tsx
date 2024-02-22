import cn from "classnames"
import { FC } from "react"
import s from "./VioletButton.module.scss"
import { IVioletButtonProps } from "src/types/common"

const Button: FC<IVioletButtonProps> = ({ title, type, disabled, onClick, className, style }) => {
  const btnClasses = cn(s.button, className)

  return (
    <button className={btnClasses} style={style} onClick={onClick} type={type} disabled={disabled}>
      {title}
    </button>
  )
}

export default Button
