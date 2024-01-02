import { Icon } from '@shared/assets/Icon/Icon'
import { Input, Textarea } from '@shared/ui'

import { INFO_STRING } from '@shared/constants'
import { ICONS } from '@shared/constants/icons'
import { INPUT_CLASS_NAME, TEXTAREA_CLASS_NAME } from '@shared/constants'

import classes from './style.module.css'

interface InfoStringProps {
  type: keyof typeof INFO_STRING
  isEdit: boolean
  content: string
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
          {content}
        </div>
      )
    case INFO_STRING.NUMBER:
      return (
        <div className={`${classes.info} ${classes.number}`}>
          <Icon iconName={ICONS.TEL} />

          <Input
            inputClassName={INPUT_CLASS_NAME.EDIT}
            type="number"
            maxLength={12}
            onChange={onChangeInput}
            value={content!}
            placeholder="Write your number"
            disabled={!isEdit}
          />
        </div>
      )

    case INFO_STRING.ADDRESS:
      return (
        <div className={`${classes.info} ${classes.address}`}>
          <Icon iconName={ICONS.LOCATION} />
          <Textarea
            textareaClassName={TEXTAREA_CLASS_NAME.INFO_STRING}
            maxLength={120}
            onChange={onChangeTextarea}
            value={content!}
            placeholder="Write your address"
            disabled={!isEdit}
          />
        </div>
      )
  }
}
