import classes from './style.module.css'
import { infoString } from '@shared/constants/infoString'
import { Icon } from '@shared/assets/Icon/Icon'
import { icons } from '@shared/constants/icons'

interface InfoStringProps {
  type: keyof typeof infoString
  isEdit: boolean
  content: string | null
  onHandlerInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InfoString: React.FC<InfoStringProps> = ({
  type,
  content,
  isEdit,
  onHandlerInput,
}) => {
  switch (type) {
    case infoString.EMAIL:
      return (
        <div className={`${classes.info} ${classes.email}`}>
          <Icon iconName={icons.EMAIL} />
          {content || 'Write your email'}
        </div>
      )
    case infoString.NUMBER:
      return (
        <div className={`${classes.info} ${classes.number}`}>
          <Icon iconName={icons.TEL} />
          {isEdit ? (
            <input
              type="text"
              maxLength={12}
              onChange={onHandlerInput}
              value={content!}
            />
          ) : (
            content || 'Write your number'
          )}
        </div>
      )

    case infoString.ADDRESS:
      return (
        <div className={`${classes.info} ${classes.address}`}>
          <Icon iconName={icons.LOCATION} />
          {isEdit ? (
            <input
              type="text"
              maxLength={120}
              onChange={onHandlerInput}
              value={content!}
            />
          ) : (
            content || 'Write your address'
          )}
        </div>
      )
  }
}
