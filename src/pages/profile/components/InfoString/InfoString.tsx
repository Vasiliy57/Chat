import classes from './style.module.css'
import { INFO_STRING } from '@shared/constants'
import { Icon } from '@shared/assets/Icon/Icon'
import { ICONS } from '@shared/constants/icons'
import { Input, Textarea } from '@shared/ui'
import { INPUT_CLASS_NAME, TEXTAREA_CLASS_NAME } from '@shared/constants'

interface InfoStringProps {
  type: keyof typeof INFO_STRING
  isEdit: boolean
  content: string | null
  onHandlerInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onHandlerTextarea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const InfoString: React.FC<InfoStringProps> = ({
  type,
  content,
  isEdit,
  onHandlerInput,
  onHandlerTextarea,
}) => {
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onHandlerInput) {
      onHandlerInput(e)
    }
  }
  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onHandlerTextarea) {
      onHandlerTextarea(e)
    }
  }

  switch (type) {
    case INFO_STRING.EMAIL:
      return (
        <div className={`${classes.info} ${classes.email}`}>
          <Icon iconName={ICONS.EMAIL} />
          {content || 'Write your email'}
        </div>
      )
    case INFO_STRING.NUMBER:
      return (
        <div className={`${classes.info} ${classes.number}`}>
          <Icon iconName={ICONS.TEL} />
          {isEdit ? (
            <Input
              inputClassName={INPUT_CLASS_NAME.EDIT}
              type="number"
              maxLength={12}
              onChange={onChangeInput}
              value={content!}
            />
          ) : (
            content || 'Write your number'
          )}
        </div>
      )

    case INFO_STRING.ADDRESS:
      return (
        <div className={`${classes.info} ${classes.address}`}>
          <Icon iconName={ICONS.LOCATION} />
          {isEdit ? (
            <Textarea
              textareaClassName={TEXTAREA_CLASS_NAME.INFO_STRING}
              maxLength={120}
              onChange={onChangeTextarea}
              value={content!}
            />
          ) : (
            content || 'Write your address'
          )}
        </div>
      )
  }
}
