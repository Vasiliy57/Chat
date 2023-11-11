import { ConvertEmoji } from '@shared/utils/convertEmojiText'
import classes from './style.module.css'

interface CustomInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const CustomInput: React.FC<CustomInputProps> = ({
  onChange,
  value,
}) => {
  // const [value, setValue] = useState<string>('')

  // const onaChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const val = e.target.value
  //   setValue(val)
  // }

  return (
    <div className={classes.customInput}>
      <input
        type="text"
        className={classes.input}
        onChange={onChange}
        value={value}
        id="emoji-input"
      />
      <label className={classes.label} htmlFor="emoji-input">
        <div className={classes.content}>
          <ConvertEmoji text={value} />
        </div>
      </label>
    </div>
  )
}
