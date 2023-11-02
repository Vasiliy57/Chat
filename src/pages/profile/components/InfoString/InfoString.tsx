import classes from './style.module.css'
import { infoString } from '@shared/constants/infoString'
import emailIcon from '@shared/assets/svg/email.svg'
import locationIcon from '@shared/assets/svg/location.svg'
import numberIcon from '@shared/assets/svg/tel.svg'

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
          <img src={emailIcon} alt="" />
          {content || 'Write your email'}
        </div>
      )
    case infoString.NUMBER:
      return (
        <div className={`${classes.info} ${classes.number}`}>
          <img src={numberIcon} alt="" />
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
          <img src={locationIcon} alt="" />
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
