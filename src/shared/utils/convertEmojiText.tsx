import { Emoji } from 'emoji-picker-react'
import { useEffect } from 'react'

interface ConvertEmojiProps {
  text: string
  emojiInMessage: string[]
  setEmojiInMessage: (callback: (prev: string[]) => string[]) => void
}

export const ConvertEmoji: React.FC<ConvertEmojiProps> = ({
  text,
  emojiInMessage,
  setEmojiInMessage,
}) => {
  const brokenString = [...text]
  const formattedText: string | JSX.Element[] = []
  let count = 0

  const countEmojiInArray = brokenString.filter((elem) => elem === '№').length

  useEffect(() => {
    if (emojiInMessage.length != countEmojiInArray) {
      setEmojiInMessage((prev) => {
        prev.pop()
        return prev
      })
    }
  }, [countEmojiInArray])

  brokenString.forEach((char, index) => {
    if (char === '№') {
      formattedText.push(
        <Emoji unified={emojiInMessage[count]} size={23.5} key={index} />
      )
      count++
    } else {
      formattedText.push(char)
    }
  })
  // let textChuck = ''
  // let formattedText = []

  // const brokenString = [...text]

  // brokenString.forEach((char, index) => {
  //   if (char[0] === '#') {
  //     formattedText.push(
  //       <Emoji unified={char.slice(1)} size={25} key={index} />
  //     )
  //     //   formattedText.push(
  //     //     <span key={index} className="emoji" role="img" aria-hidden="true">
  //     //       {char}
  //     //     </span>
  //     //   )
  //   } else {
  //     //   textChuck += char
  //     formattedText.push(<span key={index}> {char}</span>)
  //   }
  //   // if (brokenString.length - 1 === index && textChuck !== '') {
  //   //   formattedText.push(<span key={index}>{textChuck}</span>)
  //   //   textChuck = ''
  //   // }
  //   console.log(formattedText)
  // })

  // console.log(emojiInMessage)

  // console.log(brokenString)
  // console.log(formattedText)

  return [...formattedText]
}
