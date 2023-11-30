import { Emoji } from 'emoji-picker-react'

interface ConvertEmojiContentProps {
  content: string
  smileDetector: Record<string, string>
  sizeSmile: number
}

export const ConvertEmojiContent: React.FC<ConvertEmojiContentProps> = ({
  content = [],
  smileDetector = {},
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
