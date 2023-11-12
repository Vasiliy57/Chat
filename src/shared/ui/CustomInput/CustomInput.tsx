import { ConvertEmoji } from '@shared/utils/convertEmojiText'
import classes from './style.module.css'

interface CustomInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  inputRef: HTMLInputElement
  emojiInMessage: string[]
  setEmojiInMessage: (callback: (prev: string[]) => string[]) => void
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onChange,
  value,
  inputRef,
  emojiInMessage,
  setEmojiInMessage,
}) => {
  // const [value, setValue] = useState<string>('')

  // const onaChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value
  //   setValue(val)
  // }

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
        <ConvertEmoji
          text={value}
          emojiInMessage={emojiInMessage}
          setEmojiInMessage={setEmojiInMessage}
        />
      </div>
    </div>
  )
}
