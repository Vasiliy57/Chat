import { Emoji } from 'emoji-picker-react'

interface ConvertEmojiProps {
  text: string
}

export const ConvertEmoji: React.FC<ConvertEmojiProps> = ({ text }) => {
  let textChuck = ''
  let formattedText = []

  const brokenString = text.split('$')

  brokenString.forEach((char, index) => {
    if (char[0] === '#') {
      formattedText.push(
        <Emoji unified={char.slice(1)} size={25} key={index} />
      )
      //   formattedText.push(
      //     <span key={index} className="emoji" role="img" aria-hidden="true">
      //       {char}
      //     </span>
      //   )
    } else {
      //   textChuck += char
      formattedText.push( char)
    }
    // if (brokenString.length - 1 === index && textChuck !== '') {
    //   formattedText.push(<span key={index}>{textChuck}</span>)
    //   textChuck = ''
    // }
    console.log(formattedText)
  })

  return [...formattedText]
}
