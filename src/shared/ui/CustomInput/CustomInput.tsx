import { Emoji } from 'emoji-picker-react'
import classes from './style.module.css'
import { HandlerEmojiContent } from '@shared/utils'

interface CustomInputProps {
  emojiInMessage: string
  smileDetector: React.RefObject<Record<string, string>>
  refCustomInput: HTMLDivElement
  onHandlerInput: (e) => void
}

export const CustomInput: React.FC<CustomInputProps> = ({
  // emojiInMessage,
  smileDetector,
  refCustomInput,
  onHandlerInput,
}) => {
  const onHandlerClick = () => {}

  const onHandlerInputInsideComponent = (e) => {
    onHandlerInput(e)
    const content = e.currentTarget.textContent

    const data = [...content].map((elem, index) => {
      if (!smileDetector.current![elem]) {
        return elem
      } else {
        return (
          <Emoji unified={smileDetector.current![elem]} size={30} key={index} />
        )
      }
    })

    console.log(data)
  }

  return (
    <div className={classes.customInput}>
      <div
        ref={refCustomInput}
        className={classes.content}
        onClick={onHandlerClick}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={onHandlerInputInsideComponent}
      >
        {/* <HandlerEmojiContent
          content={refCustomInput?.current?.innerText}
          smileDetector={smileDetector.current!}
          sizeSmile={30}
        /> */}
      </div>
    </div>
  )
}
