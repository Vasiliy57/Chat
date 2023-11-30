import { ConvertEmojiContent } from '@shared/utils'
import classes from './style.module.css'

interface TextMessageProps {
  content: string
  smileDetector: Record<string, string>
}

export const TextMessage: React.FC<TextMessageProps> = ({
  content,
  smileDetector,
}) => {
  return (
    <div className={classes.text}>
      <ConvertEmojiContent
        content={content}
        smileDetector={smileDetector}
        sizeSmile={25}
      />
    </div>
  )
}
