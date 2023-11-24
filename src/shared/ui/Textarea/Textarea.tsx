import { TextareaProps } from './type'
import classes from './style.module.css'

export const Textarea: React.FC<TextareaProps> = ({
  onChange,
  placeholder = '',
  value,
  textareaClassName,
  maxLength = 300,
  ...props
}) => {
  return (
    <textarea
      className={classes[textareaClassName]}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      {...props}
      maxLength={maxLength}
    >
      {props.children ?? null}
    </textarea>
  )
}
