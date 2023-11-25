import { Icon } from '@shared/assets/Icon/Icon'
import classes from './style.module.css'
import { ICONS } from '@shared/constants'

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
