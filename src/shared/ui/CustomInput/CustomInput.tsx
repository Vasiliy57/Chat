import classes from './style.module.css'
import { HandlerEmojiContent } from '@shared/utils'

interface CustomInputProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
  inputRef: HTMLTextAreaElement
  smileDetector: React.RefObject<Record<string, string>>
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onChange,
  value,
  smileDetector,
  inputRef,
}) => {
  const onHandlerClick = () => {
    // inputRef.current.focus()
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
        <HandlerEmojiContent
          content={value}
          smileDetector={smileDetector.current!}
          sizeSmile={30}
        />
      </div>
    </div>
  )
}
