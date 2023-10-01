import { InputHTMLAttributes } from 'react'
import classes from './formInput.module.css'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput: React.FC<IInput> = ({ onChange, placeholder = '', type = 'text', value, ...props }) => {

  return (
    <input
      className={classes.input}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      {...props}
    />
  )
}

