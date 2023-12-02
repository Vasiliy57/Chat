import { InputProps } from './type'
import classes from './style.module.css'

export const Input: React.FC<InputProps> = ({
  onChange,
  placeholder = '',
  type = 'text',
  value,
  inputClassName,
  ...props
}) => {
  return (
    <input
      className={classes[inputClassName]}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      {...props}
    />
  )
}
