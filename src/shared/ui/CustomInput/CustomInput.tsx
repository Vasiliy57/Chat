import classes from './style.module.css'
import { HandlerEmojiContent } from '@shared/utils'

interface CustomInputProps {
  emojiInMessage: string
  smileDetector: React.RefObject<Record<string, string>>
  refCustomInput: HTMLDivElement
  onHandlerInput: (e) => void
}

export const CustomInput: React.FC<CustomInputProps> = ({
  emojiInMessage,
  smileDetector,
  refCustomInput,
  onHandlerInput,
}) => {
  const onHandlerClick = () => {}

  return (
    <div className={classes.customInput}>
      <div
        ref={refCustomInput}
        className={classes.content}
        onClick={onHandlerClick}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={onHandlerInput}
      >
        <HandlerEmojiContent
          content={emojiInMessage}
          smileDetector={smileDetector.current!}
          sizeSmile={30}
        />
      </div>
    </div>
  )
}
