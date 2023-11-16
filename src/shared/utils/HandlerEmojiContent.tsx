import { Emoji } from 'emoji-picker-react'

interface HandlerEmojiContentProps {
  content: string
  smileDetector: Record<string, string>
  sizeSmile: number
}

export const HandlerEmojiContent: React.FC<HandlerEmojiContentProps> = ({
  content,
  smileDetector,
  sizeSmile,
}) => {
  return (
    <>
      {[...content].map((elem, index) => {
        if (!smileDetector[elem]) {
          return elem
        } else {
          return (
            <Emoji unified={smileDetector[elem]} size={sizeSmile} key={index} />
          )
        }
      })}
    </>
  )
}
