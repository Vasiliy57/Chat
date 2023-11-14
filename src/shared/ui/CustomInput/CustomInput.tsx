import { Emoji } from 'emoji-picker-react'
import classes from './style.module.css'

interface CustomInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  inputRef: HTMLInputElement
  smileDetector: React.RefObject<Record<string, string>>
  setEmojiInMessage: (callback: (prev: string[]) => string[]) => void
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onChange,
  value,
  inputRef,
  smileDetector,
}) => {
  const onHandlerClick = () => {
    inputRef.current.focus()
  }

  return (
    <div className={classes.customInput}>
      <textarea
        ref={inputRef}
        type="text"
        className={classes.textarea}
        onChange={onChange}
        value={value}
        maxLength={110}
        placeholder="Type Message..."
      ></textarea>
      <div className={classes.content} onClick={onHandlerClick}>
        {[...value].map((elem, index) => {
          if (!smileDetector.current![elem]) {
            return elem
          } else {
            return (
              <Emoji
                unified={smileDetector.current![elem]}
                size={23.5}
                key={index}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
