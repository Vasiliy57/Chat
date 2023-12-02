import { Icon } from '@shared/assets/Icon/Icon'
import { ICONS } from '@shared/constants'
import classes from './style.module.css'

interface AttachFileProps {
  onHandlerInputFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AttachFile: React.FC<AttachFileProps> = ({
  onHandlerInputFile,
}) => {
  return (
    <div>
      <input
        className={classes.inputFile}
        type="file"
        id="attach-file"
        onChange={onHandlerInputFile}
      />
      <label htmlFor="attach-file" className={classes.label}>
        <Icon iconName={ICONS.ATTACH} />
      </label>
    </div>
  )
}
